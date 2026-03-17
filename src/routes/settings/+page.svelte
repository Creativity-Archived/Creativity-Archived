<script lang="ts">
    import Topbar from "@src/webpack/components/topBar.svelte";
    import { showNsfw, compactMode } from "$lib/stores/settings";
</script>

<main>
    <Topbar current="Settings" />

    <div class="mainContainer">
        <div class="mainItem">
            <span class="bigText">Show NSFW</span>
            <p>Enable NSFW content in the main page.</p>
            <select bind:value={$showNsfw}>
                <option value="off">Off</option>
                <option value="on">On</option>
            </select>
        </div>

        <div class="mainItem">
            <span class="bigText">Compact Mode</span>
            <p>Hides the tags unless you hover over the project.</p>
            <select bind:value={$compactMode}>
                <option value="off">Off</option>
                <option value="on">On</option>
            </select>
        </div>
    </div>
</main>

<style>
    .mainContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        padding: 20px;
    }

    .mainItem {
        background-color: rgba(40, 40, 40, 1);
        padding: 20px;
    }

    .bigText {
        font-size: 30px;
        font-weight: bold;
    }

    select {
        background-color: rgba(60, 60, 60, 1);
        color: white;
        padding: 5px;
        border: none;
        width: 100%;
    }
</style>
