<script lang="ts">
    import TopBar from '@src/core/components/topBar.svelte';
    import ProjectItem from '@src/webpack/frame/items/projectItem.svelte';
</script>

<main>
    <TopBar current="Home" />
    
    <div class="mainContainer">
        <ProjectItem
            imageUrl="/images/icons/website/Creativity Archived - white.png"
            imageAlt="Creativity Archived"
            
            title="Creativity Archived"
            description="Sharing your mods, your way."
            madeBy="Daveberry Cricket Blueson"
            
            madeByURL="https://daveberry.netlify.app/"
            infoUrl="https://github.com/Creativity-Archived/"
            downloadUrl="https://github.com/Creativity-Archived/Universe-Engine"
            
            githubUrl="https://github.com/Creativity-Archived/"
            discordUrl="https://discord.gg/?????"
            
            openSource="yes"
            canMessWithSystem="no"
            licenseUsed="MIT"
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