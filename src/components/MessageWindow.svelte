<script lang="ts">
	import { goto } from '$app/navigation';
	import PrivateMessage from '../components/PrvateMessages.svelte';
	import Button from './Common/Button.svelte';
	import InputField from './Common/InputField.svelte';
	let receiverNpub = '';

	let isConversationOpen = false;
</script>

<div class="bg-slate-600 w-[65%] overflow-scroll no-scrollbar">
	<h2 class="text-5xl text-center mt-5">Message Window</h2>
	{#if receiverNpub && isConversationOpen}
		<PrivateMessage {receiverNpub} />
	{:else}
		<p class="text-white text-center mt-5">Select a user to start chatting</p>
		<div class="flex gap-5 m-4 items-center">
			<InputField type="text" bind:value={receiverNpub} />
			<Button
				label="Start Converstation"
				onClick={() => {
					isConversationOpen = !isConversationOpen;
					if (receiverNpub) {
						goto(`?user=${receiverNpub}`);
					}
				}}
			/>
		</div>
	{/if}
</div>
