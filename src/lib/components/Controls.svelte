<svelte:options immutable />

<script lang="ts">
	import PrevNextMonth from './PrevNextMonth.svelte';
	import { setCurrentDate } from '$lib/state/currentDate';
	import CreateEntry from './CreateEntry.svelte';
	import { tick } from 'svelte';
	import { loading } from '$lib/state/tasks';
	import Spinner from './Spinner.svelte';

	async function onToday() {
		const today = new Date();
		setCurrentDate(today);
		await tick();
		document.getElementById(today.toISOString().substring(0, 10))?.scrollIntoView();
	}
	let open = false;
	function onOpenCreate() {
		open = true;
	}
</script>

<div class="flex flex-col md:flex-row justify-between">
	<div class="flex justify-center md:justify-start">
		<button class="btn primary px-4" on:click={onToday}>Today</button>
		<div class="flex flex-col justify-center px-2">
			{#if $loading}
				<Spinner />
			{:else}
				<div class="w-8 h-8" />
			{/if}
		</div>
	</div>
	<div class="flex-1">
		<div class="flex justify-center">
			<PrevNextMonth />
		</div>
	</div>
	<div class="flex justify-center md:justify-end">
		<button class="btn primary px-4" on:click={onOpenCreate}>Create Entry</button>
	</div>
</div>

<CreateEntry bind:open />
