<svelte:options immutable />

<script lang="ts">
	import MdMap from 'svelte-icons/md/MdMap.svelte';
	import FaBook from 'svelte-icons/fa/FaBook.svelte';
	import FaRegCalendarAlt from 'svelte-icons/fa/FaRegCalendarAlt.svelte';
	import PrevNext from './PrevNext.svelte';
	import { activePage, setActivePage } from '$lib/state/activePage';
	import { setCurrentDate } from '$lib/state/currentDate';
	import CreateEntry from './CreateEntry.svelte';
	import { tick } from 'svelte';
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
			<button
				class="p-2 w-full flex hover:bg-gray-200"
				class:bg-gray-200={$activePage === 'calender'}
				on:click={() => setActivePage('calender')}
				role="menuitem"
				tabindex="-1"
				><span class="inline-block w-6 h-6"><FaRegCalendarAlt /></span>
				<span class="inline-block ml-2">Calender</span></button
			>
			<button
				class="p-2 w-full  flex hover:bg-gray-200"
				class:bg-gray-200={$activePage === 'book'}
				on:click={() => setActivePage('book')}
				role="menuitem"
				tabindex="-1"
				><span class="inline-block w-6 h-6"><FaBook /></span>
				<span class="inline-block ml-2">Book</span></button
			>
			<button
				class="p-2 w-full flex hover:bg-gray-200"
				class:bg-gray-200={$activePage === 'map'}
				on:click={() => setActivePage('map')}
				role="menuitem"
				tabindex="-1"
				><span class="inline-block w-6 h-6"><MdMap /></span>
				<span class="inline-block ml-2">Map</span></button
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
