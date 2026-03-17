<script lang="ts">
    import TopBar from "@src/webpack/components/topBar.svelte";
</script>

<main>
    <TopBar current="Information" />
    
    <div class="mainContainer" style="max-width: 600px;">
        <div class="mainItem">
            <div class="flex">
                <section>
                    <img src="images/icons/website/Creativity Archived - white.png" alt="Creativity Archived" width="100" height="100"/>
                </section>

                <section>
                    <p>
                        <b>Creativity Archived</b> is a game and mod sharing platform with barely any restriction. Built to make developers to share their games or mods easily without restriction and to make users discover new cool stuff being added.
                    </p>
                </section>
            </div>

            <section>
                <p>
                    While yes, Gamebanana and Gamejolt exists and they are pretty cool. But we wanted to make one that has less restriction, and let the developer have more control over uploading their games.
                </p>
                
                <p>
                    <b>Creativity Archived</b> is a community-driven project by open source developers trying to make the software world a better place. Using Svelte with Vite, and licensed under the MIT license.
                </p>
                
                <p>
                    If you wish to check out the project and the code, <a href="https://github.com/Creativity-Archived/Creativity-Archived">click here for the GitHub repository.</a>
                </p>
                
                <div class="license">
                    <p>
                        MIT License <br/> <br/>
                        
                        Copyright (c) 2025 Creativity Archived Team <br/> <br/>
                        
                        Permission is hereby granted, free of charge, to any person obtaining a copy <br/>
                        of this software and associated documentation files (the "Software"), to deal <br/>
                        in the Software without restriction, including without limitation the rights <br/>
                        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                        copies of the Software, and to permit persons to whom the Software is
                        furnished to do so, subject to the following conditions: <br/> <br/>
                        
                        The above copyright notice and this permission notice shall be included in all <br/>
                        copies or substantial portions of the Software. <br/> <br/>
                        
                        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE <br/>
                        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, <br/>
                        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE <br/>
                        SOFTWARE.
                    </p>
                </div>
            </section>
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

    .flex {
        display: flex;
    }
    
    .license {
        background-color: rgba(20, 20, 20, 1);
        padding: 10px;
        max-height: 250px;
        overflow-y: auto;
    }
    
    @media screen and (max-width: 768px) {
        .mainContainer {
            width: auto;
        }
    }
</style>