<svelte:options immutable />

<script lang="ts">
	import RichEditor from './editor/RichEditor.svelte';
	import { createNotification } from '$lib/state/notifications';
	import { getLocation, getLocationName } from '$lib/util';
	import type { IAddJournalEntry, IUpdateJournalEntry } from '$lib/state/journal';

	export let journalEntry: IAddJournalEntry | IUpdateJournalEntry;

	$: if (journalEntry.geolocation?.latitude) {
		latitude = journalEntry.geolocation.latitude;
	}
	$: if (journalEntry.geolocation?.longitude) {
		longitude = journalEntry.geolocation.longitude;
	}

	let getttingLocation = false;
	let latitude: number;
	let longitude: number;
	async function onGetLocation() {
		if (!journalEntry) {
			return;
		}
		getttingLocation = true;
		try {
			const geolocation = await getLocation();
			journalEntry = {
				...journalEntry,
				geolocation,
				location: await getLocationName(geolocation)
			};
		} catch (e) {
			console.error(e);
			createNotification((e as Error).message);
		} finally {
			getttingLocation = false;
		}
	}
</script>

<div class="flex flex-col flex-shrink-0">
	<label for="location" class="label">Location</label>
	<div class="flex">
		<input
			class="input grow"
			name="location"
			placeholder="Location"
			bind:value={journalEntry.location}
		/>
		<button
			type="button shrink"
			class="btn primary"
			on:click={onGetLocation}
			disabled={getttingLocation}>Current</button
		>
	</div>
</div>
<div class="flex flex-row">
	<div class="flex flex-1 flex-col">
		<label for="latitude" class="label">Latitude</label>
		<input class="input grow" name="latitude" placeholder="Latitude" bind:value={latitude} />
	</div>
	<div class="flex flex-1 flex-col">
		<label for="longitude" class="label">Longitude</label>
		<input class="input grow" name="longitude" placeholder="Longitude" bind:value={longitude} />
	</div>
</div>
<div class="flex flex-col flex-grow mt-2">
	<label for="entry" class="label">Entry</label>
	<RichEditor bind:value={journalEntry.content} name="entry" autoFocus />
</div>
