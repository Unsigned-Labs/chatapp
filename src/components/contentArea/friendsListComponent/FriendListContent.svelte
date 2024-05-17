<script>
	import FriendBadge from "./FriendBadge.svelte";

    const testUser = {
        name: "Tony Stark",
        imgSrc: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    };

</script>

<div class="flex flex-col text-[#80848E]">
    <button 
        class="m-2 px-3 py-2 flex gap-4 items-center hover:bg-[#404249] hover:text-[#F2F3F5] rounded-sm"

    >
        <svg 
            width={25}
            height={25}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="rgba(128,132,142,1)"
        >
            <path d="M12 10C14.2091 10 16 8.20914 16 6 16 3.79086 14.2091 2 12 2 9.79086 2 8 3.79086 8 6 8 8.20914 9.79086 10 12 10ZM5.5 13C6.88071 13 8 11.8807 8 10.5 8 9.11929 6.88071 8 5.5 8 4.11929 8 3 9.11929 3 10.5 3 11.8807 4.11929 13 5.5 13ZM21 10.5C21 11.8807 19.8807 13 18.5 13 17.1193 13 16 11.8807 16 10.5 16 9.11929 17.1193 8 18.5 8 19.8807 8 21 9.11929 21 10.5ZM12 11C14.7614 11 17 13.2386 17 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5 15.9999C5 15.307 5.10067 14.6376 5.28818 14.0056L5.11864 14.0204C3.36503 14.2104 2 15.6958 2 17.4999V21.9999H5V15.9999ZM22 21.9999V17.4999C22 15.6378 20.5459 14.1153 18.7118 14.0056 18.8993 14.6376 19 15.307 19 15.9999V21.9999H22Z"></path>
        </svg>

        Friends        
    </button>

    <div class="flex justify-between items-center mt-4 ml-4 mb-1">
        <h1 class="text-sm hover:text-[#F2F3F5] flex-grow">
            DIRECT MESSAGES
        </h1>

        <svg
            class="mr-4 cursor-pointer" 
            width={20}
            height={20}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="rgba(128,132,142,1)"
        >
            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
        </svg>

    </div>

    <div class="flex flex-col mx-2 mt-1">
        <!-- loop friendBadge -->
        <FriendBadge user={testUser} />
      
    </div>
</div>