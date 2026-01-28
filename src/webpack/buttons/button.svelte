<script lang="ts">
    export let name: string;
    export let run: () => void;
</script>

<div onclick={run}>
    {name}
</div>

<style>
    div {
        text-align: center;
        color: white;
        
        padding: 5px;
        text-decoration: none;
        width: 100%;
        
        transition: background-color 0.1s ease-in;
        background-color: rgba(120, 120, 120, 1);
    }
    
    div:hover {
        background-color: rgba(120, 120, 120, 1);
        cursor: pointer;
    }
</style>