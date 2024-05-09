<script>
    import Button from "./Button.svelte";
    export let title = 'Title';
    export let description = 'Description';
</script>

<div class="bg-slate-800 flex flex-col text-center m-3 rounded-lg my-20">
    <div class="bg-purple-400 w-[50%] h-24 rounded-lg mx-auto flex items-center justify-center relative -top-10">
        <img class="w-12 h-12 rounded-full center" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" title="GitHub" />
    </div>
    <h1 class="text-3xl font-bold">{title}</h1>
    <p class="text-xl pb-10">{description}</p>

    <!-- we can add other stuff here if needed -->
    <div class="mb-10 flex justify-evenly">
        <Button variant="gray" label="Follow" />
        <Button variant="gray" label="Message" />
    </div>
</div>