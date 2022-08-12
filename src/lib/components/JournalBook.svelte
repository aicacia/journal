<svelte:options immutable />

<script lang="ts">
	import { currentDate } from '$lib/state/currentDate';
	import Controls from './Controls.svelte';
	import { journalByMonth, showByMonth, type IJournalEntry } from '$lib/state/journal';
	import UpdateEntry from './UpdateEntry.svelte';
	import Book from './Book.svelte';
	import { getYearMonth } from '$lib/util';

	let selectedJournalEntry: IJournalEntry | undefined;
	let updateOpen = false;
	let innerWidth = 1024;

	function onSelect(journalEntry: IJournalEntry) {
		selectedJournalEntry = journalEntry;
		updateOpen = true;
	}

	$: showByMonth($currentDate);
	$: entries = ($journalByMonth[getYearMonth($currentDate)] || {})[$currentDate.getDate()] || [];
</script>

<svelte:window bind:innerWidth />

<div class="flex flex-col w-full h-full pb-[80px]">
	{#if innerWidth >= 640}
		<Controls months={false} />
	{/if}
	<Book {entries} {onSelect} />
	{#if innerWidth < 640}
		<Controls months={false} />
	{/if}
</div>

<UpdateEntry bind:open={updateOpen} journalEntry={selectedJournalEntry} />
