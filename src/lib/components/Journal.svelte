<svelte:options immutable />

<script lang="ts">
	import { activePage } from '$lib/state/activePage';
	import JournalBook from './JournalBook.svelte';
	import JournalMap from './JournalMap.svelte';
	import JournalMonth from './JournalMonth.svelte';
</script>

{#if $activePage === 'calender'}
	<JournalMonth />
{:else if $activePage === 'book'}
	<JournalBook />
{:else if $activePage === 'map'}
	<JournalMap />
{/if}
