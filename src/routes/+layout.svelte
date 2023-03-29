<svelte:options immutable />

<script lang="ts" context="module">
	import Layout from '$lib/components/Layout.svelte';
	import '../app.postcss';
</script>

<Layout><slot /></Layout>
