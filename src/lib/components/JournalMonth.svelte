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
	let innerWidth = 1024;

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

<svelte:window bind:innerWidth />

<div class="flex flex-col flex-grow pb-[80px]">
	{#if innerWidth >= 640}
		<Controls />
	{/if}
	<Calender date={$currentDate} {today} {onSelect} />
	{#if innerWidth < 640}
		<Controls />
	{/if}
</div>

<UpdateEntry bind:open={updateOpen} journalEntry={selectedJournalEntry} />
