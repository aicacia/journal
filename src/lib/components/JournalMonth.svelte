<svelte:options immutable />

<script lang="ts">
	import Calender from './Calender/Month.svelte';
	import { currentDate } from '$lib/state/currentDate';
	import Controls from './Controls.svelte';
	import { showByMonth, type IJournalEntry } from '$lib/state/journal';
	import UpdateEntry from './UpdateEntry.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/env';

	let today = new Date();
	let selectedJournalEntry: IJournalEntry | undefined;
	let updateOpen = false;

	function onSelect(journalEntry: IJournalEntry) {
		selectedJournalEntry = journalEntry;
		updateOpen = true;
	}

	$: showByMonth($currentDate);

	onMount(() => {
		if (browser) {
			document.getElementById(today.toISOString().substring(0, 10))?.scrollIntoView();
		}
	});
</script>

<Controls>
	<Calender date={$currentDate} {today} {onSelect} />
</Controls>

<UpdateEntry bind:open={updateOpen} journalEntry={selectedJournalEntry} />
