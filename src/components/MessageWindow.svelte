<script lang="ts">
	import PrivateMessage from '../components/PrvateMessages.svelte';
	import { allPrivateMessages } from '../stores/stores';
	let receiverPubKey = '';
	import { page } from '$app/stores';

	$: {
		const url = $page.url;
		const queryParams = new URLSearchParams(url.search);
		receiverPubKey = queryParams.get('private-messages-user') || '';
	}

	$: messages = $allPrivateMessages.find((obj) => obj.author === receiverPubKey)?.messages || [];
</script>

<div class="bg-slate-600 w-[65%] overflow-scroll no-scrollbar">
	<h2 class="text-5xl text-center mt-5">Message Window</h2>
	{#if receiverPubKey}
		<PrivateMessage {receiverPubKey} {messages} />
	{/if}
</div>
