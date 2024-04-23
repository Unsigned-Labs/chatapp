import { get as getStore } from 'svelte/store';
import ndkStore from '../../stores/provider';
import { type NDKUserProfile } from '@nostr-dev-kit/ndk';
import { db } from '@nostr-dev-kit/ndk-cache-dexie';

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
