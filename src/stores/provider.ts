import type { NDKCacheAdapter } from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';
import NDKSvelte from '@nostr-dev-kit/ndk-svelte';
import { writable } from 'svelte/store';

export const defaulRelaysUrls: string[] = ['wss://purplepag.es', 'wss://relay.nostr.band'];
let cacheAdapter: NDKCacheAdapter | undefined;

if (window) {
	cacheAdapter = new NDKCacheAdapterDexie({
		dbName: 'chatapp',
		expirationTime: 3600 * 24 * 2
	});
}

const ndk = new NDKSvelte({
	explicitRelayUrls: defaulRelaysUrls,
	cacheAdapter
});

const ndkStore = writable(ndk);

export default ndkStore;
