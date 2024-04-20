import { get as getStore } from 'svelte/store';
import ndkStore from '../../stores/provider';
import { NDKNip07Signer, NDKPrivateKeySigner, NDKUser } from '@nostr-dev-kit/ndk';
import { localStore, ndkUser } from '../../stores/stores';

export async function NDKlogin(): Promise<NDKUser | undefined> {
	const $ndk = getStore(ndkStore);
	const signer = new NDKNip07Signer();
	$ndk.signer = signer;
	ndkStore.set($ndk);
	const ndkCurrentUser = await signer.user();
	const user = $ndk.getUser({
		pubkey: ndkCurrentUser.pubkey,
		npub: ndkCurrentUser.npub
	});
	ndkUser.set(user);
	localStore.set({ lastUserLogged: ndkCurrentUser.npub, pk: undefined });
	return user;
}

export async function privkeyLogin(pk: string): Promise<NDKUser | undefined> {
	if (!pk) return undefined;

	const $ndk = getStore(ndkStore);
	const signer = new NDKPrivateKeySigner(pk);
	$ndk.signer = signer;
	ndkStore.set($ndk);
	const ndkCurrentUser = await signer.user();
	const user = $ndk.getUser({
		pubkey: ndkCurrentUser.pubkey,
		npub: ndkCurrentUser.npub
	});
	console.log(user.npub, user.pubkey);
	ndkUser.set(user);
	localStore.set({ lastUserLogged: ndkCurrentUser.npub, pk });
	return user;
}
