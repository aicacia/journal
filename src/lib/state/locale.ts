import { browser } from '$app/env';
import { derived } from 'svelte/store';
import { localstorageWritable } from 'svelte-localstorage-writable';

const localeWritable = localstorageWritable('locale', browser ? navigator.language : 'en-US');

export const locale = derived(localeWritable, (state) => state);

export function setLocale(locale: string) {
	localeWritable.set(locale);
}

export function useBrowserLocale() {
	localeWritable.set(navigator.language);
}

if (browser) {
	window.addEventListener('languagechange', () => {
		setLocale(navigator.language);
	});
}
