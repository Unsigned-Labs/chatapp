<script>
    let admins = [
        { name: 'Aaron', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
    ];
    let online = [
        { name: 'Benoît', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
        { name: 'Christopher', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
    ];
    let offline = [
        { name: 'Damian', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
        { name: 'Fabio', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
        { name: 'Hugo', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
    ];

</script>
<div class="w-[15%] overflow-scroll no-scrollbar bg-slate-700">
    <ul >
        <li class="text-gray-400 px-5 py-2 font-bold">Admins</li>
        {#each admins as { name, image }}
            <li class="text-white px-5 py-2 cursor-pointer">
                <img class="w-6 h-6 rounded-full inline mr-2" src={image} alt={name} title={name} />
                {name}
            </li>
        {/each}

        <li class="text-gray-400 px-5 py-2 font-bold ">Online</li>
        {#each online as { name, image }}
            <li class="text-white px-5 py-2 cursor-pointer">
                <img class="w-6 h-6 rounded-full inline mr-2" src={image} alt={name} title={name} />
                {name}
            </li>
        {/each}

        <li class="text-gray-400 px-5 py-2 font-bold">Offline</li>
        {#each offline as { name, image }}
            <li class="text-white px-5 py-2 cursor-pointer">
                <img class="w-6 h-6 rounded-full inline mr-2" src={image} alt={name} title={name} />
                {name}
            </li>
        {/each}
    </ul>
</div>