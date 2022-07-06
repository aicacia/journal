<svelte:options immutable />

<script lang="ts">
	import { currentDate } from '$lib/state/currentDate';
	import Modal from './Modal.svelte';
	import RichEditor from './editor/RichEditor.svelte';
	import { addJournalEntry } from '$lib/state/journal';
	import { createNotification } from '$lib/state/notifications';
	import { getLocation, getLocationName } from '$lib/util';

	export let open = false;

	let content: any[] = [];
	let geolocation: GeolocationCoordinates | undefined;
	let location: string | undefined;

	async function onCreate() {
		try {
			await addJournalEntry({ content, geolocation, location });
			content = [];
			open = false;
		} catch (e) {
			console.error(e);
			createNotification((e as Error).message);
		}
	}
	let getttingLocation = false;
	async function onGetLocation() {
		getttingLocation = true;
		try {
			geolocation = await getLocation();
			location = await getLocationName(geolocation);
		} catch (e) {
			console.error(e);
			createNotification((e as Error).message);
		} finally {
			getttingLocation = false;
		}
	}
</script>

<Modal bind:open>
	<h1 slot="title">{$currentDate.toLocaleDateString()} {$currentDate.toLocaleTimeString()}</h1>
	<div>
		<label for="location" class="label">Location</label>
		<div class="flex">
			<input class="input grow" name="location" bind:value={location} />
			<button
				type="button shrink"
				class="btn primary"
				on:click={onGetLocation}
				disabled={getttingLocation}>Current</button
			>
		</div>
	</div>
	<div>
		<label for="entry" class="label">Entry</label>
		<RichEditor bind:value={content} name="entry" autoFocus />
	</div>
	<div class="flex justify-end">
		<button type="button" class="btn primary" on:click={onCreate}>Create</button>
	</div>
</Modal>
