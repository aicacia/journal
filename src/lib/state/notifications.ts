import { createInsecureID } from '$lib/util';
import type { Readable } from 'svelte/store';
import { writable } from 'svelte/store';

export enum NotificationType {
	Success = 'success',
	Error = 'error',
	Info = 'info',
	Warning = 'warning'
}

export interface INotification {
	id: string;
	message: string;
	type: NotificationType;
}

const writableNotifications = writable<INotification[]>([]);

export const notifications: Readable<INotification[]> = writableNotifications;

if (typeof window !== 'undefined') {
	(window as any).createNotification = createNotification;
}
export function createNotification(
	message: string,
	type: NotificationType = NotificationType.Error,
	deleteAfterMS = 5000
) {
	const id = createInsecureID();
	writableNotifications.update((state) => [
		...state,
		{
			id,
			message,
			type
		}
	]);
	setTimeout(() => removeNotification(id), deleteAfterMS);
	return id;
}

export function removeNotification(id: string): void {
	writableNotifications.update((state) => {
		const index = state.findIndex((notification) => notification.id === id);

		if (index === -1) {
			return state;
		} else {
			state = state.slice();
			state.splice(index, 1);
			return state;
		}
	});
}
