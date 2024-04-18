<script lang="ts">
	import { NIP07LoginService } from '../services/login/nip07LoginService';
	async function nip07Login() {
		const value = await new NIP07LoginService().login();
		console.log(value);
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button on:click|preventDefault={nip07Login}>Login with NIP07</button>
