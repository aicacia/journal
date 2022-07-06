import { DROPBOX_CLIENT_ID, GOOGLE_DRIVE_CLIENT_ID } from '$lib/constants';
import RemoteStorage from 'remotestoragejs';

export const remoteStorage = new RemoteStorage();

remoteStorage.setApiKeys({
	dropbox: DROPBOX_CLIENT_ID,
	googledrive: GOOGLE_DRIVE_CLIENT_ID
});
