import { giftWrap } from './giftWrap';
import NDK, { NDKEvent } from '@nostr-dev-kit/ndk';
// import ndkStore from '../../stores/provider';
// import { get as getStore } from 'svelte/store';
// import { getPublicKey } from 'nostr-tools';
// import { privateMessages } from '../../stores/stores';
// import type { decryptedMessage } from './types';

export async function sendMessage(
	ndk: NDK,
	message: string,
	recipientPubkey: string,
	userPrivateKey: Uint8Array
) {
	try {
		const wrappedEvent = giftWrap(message, recipientPubkey, userPrivateKey);
		const messageEvent = new NDKEvent(ndk, wrappedEvent);
		return await messageEvent.publish().then(() => {
			console.log('Message sent');
		});
	} catch (error) {
		console.error('Error sending private message:', error);
	}
}

// export async function getMessages(decryptedMessages: decryptedMessage[]) {
// 	const userPublicKey = getPublicKey(userPrivateKey);
// 	const giftWrapSub = $ndk.subscribe({
// 		kinds: [1059 as number],
// 		'#p': [userPublicKey]
// 	});
// 	giftWrapSub.on('event', async (event) => {
// 		const unwrapped = await unwrap(event, userPrivateKey);
// 		const newMessage = {
// 			created_at: unwrapped.created_at,
// 			author: unwrapped.pubkey === userPublicKey ? 'You' : 'Them',
// 			message: unwrapped.content
// 		};
// 		// privateMessages.update((messages) => [...messages, newMessage]);
// 		decryptedMessages.push(newMessage);
// 		decryptedMessages = decryptedMessages;
// 	});
// }
