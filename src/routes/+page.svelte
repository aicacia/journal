<svelte:options immutable />

<script lang="ts">
	import Journal from '$lib/components/Journal.svelte';
	import { remoteStorageState } from '$lib/state/remoteStorageState';
</script>

{#if $remoteStorageState.storage === 'connected'}
	<Journal />
{:else}
	<h3 class="text-center py-8 text-lg">Please connect to a Storage Provider</h3>
{/if}
