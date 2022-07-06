declare module 'remotestorage-widget' {
	import type RemoteStorage from 'remotestoragejs';

	export default class Widget {
		rsWidget: HTMLElement | undefined;
		rsChooseDropboxButton: HTMLElement | undefined;
		rsChooseGoogleDriveButton: HTMLElement | undefined;

		constructor(remoteStorage: RemoteStorage);
		attach(id: string);
	}
}
