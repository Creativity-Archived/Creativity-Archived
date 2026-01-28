<script lang="ts">
    import TopBar from '@src/core/components/topBar.svelte';
    import ProjectItem from '@src/webpack/frame/items/projectItem.svelte';
</script>

<main>
    <TopBar current="Home" />
    
    <div class="mainContainer">
        <ProjectItem
            imageUrl="https://avatars.githubusercontent.com/u/216927230?s=200&v=4"
            imageAlt="Universe Engine"
            
            title="Universe Engine"
            description="Psych engine if it were more customiazable and cleaner."
            madeBy="Universe Engine Team"
            
            madeByURL="https://github.com/Team-UniverseEngine/"
            infoUrl="https://github.com/Team-UniverseEngine/Universe-Engine"
            downloadUrl="https://github.com/Team-UniverseEngine/Universe-Engine/releases"
            
            githubUrl="https://github.com/Team-UniverseEngine/Universe-Engine"
            discordUrl="https://discord.gg/RaHmP5fgyA"
            
            openSource="yes"
            canMessWithSystem="yes"
        />
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