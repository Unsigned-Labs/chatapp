<script>
	import Button from './Common/Button.svelte';
	import Selector from './Common/Selector.svelte';

	let messages = [
		{
			author: 'Alice',
			message: 'Hi Bob!',
			url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
		},
		{
			author: 'Bob',
			message: 'Hi Alice!',
			url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
		}
	];
	let message = '';

	function sendMessage() {
		if (message) {
			messages = [
				...messages,
				{
					author: 'You',
					message,
					url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
				}
			];
			message = '';
		}
	}
</script>

<div class="bg-slate-600 w-[64%] overflow-scroll no-scrollbar">
	<h2 class="text-5xl text-center mt-5">Message Window</h2>

	<div class="mt-10">
		<ul class="my-5 mx-5">
			{#each messages as { author, message, url }}
				<li class="text-white my-5">
					<div class="flex">
						<img
							class="w-12 h-12 rounded-full inline mr-5 align-middle"
							src={url}
							alt="GitHub"
							title="GitHub"
						/>
						<div>
							<p class="font-bold">{author}:</p>
							<p>{message}</p>
						</div>
					</div>
				</li>
			{/each}
		</ul>
		<form on:submit|preventDefault={sendMessage} class="w-full max-w-[65%] fixed bottom-0">
			<input
				type="text"
				bind:value={message}
				class="w-full bg-gray-400 p-2 placeholder:text-gray-800"
				placeholder="Type a message..."
			/>
		</form>
	</div>
</div>
