import type { NDKUser } from '@nostr-dev-kit/ndk';
import { writable, type Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';

export const ndkUser = writable<NDKUser | null>(null);
export const profileUser = writable({});
interface UserLocalStore {
	lastUserLogged: string | undefined;
	pk: string | undefined;
}
export const localStore: Writable<UserLocalStore> = localStorageStore('localStore', {
	lastUserLogged: undefined,
	pk: undefined
});
