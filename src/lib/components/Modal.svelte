<svelte:options immutable />

<script lang="ts">
	import Portal from 'svelte-portal/src/Portal.svelte';
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import { createInsecureID } from '$lib/util';
	import { clickoutside } from '@svelte-put/clickoutside';

	export let onClose: () => void = () => undefined;
	export let small = false;
	export let open = false;

	let key = createInsecureID();
	let prevOpen: boolean;
	let openedAt: number;
	$: if (prevOpen !== open) {
		key = createInsecureID();
		prevOpen = open;
		openedAt = Date.now();
	}

	function close() {
		open = false;
		onClose();
	}

	function onClickOutside() {
		if (openedAt <= Date.now() - 100) {
			open = false;
			onClose();
		}
	}
</script>

<Portal>
	<div class="relative z-[10000]" role="dialog" aria-modal="true">
		<div class="fixed inset-0 bg-gray-500 bg-opacity-25" class:hidden={!open} />
		<div class="fixed z-[10000] inset-0 overflow-y-auto" class:hidden={!open}>
			<div class="flex justify-center content-center text-center min-h-full p-4 sm:p-0">
				<div
					class="flex flex-col relative bg-white text-left shadow-xl sm:container"
					class:m-auto={small}
					use:clickoutside={{ event: 'mousedown' }}
					on:clickoutside={onClickOutside}
				>
					<div class="flex flex-row flex-shrink items-start justify-between px-4 pt-4">
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
					<div class="relative p-4 flex-col flex-grow">
						{#key key}
							<slot />
						{/key}
					</div>
				</div>
			</div>
		</div>
	</div>
</Portal>
