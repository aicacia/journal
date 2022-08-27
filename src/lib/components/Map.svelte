<svelte:options immutable />

<script lang="ts" context="module">
	import 'leaflet/dist/leaflet.css';
	import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
	import 'leaflet.markercluster/dist/MarkerCluster.css';

	function createClusterIcon(cluster: L.MarkerCluster) {
		return window.L.divIcon({
			html: `<img src="${`${base}/icon.png`}" style="width:48px;height:48px;position:absolute;top:-24px;left:-24px;" />
			<span style="color:white;position:absolute;left:-6px;top:-2px">${cluster.getChildCount()}</span>`
		});
	}
</script>

<script lang="ts">
	import type L from 'leaflet';
	import { onMount } from 'svelte';
	import type { IJournalEntry } from '$lib/state/journal';
	import { base } from '$app/paths';

	export let latitude: number = 39;
	export let longitude: number = -98;
	export let altitude: number | undefined = undefined;
	export let zoom: number = 13;
	export let map: L.Map | undefined = undefined;
	export let entries: IJournalEntry[] = [];
	export let onSelect: (journalEntry: IJournalEntry) => void;

	let journalIcon: L.Icon;
	let element: HTMLElement;

	let prevLatitude = latitude;
	let prevLongitude = longitude;
	$: if ((map && prevLatitude !== latitude) || prevLongitude !== longitude) {
		map?.setView([latitude, longitude], zoom);
	}

	onMount(async () => {
		await import('leaflet');
		await import('leaflet.markercluster');

		let m = window.L.map(element, { zoomControl: false }).setView([latitude, longitude], zoom);
		map = m;
		window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© OpenStreetMap'
		}).addTo(m);

		m.addEventListener('moveend', () => {
			const center = m.getCenter();
			latitude = prevLatitude = center.lat;
			longitude = prevLongitude = center.lng;
			altitude = center.alt;
		});

		journalIcon = window.L.icon({
			iconUrl: `${base}/icon.png`,
			iconSize: [48, 48],
			iconAnchor: [24, 24],
			popupAnchor: [0, 0]
		});
	});

	let markers: L.MarkerClusterGroup | undefined;
	$: if (journalIcon && map) {
		if (markers) {
			markers.remove();
		}
		markers = window.L.markerClusterGroup({
			iconCreateFunction: createClusterIcon
		});
		for (const entry of entries) {
			if (entry.geolocation) {
				const marker = window.L.marker([entry.geolocation.latitude, entry.geolocation.longitude], {
					icon: journalIcon
				})
					.bindTooltip(entry.createdAt.toLocaleDateString())
					.addEventListener('click', () => onSelect(entry));
				markers.addLayer(marker);
			}
		}
		map.addLayer(markers);
	}
</script>

<div bind:this={element} class="w-full h-full" />
