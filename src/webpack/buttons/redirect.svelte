<script lang="ts">
    export let name: string;
    export let goto: string;
</script>

<a href={goto}>
    {name}
</a>

<style>
    a {
        text-align: center;
        color: white;
        text-decoration: none;
        
        padding: 5px;

        transition: background-color 0.1s ease-in;
        background-color: rgba(60, 60, 60, 1);
    }

    a:hover {
        background-color: rgba(70, 70, 70, 1);
    }
</style>
