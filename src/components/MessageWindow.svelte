<script>
    let messages = [
        { author: 'Alice', message: 'Hi Bob!' },
        { author: 'Bob', message: 'Hi Alice!' }
    ];
    let message = '';

    function sendMessage() {
        if (message) {
            messages = [{ author: 'You', message }, ...messages];
            message = '';
        }
    }
</script>

<div class="bg-slate-600 w-[65%] overflow-scroll no-scrollbar">
    <h2 class="text-5xl text-center mt-5">Message Window</h2>
    <div class="mt-10 ">
        <ul class="my-5 mx-5">
            {#each messages as { author, message }}
                <li class="text-white mb-2">
                    <span class="font-bold">{author}:</span> {message}
                </li>
            {/each}
        </ul>
        <form on:submit|preventDefault={sendMessage} class="w-full  max-w-[65%] fixed bottom-0">
            <input type="text" bind:value={message} class="w-full bg-gray-400 p-2 placeholder:text-gray-800" placeholder="Type a message..." />
        </form>
    </div>
</div>
