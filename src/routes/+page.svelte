<script>
	import Details from '../components/Details.svelte';
import MessageWindow from '../components/MessageWindow.svelte';
	import ServerList from '../components/ServerList.svelte';
	import Sidebar from '../components/Sidebar.svelte';
</script>

<div class="flex h-full text-white">
	<ServerList />
	<Sidebar />
	<MessageWindow />
    <Details />
</div>
