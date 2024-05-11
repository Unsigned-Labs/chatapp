<script>
	let servers = [
		{
			name: 'Aashutosh Rathi',
			image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
		},
		{
			name: 'Benoît Tigeot',
			image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
		},
		{
			name: 'Christopher Hiller',
			image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
		},
		{
			name: 'Damian Staszewski',
			image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
		},
		{
			name: 'Fabio Vedovelli',
			image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
		},
		{
			name: 'Hugo Dias',
			image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
		},
		{
			name: 'Jeremy Rice',
			image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
		},
		{ name: 'Kacper Jastycz', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
		{ name: 'Kyle Fuller', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
		{ name: 'Lars Kappert', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
		{ name: 'Matthew Holland', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
		{ name: 'Olivier Tassinari', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
		{ name: 'Pierre Carrier', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
		{ name: 'Rogerio Pereirawender', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
		{ name: 'Sebastian Sebald', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
		{ name: 'Timothy Kempf', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
		{ name: 'Victor Gomes', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' }
	];
</script>

<div class=" w-[15%] h-screen overflow-scroll no-scrollbar  bg-gray-700">
	<div class="flex flex-col mt-12">
		{#each servers as { name, image }}
			<span class="flex items-center cursor-pointer">
				<img
					class="w-12 h-12 m-2 items-center rounded-full align-middle"
					src={image}
					alt={name}
					title={name}
					style="vertical-align: middle;"
				/>
				<span class="align-middle">{name}</span>
			</span>
		{/each}
	</div>
</div>
