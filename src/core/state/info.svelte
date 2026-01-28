<script lang="ts">
    import TopBar from "@src/core/components/topBar.svelte";
</script>

<main>
    <TopBar current="Information" />
    
    <div class="mainContainer">
        <div class="mainItem">
            <p> Howdy! </p>
            
            <p> I made website specifically just to make my own version of sharing mods to other people. </p>
            
            <p>
                This is a project I actually like! If you wanted to donate, too bad. Can't! (for now) <br/>
                I'll eventually make a Kofi if I ever make one. Lol.
            </p>
            
            <p>
                This is a single-man operation. Everything here is made by one person and one LLM <br/>
                <span class="smallText">(that gives him quiz)</span>
            </p>    
            
            <details>
                <summary>Things you maybe need to know</summary>
                
                <p>
                    This website is made through
                    <a href="https://vite.dev">Vite</a>
                    and
                    <a href="https://svelte.dev">Svelte</a>.
                    
                    <br/>
                    
                    This website is made by
                    <a href="https://daveberry.netlify.app/">Daveberry</a>.
                </p>
                
                <p>
                    This website is
                    <a href="https://github.com/Creative-Archived/Creative-Archived">open source</a>
                    and licensed under
                    <a href="https://mit-license.org/">MIT</a>.
                </p>
            </details>
            
        </div>
    </div>
</main>

<style>
    .mainContainer {
        background-color: rgba(40, 40, 40, 1);
        
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: max-content;
        
        margin-left: auto;
        margin-right: auto;
    } .mainItem {
        padding-top: 5px; padding-bottom: 5px;
        padding-left: 10px; padding-right: 10px;
    }
    
    summary {
        font-weight: bold; font-size: 25px; cursor: pointer;
    }
    
    .smallText {
        color: gray;
        font-size: 10px;
    }
</style>