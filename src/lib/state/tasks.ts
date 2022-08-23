import { browser } from '$app/env';
import { remoteStorage } from '$lib/remoteStorage';
import { derived, get, writable } from 'svelte/store';

const loadingWritable = writable(false);

export const loading = derived(loadingWritable, (state) => state);

remoteStorage.addEventListener('sync-req-done', () => {
	loadingWritable.set(true);
});
remoteStorage.addEventListener('sync-done', () => {
	loadingWritable.set(false);
});

if (browser) {
	window.addEventListener('beforeunload', (e) => {
		if (get(loadingWritable)) {
			const confirmationMessage =
				'It looks like you have been editing something. If you leave before saving, your changes will be lost.';
			(e || window.event).returnValue = confirmationMessage;
			return confirmationMessage;
		}
	});
}
