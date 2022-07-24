import { remoteStorage } from '$lib/remoteStorage';
import { derived, writable } from 'svelte/store';

const loadingWritable = writable(false);

export const loading = derived(loadingWritable, (state) => state);

remoteStorage.addEventListener('sync-req-done', () => {
	loadingWritable.set(true);
});
remoteStorage.addEventListener('sync-done', () => {
	loadingWritable.set(false);
});
