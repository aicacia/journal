<svelte:options immutable />

<script lang="ts">
	import DesktopControls from './DesktopControls.svelte';
	import MobileControlsBottom from './MobileControlsBottom.svelte';
	import MobileControlsTop from './MobileControlsTop.svelte';

	export let months = true;

	let innerWidth = 1024;
</script>

<svelte:window bind:innerWidth />

<div class="flex flex-col w-full h-full pb-[80px]">
	{#if innerWidth >= 640}
		<DesktopControls {months} />
	{:else}
		<MobileControlsTop />
	{/if}
	<slot />
	{#if innerWidth < 640}
		<MobileControlsBottom {months} />
	{/if}
</div>
