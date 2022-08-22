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

	function onSelect(journalEntry: IJournalEntry) {
		selectedJournalEntry = journalEntry;
		updateOpen = true;
	}

	$: showByMonth($currentDate);
	$: entries = ($journalByMonth[getYearMonth($currentDate)] || {})[$currentDate.getDate()] || [];
</script>

<Controls months={false}>
	<Book {entries} {onSelect} />
</Controls>

<UpdateEntry bind:open={updateOpen} journalEntry={selectedJournalEntry} />
