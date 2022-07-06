<svelte:options immutable />

<script lang="ts" context="module">
	const id = 'remote-storage-widget';
	let GLOBAL_WIDGET: Widget | undefined;
</script>

<script lang="ts">
	import { remoteStorage } from '$lib/remoteStorage';
	import type Widget from 'remotestorage-widget';
	import { onMount } from 'svelte';

	export let element: HTMLElement | undefined = undefined;
	export let widget: Widget | undefined = undefined;

	onMount(() => {
		import('remotestorage-widget').then(({ default: Widget }) => {
			if (GLOBAL_WIDGET) {
				GLOBAL_WIDGET.rsWidget?.remove();
			}
			const w = new Widget(remoteStorage);
			w.attach(id);
			GLOBAL_WIDGET = w;
			(function onWidgetReady() {
				if (w.rsWidget) {
					widget = w;
					element = w.rsWidget;
				} else {
					setTimeout(onWidgetReady, 300);
				}
			})();
		});
	});
</script>

<div {id} />
