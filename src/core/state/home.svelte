<script lang="ts">
    import { onMount } from 'svelte';
    import TopBar from '@src/core/components/topBar.svelte';
    import ProjectItem from '@src/webpack/frame/items/projectItem.svelte';
    import { fetchMods, type ProjectItemProps } from '@src/core/api/github';

    let projects: ProjectItemProps[] = [];

    onMount(async () => {
        projects = await fetchMods();
    });
</script>

<main>
    <TopBar current="Home" />
    
    <div class="mainContainer">
        {#each projects as project}
            <ProjectItem {...project} />
        {/each}
    </div>
</main>

<style>
    .mainContainer {
        margin-top: 10px;
        
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
    }
</style>