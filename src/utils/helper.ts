import { get as getStore } from 'svelte/store';
import ndkStore from '../stores/provider';
import { NDKNip07Signer, NDKUser, type NDKUserProfile } from '@nostr-dev-kit/ndk';
import { ndkUser } from '../stores/stores';
import { db } from '@nostr-dev-kit/ndk-cache-dexie';

export async function NDKlogin(): Promise<NDKUser | undefined> {
	const $ndk = getStore(ndkStore);
	const signer = new NDKNip07Signer();
	$ndk.signer = signer;
	// let value = await signer.blockUntilReady();
	ndkStore.set($ndk);
	const ndkCurrentUser = await signer.user();
	const user = $ndk.getUser({
		pubkey: ndkCurrentUser.pubkey,
		npub: ndkCurrentUser.npub
	});
	ndkUser.set(user);
	// localStore.set({ lastUserLogged: ndkCurrentUser.npub, pk: undefined });
	return user;
}

export async function fetchUserProfile(opts: string): Promise<NDKUserProfile> {
	try {
		if (window) {
			const user = await db.users.where({ pubkey: opts }).first();
			if (!user) {
				const $ndk = getStore(ndkStore);
				const ndkUser = $ndk.getUser({ pubkey: opts });
				await ndkUser.fetchProfile({
					closeOnEose: true,
					groupable: false,
					groupableDelay: 200
				});
				return ndkUser.profile as NDKUserProfile;
			} else {
				return user.profile as NDKUserProfile;
			}
		} else {
			return {};
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}
