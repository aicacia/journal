<svelte:options immutable />

<script lang="ts">
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { notifications } from '$lib/state/notifications';
	import Notification from './Notification.svelte';
</script>

<div class="as-fixed as-top-0 as-left-0 as-w-full">
	<div class="as-container as-mx-auto">
		{#each $notifications as notification (notification.id)}
			<div
				class="as-w-full"
				animate:flip
				in:fly={{ y: -64, duration: 300 }}
				out:fly={{ y: -64, duration: 300 }}
			>
				<Notification {notification} />
			</div>
		{/each}
	</div>
</div>
