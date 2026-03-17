<script lang="ts">
    export let imageUrl = "";
    export let imageAlt = "";
    export let bannerUrl = "";
    export let readmeText = "";

    export let title = "";
    export let description = "";
    export let madeBy = "";

    export let type = "";
    export let whatType = "";
    
    export let madeByURL = "";
    export let infoUrl = "";
    export let downloadUrl = "";

    export let githubUrl = "";
    export let discordUrl = "";

    export let openSource = "";
    export let canMessWithSystem = "";
    export let licenseUsed = "";

    export let repoUrl = "";
    export let validationMissing: string[] = [];
    export let validationError: string | null = null;

    import Tag from "@src/webpack/misc/tags.svelte";
    import PopupModule from "@src/webpack/frame/popupModule.svelte";

    const requiredFiles = [
        ".creativity-archived",
        "banner.png",
        "config.json",
        "logo.png",
        "readme.md",
    ];

    let showValidation = false;
    let showInfo = false;
</script>

<div
    class="mainItem"
    on:click={() => (showInfo = true)}
    style="cursor: pointer;"
>
    <div class="top">
        {#if imageUrl}
            <img
                src={imageUrl}
                width="100"
                height="100"
                alt={imageAlt}
                class="gameIcon"
            />
        {:else}
            <div class="gameIcon placeholder" aria-hidden="true"></div>
        {/if}

        <div class="extraInfo">
            <span style="font-weight: bold; font-size: 30px;">{title}</span>
            <br />
            {#if madeBy || madeByURL}
                <span style="color: gray; font-size: 13px;"
                    >Made By <a href={madeByURL}>{madeBy}</a></span
                > <br />
            {/if}
            {#if description}
                <span>{description}</span> <br />
            {/if}
        </div>
    </div>

    <div class="tags flexInline">
        <section>
            {#if openSource}
                <Tag {openSource} />
            {/if}
            {#if canMessWithSystem}
                <Tag messWithSystem={canMessWithSystem} />
            {/if}
            {#if licenseUsed}
                <Tag license={licenseUsed} />
            {/if}
        </section>
        <section>
            {#if type}
                <Tag {type} />
            {/if}
            {#if whatType}
                <Tag {whatType} />
            {/if}
        </section>
    </div>

    <!-- <div class="bottom">
        <div class="left">
            <div class="button" on:click={() => (showInfo = true)}>
                <span>More Info</span>
            </div>

            <div class="button">
                <a href={downloadUrl}>Download</a>
            </div>

            {#if repoUrl && developerMode}
                <div class="button" on:click={() => (showValidation = true)}>
                    <span>Check Files</span>
                </div>
            {/if}
        </div>

        <div class="right">
            {#if githubUrl}
                <a href={githubUrl}>
                    <img
                        src="/images/icons/social/github.svg"
                        class="icon"
                        alt="GitHub"
                        width="25"
                    />
                </a>
            {/if}

            {#if discordUrl}
                <a href={discordUrl}>
                    <img
                        src="/images/icons/social/discord.svg"
                        class="icon"
                        alt="Discord"
                        width="25"
                    />
                </a>
            {/if}
        </div>
    </div> -->
</div>

<PopupModule
    bind:open={showValidation}
    title="Repository Requirements"
    {repoUrl}
    required={requiredFiles}
    missing={validationMissing}
    error={validationError}
/>

<PopupModule
    bind:open={showInfo}
    {title}
    {repoUrl}
    {bannerUrl}
    iconUrl={imageUrl}
    {readmeText}
    {openSource}
    {canMessWithSystem}
    {licenseUsed}
    {type}
    {whatType}
    {downloadUrl}
    {infoUrl}
    {discordUrl}
    {githubUrl}
/>

<style>
    .mainItem {
        flex: 0 1 calc(33.333% - 40px);
        padding: 10px;
        background-color: rgba(40, 40, 40, 1);
    }
    .mainItem:hover {
        background-color: rgba(50, 50, 50, 1);
    }

    /* MAIN ITEM TOP */
    .top {
        display: flex;
    }
    .extraInfo {
        margin-left: 10px;
    }

    .gameIcon {
        -webkit-user-drag: none;
        user-select: none;
    }

    .placeholder {
        width: 100px;
        height: 100px;
        background: rgba(60, 60, 60, 1);
    }

    .tags {
        display: flex;
        gap: 6px;
        margin-top: 6px;
    }

    /* MAIN ITEM BOTTOM */
    .bottom {
        display: flex;
        margin-top: 10px;
    }

    .left {
        display: flex;
        margin-right: auto;
    }

    .button {
        margin-right: 10px;
    }
    .button:hover {
        cursor: pointer;
    }

    .right {
        display: flex;
        margin-left: auto;
    }

    .flexInline {
        display: flex;
        gap: 0;
        flex-direction: column;
        
        -webkit-user-drag: none;
        user-select: none;
    }
    
    /* OTHER THINGS */
    .icon {
        filter: invert(1);
        margin-right: 5px;

        -webkit-user-drag: none;
        user-select: none;
    }
</style>
