<script>
	import { goto } from '$app/navigation';
	import Button from './Common/Button.svelte';
	import { localStore, profileUser } from '../stores/stores';
	import { logout } from '../utils/helpers/loginHelper';

	let showProfileMenu = false;

	function toggleDropdown() {
		showProfileMenu = !showProfileMenu;
	}

	function handleLogout() {
		logout();
	}
</script>

<div class="w-full bg-[#36393F] text-white p-3 flex justify-end">
	{#if $localStore.lastUserLogged}
		<div class="cursor-pointer">
			<div class="flex gap-2 items-center" on:click={toggleDropdown}>
				<img src={$profileUser?.image} alt="Profile Image" class="size-8 rounded-full" />
				<span>{$profileUser.name}</span>
			</div>

			{#if showProfileMenu}
				<div class="absolute z-50 translate-y-2 right-0 bg-[#2F3136] w-52 p-2 rounded">
					<button class="p-2 hover:bg-[#292B2F] w-full text-left rounded" on:click={handleLogout}
						>Logout</button
					>
				</div>
			{/if}
		</div>
	{:else}
		<Button label="Login" variant="" onClick={() => goto('/auth/login')} />
	{/if}
</div>
