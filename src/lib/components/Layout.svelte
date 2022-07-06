<svelte:options immutable />

<script lang="ts">
	import Footer from './Footer.svelte';
	import Notifications from './Notifications.svelte';
</script>

<div class="relative flex w-full h-full">
	<div class="flex flex-col w-full h-full">
		<div class="flex flex-col flex-grow">
			<slot />
		</div>
		<Footer />
	</div>
</div>
<Notifications />
