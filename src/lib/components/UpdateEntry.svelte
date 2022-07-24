<svelte:options immutable />

<script lang="ts">
	import Modal from './Modal.svelte';
	import { deleteJournalEntry, updateJournalEntry, type IJournalEntry } from '$lib/state/journal';
	import { createNotification } from '$lib/state/notifications';
	import EntryEditor from './EntryEditor.svelte';

	export let journalEntry: IJournalEntry | undefined;
	export let open = false;
	export let deleteOpen = false;

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

	function onOpenDelete() {
		deleteOpen = true;
	}
	function onCloseDelete() {
		deleteOpen = false;
	}

	async function onDelete() {
		if (!journalEntry) {
			return;
		}
		try {
			await deleteJournalEntry(journalEntry.id);
			journalEntry = undefined;
			open = false;
			deleteOpen = false;
		} catch (e) {
			console.error(e);
			createNotification((e as Error).message);
		}
	}
</script>

<Modal bind:open>
	<h1 slot="title">
		{journalEntry?.createdAt.toLocaleDateString()}
		{journalEntry?.createdAt.toLocaleTimeString()}
	</h1>
	{#if journalEntry}
		<div class="flex flex-col flex-grow min-h-full">
			<EntryEditor bind:journalEntry />
			<div class="flex flex-row flex-shrink-0 justify-between">
				<button type="button" class="btn danger" on:click={onOpenDelete}>Delete</button>
				<button type="button" class="btn primary" on:click={onUpdate}>Update</button>
			</div>
		</div>
	{/if}
</Modal>

<Modal bind:open={deleteOpen} small>
	<h1 slot="title">
		Delete Entry For
		{journalEntry?.createdAt.toLocaleDateString()}
		{journalEntry?.createdAt.toLocaleTimeString()}
	</h1>
	{#if journalEntry}
		<div class="flex flex-row flex-shrink-0 justify-between">
			<button type="button" class="btn secondary" on:click={onCloseDelete}>Cancel</button>
			<button type="button" class="btn danger" on:click={onDelete}>Delete</button>
		</div>
	{/if}
</Modal>
