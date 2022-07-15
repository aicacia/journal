<svelte:options immutable />

<script lang="ts">
	import { range } from '@aicacia/range';
	import { getDaysInMonth } from '$lib/util';
	import MonthDay from './MonthDay.svelte';
	import type { IJournalEntry } from '$lib/state/journal';

	export let date: Date;
	export let today = new Date();
	export let onSelect: (journalEntry: IJournalEntry) => void = () => {};

	$: numberOfDays = getDaysInMonth(date);
	$: days = range(1, numberOfDays).iter().toArray();

	$: firstDayOfThisMonth = new Date(date.getFullYear(), date.getMonth(), days[0]);
	$: numberOfLastMonthsDaysToFill = firstDayOfThisMonth.getDay() - 1;
	$: numberOfLastMonthsDays = getDaysInMonth(new Date(date.getFullYear(), date.getMonth() - 1));
	$: prevMonthDays = range(
		numberOfLastMonthsDays - numberOfLastMonthsDaysToFill,
		numberOfLastMonthsDays
	)
		.iter()
		.toArray();

	$: totalDays = days.length + prevMonthDays.length;
	$: daysToFill = totalDays > 35 ? 42 - totalDays : 35 - totalDays;
	$: nextMonthDays = daysToFill > 0 ? range(1, daysToFill).iter().toArray() : [];
</script>

<div class="w-full h-full overflow-x-hidden overflow-y-auto">
	<div class="w-full h-full grid grid-cols-1 md:grid-cols-7 border-b border-r border-gray-300">
		{#each prevMonthDays as day}
			<MonthDay date={new Date(date.getFullYear(), date.getMonth() - 1, day)} {today} {onSelect} />
		{/each}
		{#each days as day}
			<MonthDay date={new Date(date.getFullYear(), date.getMonth(), day)} {today} {onSelect} />
		{/each}
		{#each nextMonthDays as day}
			<MonthDay date={new Date(date.getFullYear(), date.getMonth() + 1, day)} {today} {onSelect} />
		{/each}
	</div>
</div>
