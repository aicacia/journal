import { derived, writable } from 'svelte/store';

const tasksWritable = writable(0);

export const tasks = derived(tasksWritable, (state) => state);
export const loading = derived(tasksWritable, (state) => state !== 0);

export async function wrap<T>(promise: Promise<T>): Promise<T> {
	addTask();
	return promise.finally(removeTask);
}

function addTask(): void {
	tasksWritable.update((state) => state + 1);
}
function removeTask(): void {
	tasksWritable.update((state) => state - 1);
}
