<svelte:options immutable={true} />

<script lang="ts">
	import type { BaseEditor, Selection } from 'slate';
	import type { ISvelteEditor } from 'svelte-slate';
	import Editor from './Editor.svelte';
	import type { HistoryEditor } from 'slate-history';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: any;
	export let selection: Selection | null = null;
	export let placeholder = 'Type...';
	export let editor: ISvelteEditor | BaseEditor | HistoryEditor | undefined = undefined;
	export let autoFocus = false;

	$: if (!value || value.length === 0) {
		value = [{ type: 'paragraph', children: [{ text: '' }] }];
	}
</script>

<Editor
	{id}
	{name}
	bind:value
	bind:editor
	bind:selection
	readOnly={false}
	{autoFocus}
	{placeholder}
/>
