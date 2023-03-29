import { remoteStorage } from '$lib/remoteStorage';
import { derived, writable } from 'svelte/store';

export interface IRemoteStorageState {
	storage: 'connected' | 'disconnected';
	wire: 'syncing' | 'idle';
}

const remoteStorageStateWritable = writable<IRemoteStorageState>({
	storage: remoteStorage.connected ? 'connected' : 'disconnected',
	wire: 'idle'
});

export const remoteStorageState = derived(remoteStorageStateWritable, (state) => state);

remoteStorage.addEventListener('connected', () => {
	updateState({ storage: 'connected' });
});
remoteStorage.addEventListener('disconnected', () => {
	updateState({ storage: 'disconnected' });
});
remoteStorage.addEventListener('wire-busy', () => {
	updateState({ wire: 'syncing' });
});
remoteStorage.addEventListener('wire-done', () => {
	updateState({ wire: 'idle' });
});

function updateState(newState: Partial<IRemoteStorageState>) {
	remoteStorageStateWritable.update((state) => ({
		...state,
		...newState
	}));
}
