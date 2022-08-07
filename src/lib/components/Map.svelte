<svelte:options immutable />

<script lang="ts" context="module">
	import 'leaflet/dist/leaflet.css';
</script>

<script lang="ts">
	import type { Map, Icon } from 'leaflet';
	import { onMount } from 'svelte';
	import type { IJournalEntry } from '$lib/state/journal';
	import { base } from '$app/paths';

	export let latitude: number = 39;
	export let longitude: number = -98;
	export let altitude: number | undefined = undefined;
	export let zoom: number = 13;
	export let map: Map | undefined = undefined;
	export let entries: IJournalEntry[] = [];

	let Leaflet: any;
	let journalIcon: Icon;
	let element: HTMLElement;

	let prevLatitude = latitude;
	let prevLongitude = longitude;
	$: if ((map && prevLatitude !== latitude) || prevLongitude !== longitude) {
		map?.setView([latitude, longitude], zoom);
	}

	onMount(async () => {
		Leaflet = await import('leaflet');

		const m: Map = (map = Leaflet.map(element, { zoomControl: false }).setView(
			[latitude, longitude],
			zoom
		));
		Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© OpenStreetMap'
		}).addTo(m);

		m.addEventListener('moveend', () => {
			const center = m.getCenter();
			latitude = prevLatitude = center.lat;
			longitude = prevLongitude = center.lng;
			altitude = center.alt;
		});

		journalIcon = Leaflet.icon({
			iconUrl: `${base}/icon.png`,
			iconSize: [48, 48],
			iconAnchor: [24, 24],
			popupAnchor: [0, 0]
		});
	});

	$: if (journalIcon && map) {
		entries.forEach((entry) => {
			if (entry.geolocation) {
				Leaflet.marker([entry.geolocation.latitude, entry.geolocation.longitude], {
					icon: journalIcon
				})
					.addTo(map)
					.bindPopup(entry.createdAt.toLocaleDateString());
			}
		});
	}
</script>

<div bind:this={element} class="w-full h-full" />
