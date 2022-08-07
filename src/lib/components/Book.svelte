<svelte:options immutable />

<script lang="ts">
	import MdEdit from 'svelte-icons/md/MdEdit.svelte';
	import type { IJournalEntry } from '$lib/state/journal';
	import RichViewer from './editor/RichViewer.svelte';
	import { loading } from '$lib/state/tasks';

	export let entries: IJournalEntry[];
	export let onSelect: (journalEntry: IJournalEntry) => void;

	function createInSelect(journalEntry: IJournalEntry) {
		return () => onSelect(journalEntry);
	}
</script>

<div class="container mx-auto bg-white p-8 my-2">
	<div class="grid grid-cols-1 divide-y-2">
		{#each entries as entry (entry.id)}
			<div>
				<h3
					class="text-lg font-bold py-1 cursor-pointer hover:bg-gray-300 flex justify-between group"
					on:click={createInSelect(entry)}
				>
					<span
						>{entry.createdAt.toLocaleTimeString()}
						{entry.location ? ` - ${entry.location}` : ''}</span
					>
					<div class="w-6 h-6 opacity-0 group-hover:opacity-100">
						<MdEdit />
					</div>
				</h3>
				<RichViewer value={entry.content} />
			</div>
		{/each}
	</div>
	{#if $loading && !entries.length}
		Loading...
	{/if}
</div>
