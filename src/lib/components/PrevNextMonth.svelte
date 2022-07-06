<svelte:options immutable />

<script lang="ts">
	import { getMonthSortName } from '$lib/util';
	import { locale } from '$lib/state/locale';
	import { currentDate, setCurrentDate } from '$lib/state/currentDate';

	function onPrevDate() {
		setCurrentDate(new Date($currentDate.getFullYear(), $currentDate.getMonth() - 1));
	}
	function onNextDate() {
		setCurrentDate(new Date($currentDate.getFullYear(), $currentDate.getMonth() + 1));
	}
</script>

<div class="flex flex-row justify-center content-center">
	<button class="btn primary px-4" on:click={onPrevDate}>&lt;</button>
	<div class="text-xl p-2">
		{getMonthSortName($locale, $currentDate)}
		{$currentDate.getFullYear()}
	</div>
	<button class="btn primary px-4" on:click={onNextDate}>&gt;</button>
</div>
