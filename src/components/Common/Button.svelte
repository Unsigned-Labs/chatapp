<script>
	export let variant = 'primary';
	export let label = 'Button';
	export let onClick = () => {};
	const getClass = () => {
		switch (variant) {
			case 'primary':
				return 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded';
			case 'secondary':
				return 'bg-green-500 hover:bg-green-600 text-gray-800 font-bold py-2 px-4 rounded';
			case 'cancel':
				return 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded';
			case 'gray':
				return 'bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded';
			default:
				return '';
		}
	};
</script>

<button class={getClass()} on:click|preventDefault={() => onClick()}>{label}</button>
