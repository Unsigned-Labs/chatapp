<script lang="ts">
	import ndk from '../stores/provider';
	import { onMount } from 'svelte';
	import { getPublicKey } from 'nostr-tools';
	import { NIP59GiftWrapper } from '$lib/conversation/nip59GiftWrap';
	import { allPrivateMessageMap, allPrivateMessages } from '../stores/stores';
	import { goto } from '$app/navigation';

	const userPrivateKey = $ndk.signer?.privateKey;
	const userPublicKey = getPublicKey(userPrivateKey);

	const receivedSub = $ndk.subscribe({
		kinds: [1059 as number],
		'#p': [userPublicKey]
	});

	receivedSub.on('event', async (event) => {
		const unwrapped = await new NIP59GiftWrapper().unwrapEvent(event, userPrivateKey);
		const author = unwrapped.pubkey;
		const newMessage = {
			id: event.id,
			created_at: unwrapped.created_at,
			content: unwrapped.content,
			author: unwrapped.pubkey
		};

		allPrivateMessageMap.update((currentMap) => {
			if (!currentMap.has(newMessage.id)) {
				currentMap.set(newMessage.id, newMessage);

				allPrivateMessages.update((currentMessages) => {
					let authorGroup = currentMessages.find((group) => group.author === author);

					if (authorGroup) {
						authorGroup.messages.push(newMessage);
					} else {
						authorGroup = { author, messages: [newMessage] };
						currentMessages.push(authorGroup);
					}

					return [...currentMessages];
				});
			}

			return new Map(currentMap);
		});
	});

	onMount(async () => {
		await receivedSub.start();
	});
</script>

<div class=" w-[15%] h-screen overflow-scroll no-scrollbar bg-gray-700">
	<div class="flex flex-col mt-12">
		{#each $allPrivateMessages as allPrivateMessages}
			<button
				class="flex items-center cursor-pointer"
				on:click={() => goto(`?private-messages-user=${allPrivateMessages.author}`)}
			>
				<img
					class="w-12 h-12 m-2 items-center rounded-full align-middle"
					src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
					alt="profile"
					style="vertical-align: middle;"
				/>
				<span>{allPrivateMessages.author}</span>
			</button>
		{/each}
	</div>
</div>
