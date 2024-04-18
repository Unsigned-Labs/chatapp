import type { NDKUser } from '@nostr-dev-kit/ndk';
import { writable } from 'svelte/store';

export const ndkUser = writable<NDKUser | null>(null);
export const profileUser = writable([{}]);
