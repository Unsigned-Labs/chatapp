import type NDK from '@nostr-dev-kit/ndk';

export interface PrivateDMInterface {
	/* eslint-disable @typescript-eslint/no-explicit-any */
	sendMessage(
		ndk: NDK,
		message: string,
		recipientPubkey: string,
		userPrivateKey: Uint8Array
	): Promise<'messageSent' | 'error'>;
}
