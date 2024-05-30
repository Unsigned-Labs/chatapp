<script lang="ts">
	import Details from '../components/Details.svelte';
	import MessageWindow from '../components/MessageWindow.svelte';
	import ServerList from '../components/ServerList.svelte';
	import Sidebar from '../components/contentArea/Sidebar.svelte';
	import Header from '../components/Header.svelte';
	import ndk from '../stores/provider';
	import { localStore, ndkUser, profileUser } from '../stores/stores';
	import { fetchUserProfile } from '../utils/helpers/helper';
	import { profileImageUrl } from '../utils/constant';
	import { onMount } from 'svelte';

	async function findUserProfileData(npub: string) {
		if (!$ndkUser) {
			console.info("Can't find user profile. $ndkUser is undefined");
			return;
		}
		let content = await fetchUserProfile(npub);
		if (!content) {
			content = { image: profileImageUrl + $ndkUser.npub, npub: $ndkUser.npub };
		}
		if (!content.image) content.image = profileImageUrl + npub;
		if (!content.npub) {
			content.npub = npub;
		}
		return content;
	}

	const initialization = async () => {
		await $ndk.connect();
		try {
			const isloggedIn = $localStore.lastUserLogged;
			if (isloggedIn && window) {
				let user = $ndk.getUser({
					npub: isloggedIn
				});
				ndkUser.set(user);
				if ($ndkUser) {
					let userProfileValue = await findUserProfileData($ndkUser.npub);
					$profileUser = userProfileValue as {};
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	onMount(initialization);
</script>

<Header/>
<div class="flex h-full text-white">
	<ServerList />
	<Sidebar />
	<MessageWindow />
	<Details />
</div>
