<svelte:options immutable />

<script lang="ts">
	import Calender from './Calender/Month.svelte';
	import { currentDate } from '$lib/state/currentDate';
	import Controls from './Controls.svelte';
	import type { IJournalEntry } from '$lib/state/journal';
	import UpdateEntry from './UpdateEntry.svelte';

	let today = new Date();
	let selecteJournalEntry: IJournalEntry | undefined;
	let updateOpen = false;

	let innerWidth = 1024;

	function onSelect(journalEntry: IJournalEntry) {
		selecteJournalEntry = journalEntry;
		updateOpen = true;
	}
</script>

<svelte:window bind:innerWidth />

{#if innerWidth >= 640}
	<Controls />
{/if}
<Calender date={$currentDate} {today} {onSelect} />
{#if innerWidth < 640}
	<Controls />
{/if}

<UpdateEntry bind:open={updateOpen} journalEntry={selecteJournalEntry} />
