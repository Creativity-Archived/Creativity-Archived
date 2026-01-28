<script lang="ts">
    import { Route } from "tinro";
    
    import Home from "@src/core/state/home.svelte";
    import SendMod from "@src/core/state/sendMod.svelte";
    import Info from "@src/core/state/info.svelte";
</script>

<Route path="/"><Home /></Route>
<Route path="/submit"><SendMod /></Route>
<Route path="/info"><Info /></Route>