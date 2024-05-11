<script lang="ts">
	import { onMount } from 'svelte';
	export let type = 'text';
	export let placeholder = '';
	export let disabled = false;
	export let required = false;
	export let label = '';
	export let inputClass = '';
	export let value = '';

	let inputElement: HTMLInputElement;

	onMount(() => {
		inputElement.type = type;
	});
</script>

<div class="flex flex-col gap-2">
	<div class="flex gap-1 text-[#B9BBBE]">
		<span>{label}</span>
		{#if required}
			<span class="text-[#ED4245]">*</span>
		{/if}
	</div>
	<input
		bind:this={inputElement}
		class={`h-10 border border-[#202225] outline-none p-2 bg-[#202225] focus:border-[#00AFF4] text-[#DCDDDE] rounded-sm ${inputClass}`}
		{placeholder}
		{disabled}
		bind:value
	/>
</div>
