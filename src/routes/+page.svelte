<script lang="ts">
	import { NIP07LoginService } from '../services/login/nip07LoginService';
	import { NIP49PrivateKeyLoginService } from '../services/login/nip49PrivateKeyLoginService';
	import { BunkerLoginService } from '../services/login/nip46BunkerLoginService';
	async function nip07Login() {
		const value = await new NIP07LoginService().login();
		console.log(value);
	}
	let nip49Input: HTMLInputElement;
	async function nip49Login() {
		const value = await new NIP49PrivateKeyLoginService().login(nip49Input.value.trim());
		console.log(value);
	}
	let nip46Input: HTMLInputElement;
	async function nip46Login() {
		const value = await new BunkerLoginService().login(nip46Input.value.trim());
		console.log(value);
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button on:click|preventDefault={nip07Login}>Login with NIP07</button>
<br />
<br />
<input type="text" bind:this={nip49Input} />
<button on:click|preventDefault={nip49Login}>Login with NIP49</button>
<br>
<br>
<input type="text" bind:this={nip46Input} />
<button on:click|preventDefault={nip46Login}>Login with NIP46 (nsec bunker)</button>
