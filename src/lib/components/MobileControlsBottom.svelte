<svelte:options immutable />

<script lang="ts">
	import PrevNext from './PrevNext.svelte';

	export let months = true;
</script>

<div class="flex justify-center">
	<div class="flex-1">
		<div class="flex justify-center">
			<PrevNext {months} />
		</div>
	</div>
</div>
