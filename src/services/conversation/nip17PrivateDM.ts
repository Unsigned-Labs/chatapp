import type { PrivateDMInterface } from '../../interfaces/privateDMInterface';
import { NIP59GiftWrapper } from '../../lib/conversation/nip59GiftWrap';
import NDK, { NDKEvent } from '@nostr-dev-kit/ndk';

export class NIP17PrivateDM implements PrivateDMInterface {
	async sendMessage(
		ndk: NDK,
		message: string,
		recipientPubkey: string,
		userPrivateKey: Uint8Array
	): Promise<'messageSent' | 'error'> {
		try {
			const wrappedEvent = new NIP59GiftWrapper().wrapEvent(
				message,
				recipientPubkey,
				userPrivateKey
			);
			const messageEvent = new NDKEvent(ndk, wrappedEvent);
			await messageEvent.publish();
			return 'messageSent';
		} catch (error) {
			console.log('Error in Sending Message' + error);
			return 'error';
		}
	}
}
