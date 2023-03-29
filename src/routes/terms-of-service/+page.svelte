<svelte:options immutable />

<script lang="ts">
	import { base } from '$app/paths';

	import Layout from '$lib/components/Layout.svelte';
</script>

<div class="container mx-auto p-4 mt-4 mb-8">
	<h1 class="text-2xl">Terms of Service</h1>
	<hr />
	<p>Simple Terms of Service, do what you want with this.</p>
	<div class="text-center mt-4">
		<a role="button" class="underline" href={`${base}/`}>Journal</a>
	</div>
</div>
