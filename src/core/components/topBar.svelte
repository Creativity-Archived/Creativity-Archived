<script lang="ts">
    import Redirect from '@src/webpack/buttons/redirect.svelte';
    export let current: string;
</script>

<main>
    <div class="left">
        <a href="/" class="logo"> Creativity Archived - {current}</a>
    </div>

    <div class="right">
        <Redirect name="Home" goto="/" />
        <Redirect name="Submit Mod" goto="https://github.com/Creativity-Archived/Creativity-Archived/issues" />
        <Redirect name="Information" goto="/info" />
    </div>
</main>

<style>
    main {
        display: flex;
        background-color: rgba(40, 40, 40, 1);
        padding: 10px;
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
    }
    
    @media screen and (max-width: 768px) {
        main {
            display: block;
        }
        
        .left {
            text-align: center;
        } .right {
            margin-top: 10px;
            
            display: flex;
            justify-content: center;
            gap: 10px;
        }
    }
</style>
