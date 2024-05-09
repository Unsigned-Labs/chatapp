<script>
	let image = [
		['Twitter', 'https://abs.twimg.com/icons/apple-touch-icon-192x192.png'],
		['GitHub', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'],
		['GitHub', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'],
		['GitHub', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'],
		['GitHub', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'],
		['GitHub', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png']
	];
</script>

<div class=" w-[5%] overflow-scroll no-scrollbar h-screen bg-gray-800">
	<div class="flex flex-col items-center">
		<img
			class="w-12 m-2 items-center rounded-full cursor-pointer"
			src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
			alt="Personal Messages"
			title="Personal Messages"
		/>

		{#each image as [name, src]}
			<img class="w-12 m-2 items-center rounded-full cursor-pointer" {src} alt={name} title={name} />
		{/each}
	</div>
</div>
