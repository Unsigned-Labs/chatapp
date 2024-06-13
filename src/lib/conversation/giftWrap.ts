import { bytesToHex } from '@noble/hashes/utils';
import type { EventTemplate, UnsignedEvent, Event } from 'nostr-tools';
import { getPublicKey, getEventHash, nip44, finalizeEvent, generateSecretKey } from 'nostr-tools';

export function giftWrap(
	message: string,
	recipientPubkey: string,
	senderPrivateKey: Uint8Array
) {
	type Rumor = UnsignedEvent & { id: string };

	const TWO_DAYS = 2 * 24 * 60 * 60;

	const now = () => Math.round(Date.now() / 1000);
	const randomNow = () => Math.round(now() - Math.random() * TWO_DAYS);

	const nip44ConversationKey = (privateKey: Uint8Array, publicKey: string) =>
		nip44.v2.utils.getConversationKey(bytesToHex(privateKey), publicKey);

	const nip44Encrypt = (data: EventTemplate, privateKey: Uint8Array, publicKey: string) =>
		nip44.v2.encrypt(JSON.stringify(data), nip44ConversationKey(privateKey, publicKey));

	const createRumor = (event: Partial<UnsignedEvent>, privateKey: Uint8Array) => {
		const rumor = {
			created_at: now(),
			content: '',
			tags: [],
			...event,
			pubkey: getPublicKey(privateKey)
		} as any;

		rumor.id = getEventHash(rumor);

		return rumor as Rumor;
	};

	const createSeal = (rumor: Rumor, privateKey: Uint8Array, recipientPublicKey: string) => {
		return finalizeEvent(
			{
				kind: 13,
				content: nip44Encrypt(rumor, privateKey, recipientPublicKey),
				created_at: randomNow(),
				tags: []
			},
			privateKey
		) as Event;
	};

	const createWrap = (event: Event, recipientPublicKey: string) => {
		const randomKey = generateSecretKey();

		return finalizeEvent(
			{
				kind: 1059,
				content: nip44Encrypt(event, randomKey, recipientPublicKey),
				created_at: randomNow(),
				tags: [['p', recipientPublicKey]]
			},
			randomKey
		) as Event;
	};

	const rumor = createRumor(
		{
			kind: 1,
			content: message
		},
		senderPrivateKey
	);
	const seal = createSeal(rumor, senderPrivateKey, recipientPubkey);
	const wrap = createWrap(seal, recipientPubkey);
	return wrap;
}

export function unwrap(wrap: Event, recipientPrivateKey: Uint8Array) {
	const nip44ConversationKey = (privateKey: Uint8Array, publicKey: string) =>
		nip44.v2.utils.getConversationKey(bytesToHex(privateKey), publicKey);

	const nip44Decrypt = (data: Event, privateKey: Uint8Array) =>
		JSON.parse(nip44.v2.decrypt(data.content, nip44ConversationKey(privateKey, data.pubkey)));

	// Recipient unwraps with his/her private key.
	const unwrappedSeal = nip44Decrypt(wrap, recipientPrivateKey);
	const unsealedRumor = nip44Decrypt(unwrappedSeal, recipientPrivateKey);
	return unsealedRumor;
}
