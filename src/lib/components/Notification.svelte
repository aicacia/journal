<svelte:options immutable />

<script lang="ts">
	import { removeNotification, type INotification } from '$lib/state/notifications';
	import MdError from 'svelte-icons/md/MdError.svelte';
	import MdCheckCircle from 'svelte-icons/md/MdCheckCircle.svelte';
	import MdInfo from 'svelte-icons/md/MdInfo.svelte';
	import MdWarning from 'svelte-icons/md/MdWarning.svelte';

	export let notification: INotification;

	function onDelete() {
		removeNotification(notification.id);
	}
</script>

<div
	class="as-flex as-items-center as-py-2 as-px-3 as-m-1 as-cursor-pointer as-shadow"
	class:as-bg-green-500={notification.type === 'success'}
	class:as-bg-red-500={notification.type === 'error'}
	class:as-bg-blue-500={notification.type === 'info'}
	class:as-bg-yellow-500={notification.type === 'warning'}
	on:click={onDelete}
>
	<div class="as-w-6 as-h-6 as-mr-2 as-text-white">
		{#if notification.type === 'error'}
			<MdError />
		{:else if notification.type === 'success'}
			<MdCheckCircle />
		{:else if notification.type === 'info'}
			<MdInfo />
		{:else if notification.type === 'warning'}
			<MdWarning />
		{/if}
	</div>
	<div class="as-text-white as-max-w-xs ">{notification.message}</div>
</div>
