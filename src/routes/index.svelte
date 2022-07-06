<script lang="ts">
	import Journal from '$lib/components/Journal.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import RemoteStorage from '$lib/components/RemoteStorage.svelte';
	import { remoteStorageState } from '$lib/state/remoteStorageState';
</script>

<Layout>
	{#if $remoteStorageState.storage === 'connected'}
		<Journal />
	{:else}
		<h3 class="text-center py-8 text-lg">Please connect to a Storage Provider</h3>
	{/if}
</Layout>

<div class="absolute left-0 bottom-0">
	<RemoteStorage />
</div>
