import { get as getStore } from 'svelte/store';
import ndkStore, { bunkerNDKStore } from '../../stores/provider';
import { NDKNip07Signer, NDKNip46Signer, NDKPrivateKeySigner, NDKUser } from '@nostr-dev-kit/ndk';
import { localStore, ndkUser, profileUser } from '../../stores/stores';

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

export async function nsecBunkerLogin(nip46ConnectionString: string): Promise<NDKUser | undefined> {
	const $ndk = getStore(ndkStore);
	const $bunkerNDK = getStore(bunkerNDKStore);
	ndkStore.set($ndk);
	bunkerNDKStore.set($bunkerNDK);

	const existingPrivateKey = localStorage.getItem('nostr-nsecbunker-key');
	let localSigner: NDKPrivateKeySigner;
	// console.log(existingPrivateKey);

	if (existingPrivateKey) {
		localSigner = new NDKPrivateKeySigner(existingPrivateKey);

		if (!localSigner.privateKey) {
			localSigner = NDKPrivateKeySigner.generate();
		}
	} else {
		localSigner = NDKPrivateKeySigner.generate();
	}

	let remoteSigner: NDKNip46Signer;

	if (nip46ConnectionString.includes('@')) {
		const user = await $ndk.getUserFromNip05(nip46ConnectionString);
		if (!user?.pubkey) throw new Error('Cant find user');
		console.log('Found user', user);

		remoteSigner = new NDKNip46Signer($ndk, nip46ConnectionString, localSigner);

		remoteSigner.remoteUser = user;
		remoteSigner.remotePubkey = user.pubkey;
	} else if (nip46ConnectionString.startsWith('bunker://')) {
		const uri = new URL(nip46ConnectionString);
		console.log(uri);

		const pubkey = uri.host || uri.pathname.replace('//', '');
		const relays = uri.searchParams.getAll('relay');
		for (const relay of relays) $ndk.addExplicitRelay(relay);
		if (relays.length === 0) throw new Error('Missing relays');
		remoteSigner = new NDKNip46Signer($ndk, pubkey, localSigner);
		remoteSigner.relayUrls = relays;
	} else {
		remoteSigner = new NDKNip46Signer($ndk, nip46ConnectionString, localSigner);
	}

	remoteSigner.rpc.on('authUrl', (url: string) => {
		console.log(url);
		window.open(url, '_blank');
	});

	await remoteSigner.blockUntilReady();
	await remoteSigner.user();

	if (!existingPrivateKey) {
		localStorage.setItem('nostr-nsecbunker-key', localSigner.privateKey!);
	}
	$ndk.signer = remoteSigner;
	const ndkCurrentUser = await remoteSigner.user();
	const user = $ndk.getUser({
		pubkey: ndkCurrentUser.pubkey,
		npub: ndkCurrentUser.npub
	});
	ndkUser.set(user);
	localStore.set({ lastUserLogged: ndkCurrentUser.npub, pk: undefined });
	return user;
}

export function logout() {
	ndkUser.set(null);
	profileUser.set({});
	localStore.update(() => {
		return {
			lastUserLogged: undefined,
			pk: undefined
		};
	});
}
