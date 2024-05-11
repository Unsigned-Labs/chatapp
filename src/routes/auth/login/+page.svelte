<script lang="ts">
	import Button from '../../../components/Common/Button.svelte';
	import InputField from '../../../components/Common/InputField.svelte';
	import Divider from '../../../components/Common/Divider.svelte';
	import { NIP07LoginService } from '../../../services/login/nip07LoginService';
	import { NIP49PrivateKeyLoginService } from '../../../services/login/nip49PrivateKeyLoginService';
	import { BunkerLoginService } from '../../../services/login/nip46BunkerLoginService';
	import { goto } from '$app/navigation';

	let showBunkerModal = false;
	let privateKey = '';
	let bunkerToken = '';

	async function nip07ExtensionLogin() {
		const value = await new NIP07LoginService().login();
		console.log(value);
		if (value === 'success') {
			goto('/');
		}
	}
	async function nip49PrivateKeyLogin() {
		const value = await new NIP49PrivateKeyLoginService().login(privateKey.trim());
		console.log(value);
		privateKey = '';
		if (value === 'success') {
			goto('/');
		}
	}
	async function nip46BunkerLogin() {
		const value = await new BunkerLoginService().login(bunkerToken.trim());
		console.log(value);
		bunkerToken = '';
		if (value === 'success') {
			goto('/');
		}
	}
</script>

<div
	class="bg-cover bg-center h-screen w-screen flex items-center p-5 justify-center"
	style="background-image: url('/src/assets/loginBG.webp');"
>
	<div class=" bg-[#303339] flex flex-col gap-4 p-10 w-[30rem] rounded-md">
		{#if !showBunkerModal}
			<div class="flex flex-col w-full gap-2">
				<span class="text-center text-white text-2xl">Welcome back!</span>
				<span class="text-center text-[#B9BBBE]">We're so excited to see you again!</span>
			</div>
			<InputField
				type="text"
				label="Private Key"
				placeholder="Enter your private key..."
				bind:value={privateKey}
			/>
			<Button label="Login with Private Key (nsec)" onClick={nip49PrivateKeyLogin} />
			<Divider text="OR" />
			{#if !('__TAURI__' in window)}
				<Button label="Login with Nostr Extension" variant="gray" onClick={nip07ExtensionLogin} />
			{/if}
			<Button
				label="Login with nsec bunker (Remote)"
				variant="gray"
				onClick={() => {
					showBunkerModal = !showBunkerModal;
				}}
			/>
		{:else}
			<button
				class="text-[#00AFF4] w-fit flex items-center gap-1"
				on:click={() => (showBunkerModal = false)}><i class="ri-arrow-left-fill" />Back</button
			>
			<InputField
				type="text"
				label="Bunker Token"
				placeholder="Enter nsec bunker token (bunker://)..."
			/>
			<Button label="Login with nsec bunker" onClick={nip46BunkerLogin} />
		{/if}
		<p class="text-[#B9BBBE]">
			Don't have an account? <a class="text-[#00AFF4] cursor-pointer" href="#">Register here</a>
		</p>
	</div>
</div>
