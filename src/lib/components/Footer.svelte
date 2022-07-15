<svelte:options immutable />

<script lang="ts">
	import { base } from '$app/paths';
</script>

<div class="text-center text-xs mt-8">
	&copy; {new Date().getFullYear()}
	<a target="_blank" href={base}>aicacia.github.io/journal</a>
</div>
<div class="text-center text-xs my-2">
	<a target="_blank" href={`${base}/privacy-policy`}>Privacy Policy</a>
	|
	<a target="_blank" href={`${base}/terms-of-service`}>Terms of Service</a>
</div>
