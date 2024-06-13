<script lang="ts">
	import { unwrap } from '$lib/conversation/giftWrap';
	import { getPublicKey, nip19 } from 'nostr-tools';
	import ndk from '../stores/provider';
	import type { decryptedMessage } from '$lib/conversation/types';
	import { onMount } from 'svelte';
	import { sendMessage } from '$lib/conversation';

	export let receiverNpub: string;

	let decryptedMessages: decryptedMessage[] = [];
	let message = '';

	const receiver = nip19.decode(receiverNpub).data as string;

	const userPrivateKey = $ndk.signer?.privateKey;
	const userPublicKey = getPublicKey(userPrivateKey);
	const giftWrapSub = $ndk.subscribe({
		kinds: [1059 as number],
		'#p': [userPublicKey]
	});
	giftWrapSub.on('event', async (event) => {
		const unwrapped = await unwrap(event, userPrivateKey);
		const newMessage = {
			// created_at: unwrapped.created_at,
			author: unwrapped.pubkey === userPublicKey ? 'You' : 'Them',
			message: unwrapped.content
		};
		// privateMessages.update((messages) => [...messages, newMessage]);
		decryptedMessages.push(newMessage);
		decryptedMessages = decryptedMessages;
	});

	onMount(async () => {
		await giftWrapSub.start();
	});

	async function handleSubmit() {
		if (message) {
			await sendMessage($ndk, message, receiver, userPrivateKey);
			decryptedMessages.push({
				author: 'You',
				message: message
			});
			decryptedMessages = decryptedMessages;
		}
		message = '';
	}
</script>

<div class="mt-10">
	<ul class="my-5 mx-5">
		{#each decryptedMessages as { author, message }}
			<li class="text-white mb-2">
				<span class="font-bold">{author}:</span>
				<!-- <Name {$ndk} pubkey={author} />
					<Name {$ndk} pubkey={author} class="font-medium text-lg" /> -->
				{message}
			</li>
		{/each}
	</ul>
	<form on:submit|preventDefault={handleSubmit} class="w-full max-w-[65%] fixed bottom-0">
		<input
			type="text"
			bind:value={message}
			class="w-full bg-gray-400 p-2 placeholder:text-gray-800"
			placeholder="Type a message..."
		/>
	</form>
</div>
