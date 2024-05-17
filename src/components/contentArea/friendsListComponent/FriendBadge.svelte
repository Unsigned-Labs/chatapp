<script>

    export let user;

</script>

<div 
    class="flex justify-between items-center pl-2 pr-1.5 py-1.5 hover:bg-[#404249] hover:text-[#F2F3F5] rounded-sm cursor-pointer"
>
    <div class="flex gap-2 items-center">
        <img
            src={user.imgSrc}
            alt="Friend Profile"
            class="w-8 h-8 rounded-full"
        />

        <h1 class="">
            {user.name}
        </h1>
    </div>

    <svg
        class="rotate-45 " 
        width={25}
        height={25}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="rgba(128,132,142,1)"
    >
        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
    </svg>
</div>