<script lang="ts">
	import Button from '../../../components/Common/Button.svelte';
	import InputField from '../../../components/Common/InputField.svelte';
	import Divider from '../../../components/Common/Divider.svelte';
	import { NIP07LoginService } from '../../../services/login/nip07LoginService';
	import { NIP49PrivateKeyLoginService } from '../../../services/login/nip49PrivateKeyLoginService';
	import { goto } from '$app/navigation';
	async function nip07Login() {
		const value = await new NIP07LoginService().login();
		console.log(value);
		goto('/');
	}
	let inputValue = '';
	async function nip49Login() {
		const value = await new NIP49PrivateKeyLoginService().login(inputValue.trim());
		console.log(value);
		inputValue = '';
		goto('/');
	}
</script>

<div
	class="bg-cover bg-center h-screen w-screen flex items-center p-5 justify-center"
	style="background-image: url('/src/assets/loginBG.webp');"
>
	<div class=" bg-[#303339] flex flex-col gap-4 p-10 w-[30rem] rounded-md">
		<div class="flex flex-col w-full gap-2">
			<span class="text-center text-white text-2xl">Welcome back!</span>
			<span class="text-center text-[#B9BBBE]">We're so excited to see you again!</span>
		</div>
		<InputField
			type="text"
			label="Private Key"
			placeholder="Enter your private key..."
			bind:value={inputValue}
		/>
		<Button label="Login with Private Key" onClick={nip49Login} />
		<Divider text="OR" />
		<Button label="Login with Nostr Extension" variant="gray" onClick={nip07Login} />
	</div>
</div>
