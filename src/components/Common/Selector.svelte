<script>
	export let options = ['Option 1', 'Option 2', 'Option 3'];
</script>

<select class="select select-bordered bg-slate-800 w-[30%] p-3">
	{#each options as option}
		<option class="bg-slate-900 py-2 px-4">{option}</option>
	{/each}
</select>
