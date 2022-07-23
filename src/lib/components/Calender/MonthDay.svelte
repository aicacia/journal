<svelte:options immutable />

<script lang="ts">
	import { colorOf, getDaySortName, getMonthSortName, isSameDay } from '$lib/util';
	import { journalByMonth, type IJournalEntry } from '$lib/state/journal';
	import { locale } from '$lib/state/locale';

	export let date: Date;
	export let today = new Date();
	export let onSelect: (journalEntry: IJournalEntry) => void = () => {};

	$: isToday = isSameDay(date, today);
	$: entries = ($journalByMonth[date.toISOString().substring(0, 7)] || {})[date.getDate()] || [];
	$: id = date.toISOString().substring(0, 10);
</script>

<div {id} class="p-2 border-t border-l border-gray-300">
	<p class="text-xs text-center">
		{getDaySortName($locale, date)}
		<span
			class="rounded-full inline-block"
			class:bg-black={isToday}
			class:text-white={isToday}
			class:py-1={isToday}
			class:w-6={isToday}
			class:h-6={isToday}>{date.getDate()}</span
		>{#if date.getDate() === 1}, {getMonthSortName($locale, date)}{/if}
	</p>
	<ul>
		{#each entries as entry (entry.id)}
			<li
				class="p-2 text-xs text-white flex justify-between cursor-pointer hover:opacity-80"
				style="background:{colorOf(entry)}"
				on:click={() => onSelect(entry)}
			>
				<span class="flex-1">{entry.createdAt.toLocaleTimeString()}</span>
				{#if entry.location}
					<span class="flex-1 truncate">{entry.location}</span>
				{/if}
			</li>
		{/each}
	</ul>
</div>
