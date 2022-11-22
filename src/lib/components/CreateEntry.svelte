<svelte:options immutable />

<script lang="ts">
	import { currentDate } from '$lib/state/currentDate';
	import Modal from './Modal.svelte';
	import { addJournalEntry, type IAddJournalEntry } from '$lib/state/journal';
	import { createNotification } from '$lib/state/notifications';
	import EntryEditor from './EntryEditor.svelte';

	export let open = false;

	let journalEntry: IAddJournalEntry = {
		content: []
	};

	async function onCreate() {
		try {
			await addJournalEntry(journalEntry);
			journalEntry = { content: [] };
			open = false;
		} catch (e) {
			console.error(e);
			createNotification((e as Error).message);
		}
	}
</script>

<Modal bind:open>
	<h3 slot="title">{$currentDate.toLocaleDateString()} {$currentDate.toLocaleTimeString()}</h3>
	<div class="flex flex-col flex-grow min-h-full">
		<EntryEditor bind:journalEntry />
		<div class="flex flex-row flex-shrink-0 justify-end">
			<button type="button" class="btn primary" on:click={onCreate}>Create</button>
		</div>
	</div>
</Modal>
