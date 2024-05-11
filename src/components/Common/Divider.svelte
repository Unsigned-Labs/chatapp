<script lang="ts">
	export let text = '';
</script>

<div class="relative flex items-center">
	<div class="flex-grow border-t border-[#B9BBBE]"></div>
	{#if text}
		<span class="flex-shrink mx-2.5 prose-b2-semibold text-[#B9BBBE]">
			{text}
		</span>
	{/if}
	<div class="flex-grow border-t border-[#B9BBBE]"></div>
</div>
