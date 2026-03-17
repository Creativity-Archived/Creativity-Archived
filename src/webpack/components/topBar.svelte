<script lang="ts">
    import Redirect from "@src/webpack/buttons/redirect.svelte";
    export let current: string;

    let showOverflow = false;
</script>

<svelte:window on:click={() => (showOverflow = false)} />

<main>
    <div class="left">
        <a href="/" class="logo"> Creativity Archived - {current}</a>
    </div>

    <div class="right">
        <Redirect name="Home" goto="/" />
        <Redirect name="Submit" goto="/submit" />
        <Redirect name="Information" goto="/info" />

        <div class="overflow" on:click|stopPropagation>
            <button
                class="overflowButton"
                on:click={() => (showOverflow = !showOverflow)}
                aria-haspopup="true"
                aria-expanded={showOverflow}
            >
                <img
                    src="/images/icons/menu/menu.svg"
                    alt="Overflow"
                    class="icon"
                    width="22"
                    height="21"
                />
            </button>

            {#if showOverflow}
                <div class="overflowMenu">
                    <a href="/settings" class="overflowItem">Settings</a>
                    <slot name="overflow" />
                </div>
            {/if}
        </div>
    </div>
</main>

<style>
    main {
        display: flex;
        background-color: rgba(40, 40, 40, 1);
        padding: 10px;
        align-items: center;
    }

    .logo {
        text-decoration: none;
        color: white;
    }

    .left {
        margin-right: auto;
    }
    .right {
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .overflow {
        position: relative;
    }

    .overflowButton {
        background-color: rgba(60, 60, 60, 1);
        color: white;
        border: 0;
        padding: 5px;
        cursor: pointer;
        font-size: inherit;
        line-height: normal;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    .overflowButton:hover {
        background-color: rgba(70, 70, 70, 1);
    }

    .icon {
        filter: invert(1);
    }

    .overflowMenu {
        position: absolute;
        right: 0;
        top: calc(100% + 8px);
        background-color: rgba(40, 40, 40, 1);
        min-width: 160px;
        z-index: 10;
        display: flex;
        flex-direction: column;
        padding: 6px;
        gap: 4px;
    }

    .overflowItem {
        color: white;
        text-decoration: none;
        padding: 6px 8px;
        background-color: rgba(60, 60, 60, 1);
    }
    .overflowItem:hover {
        background-color: rgba(70, 70, 70, 1);
    }

    @media screen and (max-width: 768px) {
        main {
            display: block;
        }

        .left {
            text-align: center;
        }
        .right {
            margin-top: 10px;

            display: flex;
            justify-content: center;
            gap: 10px;
        }
    }
</style>
