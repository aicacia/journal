import { remoteStorage } from '$lib/remoteStorage';
import { derived, writable } from 'svelte/store';

export interface IRemoteStorageState {
	storage: 'connected' | 'disconnected';
	wire: 'syncing' | 'idle';
}

const remoteStorageStateWritable = writable<IRemoteStorageState>({
	storage: 'disconnected',
	wire: 'idle'
});

export const remoteStorageState = derived(remoteStorageStateWritable, (state) => state);

remoteStorage.on('connected', () => {
	updateState('storage', 'connected');
});
remoteStorage.on('disconnected', () => {
	updateState('storage', 'disconnected');
});
remoteStorage.on('wire-busy', () => {
	updateState('wire', 'syncing');
});
remoteStorage.on('wire-done', () => {
	updateState('wire', 'idle');
});

function updateState<K extends Extract<keyof IRemoteStorageState, string>>(
	key: K,
	value: IRemoteStorageState[K]
) {
	remoteStorageStateWritable.update((state) => ({
		...state,
		[key as any]: value
	}));
}
