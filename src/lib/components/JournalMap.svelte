<svelte:options immutable />

<script lang="ts">
	import { journalByMonth, showByMonth, type IJournalEntry } from '$lib/state/journal';
	import { currentDate } from '$lib/state/currentDate';
	import Map from './Map.svelte';
	import UpdateEntry from './UpdateEntry.svelte';
	import Controls from './Controls.svelte';
	import { sortByDate } from '$lib/util';

	let selectedJournalEntry: IJournalEntry | undefined;
	let updateOpen = false;
	let innerWidth = 1024;

	let latitude: number = 39;
	let longitude: number = -98;

	function onSelect(journalEntry: IJournalEntry) {
		selectedJournalEntry = journalEntry;
		updateOpen = true;
	}

	$: entries = Object.values(
		$journalByMonth[$currentDate.toISOString().substring(0, 7)] || {}
	).flat(1);

	$: if (entries.length) {
		const entry = entries.sort(sortByDate).find((entry) => entry.geolocation);
		if (entry?.geolocation) {
			latitude = entry.geolocation.latitude;
			longitude = entry.geolocation.longitude;
		}
	}

	$: showByMonth($currentDate);
</script>

<svelte:window bind:innerWidth />

<div class="flex flex-col flex-grow">
	<div class="absolute top-0 left-0 w-full z-[1000]">
		<Controls />
	</div>
	<Map bind:latitude bind:longitude {entries} {onSelect} />
</div>

<UpdateEntry bind:open={updateOpen} journalEntry={selectedJournalEntry} />
