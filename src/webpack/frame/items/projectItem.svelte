<script lang="ts">
    export let imageUrl: string;
    export let imageAlt: string;
    
    export let title: string;
    export let description: string;
    export let madeBy: string;
    
    export let madeByURL: string;
    export let infoUrl: string;
    export let downloadUrl: string;
    
    export let githubUrl: string;
    export let discordUrl: string;
    
    export let openSource: string;
    export let canMessWithSystem: string;
    export let licenseUsed: string;

    import Tag from '@src/webpack/misc/tags.svelte';
</script>

<div class="mainItem">
    <div class="top">
        <img src={imageUrl} width="100" height="100" alt={imageAlt} />
        
        <div class="extraInfo">
            <span style="font-weight: bold; font-size: 30px;">{title}</span> <br/>
            <span style="color: gray; font-size: 13px;">Made By <a href={madeByURL}>{madeBy}</a></span> <br/>
            <span>{description}</span> <br/>
        </div>
    </div>
    
    <Tag openSource={openSource}/>
    <Tag messWithSystem={canMessWithSystem}/>
    <Tag license={licenseUsed}/>
    
    <div class="bottom">
        <div class="left">
            <div class="button">
                <a href={infoUrl}>More Info</a>
            </div>
            
            <div class="button">
                <a href={downloadUrl}>Download</a>
            </div>
        </div>
        
        <div class="right">
            <a href={githubUrl}>
                <img src="/images/icons/social/github.svg" class="icon" alt="GitHub" width="25" />
            </a>
            
            <a href={discordUrl}>
                <img src="/images/icons/social/discord.svg" class="icon" alt="Discord" width="25" />
            </a>
        </div>
    </div>
</div>

<style>
    .mainItem {
        flex: 0 1 calc(33.333% - 40px);
        padding: 10px;
        background-color: rgba(40, 40, 40, 1);
    } .mainItem:hover {
        background-color: rgba(50, 50, 50, 1);
    }
    
    /* MAIN ITEM TOP */
    .top {
        display: flex;
    } .extraInfo {
        margin-left: 10px;
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
    } .button:hover {
        cursor: pointer;
    }
    
    .right {
        display: flex;
        margin-left: auto;
    }
    
    /* OTHER THINGS */
    .icon {
        filter: invert(1);
        margin-right: 5px;
    }
</style>