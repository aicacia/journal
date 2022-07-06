<svelte:options immutable />

<script lang="ts">
	import { currentDate } from '$lib/state/currentDate';
	import Modal from './Modal.svelte';
	import RichEditor from './editor/RichEditor.svelte';
	import { deleteJournalEntry, updateJournalEntry, type IJournalEntry } from '$lib/state/journal';
	import { createNotification } from '$lib/state/notifications';
	import { getLocation, getLocationName } from '$lib/util';

	export let journalEntry: IJournalEntry | undefined;
	export let open = false;

	async function onUpdate() {
		if (!journalEntry) {
			return;
		}
		try {
			await updateJournalEntry(journalEntry.id, {
				content: journalEntry.content,
				geolocation: journalEntry.geolocation,
				location: journalEntry.location
			});
			journalEntry = undefined;
			open = false;
		} catch (e) {
			console.error(e);
			createNotification((e as Error).message);
		}
	}

	async function onDelete() {
		if (!journalEntry) {
			return;
		}
		try {
			await deleteJournalEntry(journalEntry.id);
			journalEntry = undefined;
			open = false;
		} catch (e) {
			console.error(e);
			createNotification((e as Error).message);
		}
	}

	let getttingLocation = false;
	async function onGetLocation() {
		if (!journalEntry) {
			return;
		}
		getttingLocation = true;
		try {
			journalEntry.geolocation = await getLocation();
			journalEntry.location = await getLocationName(journalEntry.geolocation);
		} catch (e) {
			console.error(e);
			createNotification((e as Error).message);
		} finally {
			getttingLocation = false;
		}
	}
</script>

<Modal bind:open>
	<h1 slot="title">
		{journalEntry?.createdAt.toLocaleDateString()}
		{journalEntry?.createdAt.toLocaleTimeString()}
	</h1>
	{#if journalEntry}
		<div>
			<label for="location" class="label">Location</label>
			<div class="flex">
				<input class="input grow" name="location" bind:value={journalEntry.location} />
				<button
					type="button shrink"
					class="btn primary"
					on:click={onGetLocation}
					disabled={getttingLocation}>Current</button
				>
			</div>
		</div>
		<div>
			<label for="entry" class="label">Entry</label>
			<RichEditor bind:value={journalEntry.content} name="entry" autoFocus />
		</div>
		<div class="flex justify-between">
			<button type="button" class="btn danger" on:click={onDelete}>Delete</button>
			<button type="button" class="btn primary" on:click={onUpdate}>Update</button>
		</div>
	{/if}
</Modal>
