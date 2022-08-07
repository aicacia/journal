import { localstorageWritable } from 'svelte-localstorage-writable';
import { derived } from 'svelte/store';

export type IActivePage = 'calender' | 'book' | 'map';

const activePageWritable = localstorageWritable<IActivePage>('active-page', 'calender');

export const activePage = derived(activePageWritable, (state) => state);

export function setActivePage(activePage: IActivePage) {
	activePageWritable.set(activePage);
}
