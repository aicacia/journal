<svelte:options immutable />

<script lang="ts">
	import { base } from '$app/paths';
	import { loading } from '$lib/state/tasks';
	import RemoteStorage from './RemoteStorage.svelte';
	import Spinner from './Spinner.svelte';
</script>

<div class="absolute bottom-0 w-full flex z-[1000]">
	<div class="absolute bottom-0 w-full">
		<div class="text-center text-xs mt-8">
			&copy; {new Date().getFullYear()}
			<a href={base}>aicacia.github.io/journal</a>
		</div>
		<div class="text-center text-xs my-2">
			<a target="_blank" href="https://github.com/aicacia/journal">Source Code</a>
			|
			<a target="_blank" href={`${base}/privacy-policy`}>Privacy Policy</a>
			|
			<a target="_blank" href={`${base}/terms-of-service`}>Terms of Service</a>
		</div>
	</div>

	<div class="absolute left-0 bottom-0">
		<RemoteStorage />
	</div>

	<div class="absolute right-4 bottom-4">
		{#if $loading}
			<Spinner />
		{/if}
	</div>
</div>
