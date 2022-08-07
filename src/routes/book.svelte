<script lang="ts">
	import JournalBook from '$lib/components/JournalBook.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import { remoteStorageState } from '$lib/state/remoteStorageState';
</script>

<Layout>
	{#if $remoteStorageState.storage === 'connected'}
		<JournalBook />
	{:else}
		<h3 class="text-center py-8 text-lg">Please connect to a Storage Provider</h3>
	{/if}
</Layout>
