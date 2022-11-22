<svelte:options immutable />

<script lang="ts">
	import Editor from './Editor.svelte';

	export let id: string | undefined = undefined;
	export let value: any;
	export let placeholder = '';
	export let autoFocus = false;

	$: if (!value || value.length === 0) {
		value = [{ type: 'paragraph', children: [{ text: '' }] }];
	}
</script>

<div {id}>
	<Editor bind:value readOnly={true} {autoFocus} {placeholder} />
</div>
