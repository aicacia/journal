import { derived, get } from 'svelte/store';
import { writable } from 'svelte/store';
import type { IAsJSON } from '@aicacia/json';
import { v4 } from 'uuid';
import { remoteStorage } from '../remoteStorage';
import { getYearMonth } from '$lib/util';

export const SCHEMA_NAME = 'journal-entry';

remoteStorage.access.claim('journal', 'rw');

export const journalRS = remoteStorage.scope('/journal/');

journalRS.declareType(SCHEMA_NAME, {
	type: 'object',
	properties: {
		id: {
			type: 'string',
			format: 'uuid'
		},
		geolocation: {
			type: 'object',
			properties: {
				accuracy: 'number',
				altitude: 'number',
				altitudeAccuracy: 'number',
				heading: 'number',
				latitude: 'number',
				longitude: 'number',
				speed: 'number'
			}
		},
		location: {
			type: 'string'
		},
		content: {
			type: 'array'
		},
		createdAt: {
			type: 'string',
			format: 'date-time'
		},
		updatedAt: {
			type: 'string',
			format: 'date-time'
		}
	},
	required: ['id', 'content', 'createdAt', 'updatedAt']
});

export interface IJournalEntry {
	id: string;
	geolocation?: GeolocationCoordinates;
	location?: string;
	content: any[];
	createdAt: Date;
	updatedAt: Date;
}

export type IJournalEntryJSON = IAsJSON<IJournalEntry>;

export function journalEntryToJSON(journalEntry: IJournalEntry): IJournalEntryJSON {
	const journalEntryJSON: IJournalEntryJSON = {
		id: journalEntry.id,
		content: journalEntry.content,
		createdAt: journalEntry.createdAt.toJSON(),
		updatedAt: journalEntry.updatedAt.toJSON()
	};

	if (journalEntry.geolocation) {
		journalEntryJSON.geolocation = {
			accuracy: journalEntry.geolocation.accuracy,
			altitude: journalEntry.geolocation.altitude,
			altitudeAccuracy: journalEntry.geolocation.altitudeAccuracy,
			heading: journalEntry.geolocation.heading,
			latitude: journalEntry.geolocation.latitude,
			longitude: journalEntry.geolocation.longitude,
			speed: journalEntry.geolocation.speed
		};
	}
	if (journalEntry.location) {
		journalEntryJSON.location = journalEntry.location;
	}

	return journalEntryJSON;
}

export function journalEntryFromJSON(journalEntry: IJournalEntryJSON): IJournalEntry {
	return {
		id: journalEntry.id,
		geolocation: journalEntry.geolocation as GeolocationCoordinates,
		location: journalEntry.location as string,
		content: journalEntry.content,
		createdAt: new Date(journalEntry.createdAt),
		updatedAt: new Date(journalEntry.updatedAt)
	};
}

export interface IJournal {
	[id: string]: IJournalEntry;
}

export interface IJournalJSON {
	[id: string]: IJournalEntryJSON;
}

const writableJournal = writable<IJournal>({});

export const journal = derived(writableJournal, (state) => Object.values(state));
export const journalById = derived(writableJournal, (state) => state);
export const journalByMonth = derived(writableJournal, (state) =>
	Object.values(state).reduce((acc, journalEntry) => {
		const month = getYearMonth(journalEntry.createdAt);
		const day = journalEntry.createdAt.getDate();
		const byMonth = acc[month] || (acc[month] = {});
		const byDay = byMonth[day] || (byMonth[day] = []);
		byDay.push(journalEntry);
		return acc;
	}, {} as { [month: string]: { [day: string]: IJournalEntry[] } })
);

const writableMonthsLoading = writable(new Set<string>());

export const monthsLoading = derived(writableMonthsLoading, (state) => new Set(state));

export interface IAddJournalEntry {
	content: any[];
	geolocation?: GeolocationCoordinates;
	location?: string;
}

export async function addJournalEntry(data: IAddJournalEntry) {
	const id = v4();

	const journalEntry: IJournalEntry = {
		id,
		content: data.content,
		geolocation: data.geolocation,
		location: data.location,
		createdAt: new Date(),
		updatedAt: new Date()
	};

	let storeTask: Promise<void> | undefined;
	writableJournal.update((state) => {
		const newState = { ...state, [journalEntry.id]: journalEntry };
		storeTask = rsStoreJournalEntry(journalEntry);
		return newState;
	});
	if (storeTask) {
		await storeTask;
	}
}

export interface IUpdateJournalEntry {
	content: any[];
	geolocation?: GeolocationCoordinates;
	location?: string;
}

export async function updateJournalEntry(id: string, data: IUpdateJournalEntry) {
	let storeTask: Promise<void> | undefined;

	writableJournal.update((state) => {
		const journalEntry = state[id];
		if (journalEntry) {
			const newJournalEntry = { ...journalEntry, ...data, id, updatedAt: new Date() };
			const newState = {
				...state,
				[id]: newJournalEntry
			};
			storeTask = rsStoreJournalEntry(newJournalEntry);
			return newState;
		} else {
			return state;
		}
	});
	if (storeTask) {
		await storeTask;
	}
}

export async function deleteJournalEntry(id: string) {
	let deleteTask: Promise<void> | undefined;
	writableJournal.update((state) => {
		const journalEntry = state[id];
		if (journalEntry) {
			const newState = { ...state };
			delete newState[id];
			deleteTask = rsDeleteJournalEntry(journalEntry);
			return newState;
		} else {
			return state;
		}
	});
	if (deleteTask) {
		await deleteTask;
	}
}

export async function showByMonth(date: Date) {
	if (!remoteStorage.connected) {
		function onConnected() {
			remoteStorage.removeEventListener('connected', onConnected);
			showByMonth(date);
		}
		remoteStorage.addEventListener('connected', onConnected);
	} else {
		const month = getYearMonth(date);
		const byMonth = (get(journalByMonth) || {})[month] || {};

		if (!get(writableMonthsLoading).has(month) && !Object.keys(byMonth).length) {
			writableMonthsLoading.update((state) => {
				state.add(month);
				return state;
			});
			async function onSyncDone() {
				remoteStorage.removeEventListener('sync-done', onSyncDone);
				try {
					const journal = (await journalRS.getAll(`${month}/`, false)) as IJournalJSON;
					writableJournal.update((state) => {
						const newState = { ...state };
						Object.values(journal).forEach((journalEntry) => {
							const prevJournalEntry = newState[journalEntry.id],
								newJournalEntry = journalEntryFromJSON(journalEntry);

							if (!prevJournalEntry || prevJournalEntry.updatedAt < newJournalEntry.updatedAt) {
								newState[journalEntry.id] = newJournalEntry;
							}
						});
						return newState;
					});
				} finally {
					writableMonthsLoading.update((state) => {
						state.delete(month);
						return state;
					});
				}
			}
			remoteStorage.addEventListener('sync-done', onSyncDone);
			remoteStorage.caching.set(`/journal/${month}/`, 'ALL');
		}
	}
}

async function rsStoreJournalEntry(journalEntry: IJournalEntry) {
	const month = journalEntry.createdAt.toISOString().substring(0, 7);
	await journalRS.storeObject(
		SCHEMA_NAME,
		`${month}/${journalEntry.id}.json`,
		journalEntryToJSON(journalEntry)
	);
}

async function rsDeleteJournalEntry(journalEntry: IJournalEntry) {
	const month = getYearMonth(journalEntry.createdAt);
	await journalRS.remove(`${month}/${journalEntry.id}.json`);
}
