<svelte:options immutable />

<script lang="ts">
	import { getDateSortName, getMonthSortName } from '$lib/util';
	import { locale } from '$lib/state/locale';
	import { currentDate, setCurrentDate } from '$lib/state/currentDate';

	export let months = true;

	function onPrevDate() {
		const date = months
			? new Date($currentDate.getFullYear(), $currentDate.getMonth() - 1)
			: new Date($currentDate.getFullYear(), $currentDate.getMonth(), $currentDate.getDate() - 1);
		setCurrentDate(date);
	}
	function onNextDate() {
		const date = months
			? new Date($currentDate.getFullYear(), $currentDate.getMonth() + 1)
			: new Date($currentDate.getFullYear(), $currentDate.getMonth(), $currentDate.getDate() + 1);
		setCurrentDate(date);
	}
</script>

<div class="flex flex-row justify-center content-center">
	<button class="btn primary px-4" on:click={onPrevDate}>&lt;</button>
	<div class="text-xl p-2">
		{months ? getMonthSortName($locale, $currentDate) : getDateSortName($locale, $currentDate)}
		{$currentDate.getFullYear()}
	</div>
	<button class="btn primary px-4" on:click={onNextDate}>&gt;</button>
</div>
