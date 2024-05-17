<script>

	import ChannelComponent from "./channelComponent/ChannelComponent.svelte";
	import FriendListComponent from "./friendsListComponent/FriendListComponent.svelte";
	import ContentAreaFooter from "./contentAreaFooter/ContentAreaFooter.svelte";

</script>


<div class="w-[16%] h-screen  bg-[#2B2D31] flex flex-col">
	<div class="flex-grow overflow-scroll flex flex-col">
		<!-- Conditionally render FriendsListComponent | ChannelComponent -->

		<!-- <ChannelComponent /> -->
		<FriendListComponent />
	</div>

	<ContentAreaFooter />
</div>
