<svelte:options immutable />

<script lang="ts">
	import Portal from 'svelte-portal/src/Portal.svelte';
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import { createInsecureID } from '$lib/util';

	export let onClose: () => void = () => undefined;
	export let open = false;

	let key = createInsecureID();
	let prevOpen: boolean;
	$: if (prevOpen !== open) {
		key = createInsecureID();
		prevOpen = open;
	}

	function close() {
		open = false;
		onClose();
	}
</script>

<Portal>
	<div class="relative z-10" role="dialog" aria-modal="true">
		<div class="fixed inset-0 bg-gray-500 bg-opacity-25" class:hidden={!open} />
		<div class="fixed z-10 inset-0 overflow-y-auto" class:hidden={!open}>
			<div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
				<div class="relative bg-white text-left overflow-hidden shadow-xl sm:my-8 sm:container">
					<div class="flex items-start justify-between px-4 pt-4">
						<div class="flex-grow">
							{#key key}
								<slot name="title" />
							{/key}
						</div>
						<button
							class="bg-transparent border-0 text-black outline-none focus:outline-none"
							on:click={close}
						>
							<div class="w-6 h-6"><MdClose /></div>
						</button>
					</div>
					<div class="relative p-4 flex-auto">
						{#key key}
							<slot />
						{/key}
					</div>
				</div>
			</div>
		</div>
	</div>
</Portal>
