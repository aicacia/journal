<script lang="ts">
	import { getEditorContext } from 'svelte-slate';
	import Button from './Button.svelte';
	import MdImage from 'svelte-icons/md/MdImage.svelte';
	import MdCheck from 'svelte-icons/md/MdCheck.svelte';
	import { insertImage, isUrl } from 'svelte-slate/plugins';
	import Modal from '../Modal.svelte';

	const editorContext = getEditorContext();
	$: editor = $editorContext;

	let url: string;
	let entering = false;

	function onMouseDown() {
		entering = true;
	}
	function onEnter() {
		if (isUrl(url)) {
			insertImage(editor, url);
			url = '';
			entering = false;
		}
	}
</script>

<Button {onMouseDown}>
	<MdImage />
</Button>

<Modal bind:open={entering}>
	<div class="input-group">
		<input
			type="text"
			class="form-control"
			id="editor-image-url"
			placeholder="Image URL"
			bind:value={url}
		/>
		<Button active={!isUrl(url)} onMouseDown={onEnter}><MdCheck /></Button>
	</div>
</Modal>
