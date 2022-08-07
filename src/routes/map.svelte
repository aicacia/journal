<script lang="ts">
	import JournalMap from '$lib/components/JournalMap.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import { remoteStorageState } from '$lib/state/remoteStorageState';
</script>

<Layout>
	{#if $remoteStorageState.storage === 'connected'}
		<JournalMap />
	{:else}
		<h3 class="text-center py-8 text-lg">Please connect to a Storage Provider</h3>
	{/if}
</Layout>
