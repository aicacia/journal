<svelte:options immutable />

<script lang="ts" context="module">
	const HOTKEYS = {
		'mod+b': 'bold',
		'mod+i': 'italic',
		'mod+u': 'underline',
		'mod+`': 'code'
	};
</script>

<script lang="ts">
	import { isHotkey, withSvelte } from 'svelte-slate';
	import {
		Slate,
		Editable,
		HoveringToolbar,
		toggleMark,
		MathElement,
		MATH_TYPE,
		withMath,
		DEFAULT_PLUGINS,
		ImageElement,
		IMAGE_TYPE,
		withImages,
		CodeElement,
		CODE_TYPE,
		withCode
	} from 'svelte-slate/plugins';
	import { createEditor, type BaseSelection } from 'slate';
	import { withHistory } from 'slate-history';
	import Buttons from './Buttons.svelte';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: any[] = [
		{
			type: 'paragraph',
			children: [{ text: '' }]
		}
	];
	export let selection: BaseSelection | null = null;
	export let readOnly = false;
	export let autoFocus = false;
	export let placeholder = 'Type...';
	export let editor = withHistory(withSvelte(createEditor()));
	let plugins = {
		...DEFAULT_PLUGINS,
		[IMAGE_TYPE]: { component: ImageElement, withFn: withImages },
		[CODE_TYPE]: { component: CodeElement, withFn: withCode },
		[MATH_TYPE]: { component: MathElement, withFn: withMath }
	};

	let open = false;
	let ref: HTMLDivElement;

	function onKeyDown(event: KeyboardEvent) {
		Object.entries(HOTKEYS).forEach(([hotkey, mark]) => {
			if (isHotkey(hotkey, event)) {
				event.preventDefault();
				toggleMark(editor, mark);
			}
		});
	}
</script>

<Slate bind:editor bind:selection bind:value {plugins}>
	<HoveringToolbar container={ref} bind:open>
		<div class="border p-1 mb-1 bg-white">
			<Buttons />
		</div>
	</HoveringToolbar>
	<div class="flex flex-grow" {id} {name}>
		<Editable
			bind:ref
			class="flex flex-grow flex-col"
			{autoFocus}
			{readOnly}
			{placeholder}
			{onKeyDown}
		/>
	</div>
</Slate>
