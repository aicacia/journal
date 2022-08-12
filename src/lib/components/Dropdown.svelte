<script lang="ts">
	import MdKeyboardArrowDown from 'svelte-icons/md/MdKeyboardArrowDown.svelte';

	export let open = false;

	function onOpen() {
		open = !open;
	}
</script>

<div class="relative inline-block">
	<div>
		<button type="button" class="btn btn primary" on:click={onOpen}>
			<slot name="label" />
			<div class="w-8 h-8">
				<MdKeyboardArrowDown />
			</div>
		</button>
	</div>
	<div
		class="origin-top-left absolute left-0 mt-2 w-56 shadow bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[1001]"
		role="menu"
		class:scale-0={!open}
		class:scale-100={open}
		tabindex="-1"
	>
		<div class="py-1" role="none">
			<slot />
		</div>
	</div>
</div>
