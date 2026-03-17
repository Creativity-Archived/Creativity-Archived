<script lang="ts">
    import { marked } from "marked";
    import Tag from "@src/webpack/misc/tags.svelte";

    export let open = false;
    export let title = "Repository Check";
    export let repoUrl = "";
    export let required: string[] = [];
    export let missing: string[] = [];
    export let error: string | null = null;

    export let bannerUrl = "";
    export let iconUrl = "";
    export let readmeText = "";
    export let openSource = "";
    export let canMessWithSystem = "";
    export let licenseUsed = "";
    export let downloadUrl = "";
    export let infoUrl = "";
    export let discordUrl = "";
    export let githubUrl = "";

    $: present = required.filter((item) => !missing.includes(item));
    $: readmeHtml = readmeText ? marked.parse(readmeText) : "";
</script>

{#if open}
    <div class="overlay" on:click={() => (open = false)}>
        <div class="popup" on:click|stopPropagation>
            {#if bannerUrl}
                <img src={bannerUrl} alt="" class="banner" />
            {/if}

            <div class="body">
                <div class="header">
                    <span class="title">{title}</span>
                    <button class="actionButton" on:click={() => (open = false)}>
                        Close
                    </button>
                </div>

                {#if repoUrl}
                    <div class="repo">
                        <a href={repoUrl} target="_blank" rel="noreferrer"
                            >{repoUrl}</a
                        >
                    </div>
                {/if}

                {#if error}
                    <div class="error">{error}</div>
                {/if}

                {#if readmeHtml}
                    <div class="content">
                        {#if iconUrl}
                            <img src={iconUrl} alt="" class="icon" />
                        {/if}
                        <div class="readme markdown">
                            {@html readmeHtml}
                        </div>
                    </div>
                {/if}

                <div class="tags">
                    {#if openSource}
                        <Tag {openSource} />
                    {/if}
                    {#if canMessWithSystem}
                        <Tag messWithSystem={canMessWithSystem} />
                    {/if}
                    {#if licenseUsed}
                        <Tag license={licenseUsed} />
                    {/if}
                </div>

                <div class="actions">
                    <div class="left">
                        {#if downloadUrl}
                            <a class="actionButton" href={downloadUrl} target="_blank">
                                Download
                            </a>
                        {/if}
                        {#if infoUrl}
                            <a class="actionButton" href={infoUrl} target="_blank">Info</a>
                        {/if}
                    </div>
                    <div class="right">
                        {#if githubUrl}
                            <a href={githubUrl} target="_blank">
                                <img
                                    src="/images/icons/social/github.svg"
                                    class="social"
                                    alt="GitHub"
                                    width="22"
                                />
                            </a>
                        {/if}
                        {#if discordUrl}
                            <a href={discordUrl} target="_blank">
                                <img
                                    src="/images/icons/social/discord.svg"
                                    class="social"
                                    alt="Discord"
                                    width="22"
                                />
                            </a>
                        {/if}
                    </div>
                </div>

                {#if required.length || missing.length}
                    <div class="section">
                        <span class="sectionTitle">Present</span>
                        {#if present.length === 0}
                            <div class="empty">None</div>
                        {:else}
                            <ul>
                                {#each present as item}
                                    <li class="ok">{item}</li>
                                {/each}
                            </ul>
                        {/if}
                    </div>

                    <div class="section">
                        <span class="sectionTitle">Missing</span>
                        {#if missing.length === 0}
                            <div class="empty">None</div>
                        {:else}
                            <ul>
                                {#each missing as item}
                                    <li class="bad">{item}</li>
                                {/each}
                            </ul>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .popup {
        background: rgba(35, 35, 35, 1);
        padding: 0;
        width: min(700px, 92vw);
        /*border: 1px solid rgba(80, 80, 80, 1);*/
    }

    .banner {
        width: 100%;
        height: 140px;
        object-fit: cover;
        display: block;
        
        -webkit-user-drag: none;
        user-select: none;
    }

    .body {
        padding: 20px;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .title {
        font-weight: bold;
        font-size: 18px;
    }

    .repo {
        margin-bottom: 10px;
        word-break: break-all;
    }

    .error {
        color: rgba(255, 120, 120, 1);
        margin-bottom: 10px;
        font-size: 13px;
    }

    .section {
        margin-top: 10px;
    }

    .sectionTitle {
        font-size: 12px;
        color: rgba(160, 160, 160, 1);
    }

    .empty {
        font-size: 12px;
        color: rgba(120, 120, 120, 1);
        margin-top: 5px;
    }

    ul {
        margin: 5px 0 0 15px;
    }

    .ok {
        color: rgba(120, 220, 120, 1);
    }

    .bad {
        color: rgba(255, 120, 120, 1);
    }

    .content {
        display: flex;
        gap: 12px;
        margin-top: 10px;
    }

    .icon {
        width: 64px;
        height: 64px;
        object-fit: contain;
        
        -webkit-user-drag: none;
        user-select: none;
    }

    .readme {
        margin: 0;
        font-size: 12px;
        line-height: 1.4;
        background: rgba(30, 30, 30, 1);
        padding: 10px;
        max-height: 260px;
        overflow: auto;
        flex: 1;
    }

    .markdown :global(p) {
        margin: 0 0 8px 0;
    }

    .markdown :global(h1),
    .markdown :global(h2),
    .markdown :global(h3) {
        margin: 8px 0;
        font-size: 14px;
    }

    .markdown :global(ul),
    .markdown :global(ol) {
        margin: 6px 0 6px 18px;
    }

    .markdown :global(code) {
        background: rgba(50, 50, 50, 1);
        padding: 0 4px;
    }

    .tags {
        display: flex;
        gap: 6px;
        margin-top: 10px;
        flex-wrap: wrap;
    }

    .actions {
        display: flex;
        align-items: center;
        margin-top: 12px;
    }

    .left {
        display: flex;
        gap: 8px;
        margin-right: auto;
    }

    .right {
        display: flex;
        gap: 6px;
        margin-left: auto;
    }

    .actionButton {
        background: rgba(60, 60, 60, 1);
        color: white;
        text-decoration: none;
        padding: 4px 8px;
        font-size: 12px;
        
        -webkit-user-drag: none;
        user-select: none;
    } .actionButton:hover {
        background-color: rgba(70, 70, 70, 1);
    }

    .social {
        filter: invert(1);
        -webkit-user-drag: none;
        user-select: none;
    }
</style>
