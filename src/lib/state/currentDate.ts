import { writable, derived } from 'svelte/store';

const currentDateWritable = writable(new Date());

export const currentDate = derived(currentDateWritable, (state) => state);

export function setCurrentDate(date: Date) {
	currentDateWritable.set(date);
}
