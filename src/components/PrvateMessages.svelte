<script lang="ts">
	import { getPublicKey } from 'nostr-tools';
	import ndk from '../stores/provider';
	import type { decryptedMessage } from '$lib/conversation/types';
	import { NIP17PrivateDM } from '../services/conversation/nip17PrivateDM';

	export let receiverPubKey: string;
	export let messages: decryptedMessage[] = [];
	let message = '';

	const userPrivateKey = $ndk.signer?.privateKey;
	const userPublicKey = getPublicKey(userPrivateKey);

	async function handleSubmit() {
		if (message) {
			const value = await new NIP17PrivateDM().sendMessage(
				$ndk,
				message,
				receiverPubKey,
				userPrivateKey
			);
			await new NIP17PrivateDM().sendMessage($ndk, message, userPublicKey, userPrivateKey);
			console.log(value);
		}
		message = '';
	}
</script>

<div class="mt-10">
	<ul class="my-5 mx-5">
		{#each messages.sort((a, b) => a.created_at - b.created_at) as { content, author }}
			<li class="text-white mb-2">
				<span class="font-bold">{author}:</span>
				{content}
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
