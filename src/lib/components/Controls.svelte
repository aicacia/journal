<svelte:options immutable />

<script lang="ts">
	import MdMap from 'svelte-icons/md/MdMap.svelte';
	import FaBook from 'svelte-icons/fa/FaBook.svelte';
	import FaRegCalendarAlt from 'svelte-icons/fa/FaRegCalendarAlt.svelte';
	import PrevNext from './PrevNext.svelte';
	import { setCurrentDate } from '$lib/state/currentDate';
	import CreateEntry from './CreateEntry.svelte';
	import { tick } from 'svelte';
	import { page } from '$app/stores';
	import Dropdown from './Dropdown.svelte';

	export let months = true;

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
		<button class="btn primary" on:click={onToday}>Today</button>
		<Dropdown>
			<a
				class="p-2 flex hover:bg-gray-200"
				class:bg-gray-200={$page.url.pathname === '/'}
				href="/"
				role="menuitem"
				tabindex="-1"
				><span class="inline-block w-6 h-6"><FaRegCalendarAlt /></span>
				<span class="inline-block ml-2">Calender</span></a
			>
			<a
				class="p-2 flex hover:bg-gray-200"
				class:bg-gray-200={$page.url.pathname === '/book'}
				href="/book"
				role="menuitem"
				tabindex="-1"
				><span class="inline-block w-6 h-6"><FaBook /></span>
				<span class="inline-block ml-2">Book</span></a
			>
			<a
				class="p-2 flex hover:bg-gray-200"
				class:bg-gray-200={$page.url.pathname === '/map'}
				href="/map"
				role="menuitem"
				tabindex="-1"
				><span class="inline-block w-6 h-6"><MdMap /></span>
				<span class="inline-block ml-2">Map</span></a
			>
		</Dropdown>
	</div>
	<div class="flex-1">
		<div class="flex justify-center">
			<PrevNext {months} />
		</div>
	</div>
	<div class="flex justify-center md:justify-end">
		<button class="btn primary px-4" on:click={onOpenCreate}>Create</button>
	</div>
</div>

<CreateEntry bind:open />
