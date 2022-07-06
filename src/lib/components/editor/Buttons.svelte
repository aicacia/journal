<script lang="ts">
	import BlockButton from './BlockButton.svelte';
	import MarkButton from './MarkButton.svelte';
	import ImageButton from './ImageButton.svelte';
	import CodeButton from './CodeButton.svelte';
	import MathButton from './MathButton.svelte';
	import MdFormatBold from 'svelte-icons/md/MdFormatBold.svelte';
	import MdCode from 'svelte-icons/md/MdCode.svelte';
	import MdLooksOne from 'svelte-icons/md/MdLooksOne.svelte';
	import MdLooksTwo from 'svelte-icons/md/MdLooksTwo.svelte';
	import MdFormatItalic from 'svelte-icons/md/MdFormatItalic.svelte';
	import MdFormatUnderlined from 'svelte-icons/md/MdFormatUnderlined.svelte';
	import MdFormatListNumbered from 'svelte-icons/md/MdFormatListNumbered.svelte';
	import MdFormatListBulleted from 'svelte-icons/md/MdFormatListBulleted.svelte';
	import MdFormatQuote from 'svelte-icons/md/MdFormatQuote.svelte';
</script>

<MarkButton format="bold"><MdFormatBold /></MarkButton>
<MarkButton format="italic"><MdFormatItalic /></MarkButton>
<MarkButton format="underline"><MdFormatUnderlined /></MarkButton>
<MarkButton format="code"><MdCode /></MarkButton>
<BlockButton format="heading1"><MdLooksOne /></BlockButton>
<BlockButton format="heading2"><MdLooksTwo /></BlockButton>
<BlockButton format="block-quote"><MdFormatQuote /></BlockButton>
<BlockButton format="numbered-list"><MdFormatListNumbered /></BlockButton>
<BlockButton format="bulleted-list"><MdFormatListBulleted /></BlockButton>
<ImageButton />
<CodeButton />
<MathButton />
