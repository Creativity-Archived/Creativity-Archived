<script lang="ts">
    import TopBar from "@src/core/components/topBar.svelte";
    import {
        isValidGithubUrl,
        submitModToDiscord,
    } from "@src/core/api/webhook";

    let modLink = "";
    let submitStatus = "";
    let isSubmitting = false;

    const submitMod = async () => {
        submitStatus = "";
        if (!isValidGithubUrl(modLink)) {
            submitStatus = "Please enter a valid GitHub repository URL.";
            return;
        }

        isSubmitting = true;
        try {
            await submitModToDiscord(modLink);
            submitStatus = "Submitted successfully!";
            modLink = "";
        } catch (error) {
            submitStatus =
                error instanceof Error ? error.message : "Failed to submit.";
        } finally {
            isSubmitting = false;
        }
    };
</script>

<main>
    <TopBar current="Submit Mod" />

    <div class="mainContainer">
        <div class="mainItem">
            <h1>Want to submit a mod?</h1>
            <p>
                Paste in the link <b>(GITHUB ONLY)</b> down below and press on submit!
                But remember, you must have permission from the mod author to submit
                it. If you're the mod author, you can submit it yourself.
            </p>

            <input type="text" placeholder="Mod Link" bind:value={modLink} /><br
            />
            <button on:click={submitMod} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            {#if submitStatus}
                <div class="status">{submitStatus}</div>
            {/if}
        </div>
    </div>
</main>

<style>
    .mainContainer {
        margin-top: 10px;

        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
    }

    .mainItem {
        width: 650px;
        background-color: rgba(40, 40, 40, 1);
        padding: 20px;
        box-sizing: border-box;
    }

    input,
    button {
        border: 0;
        background-color: rgba(60, 60, 60, 1);
    }

    button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .status {
        margin-top: 10px;
        font-size: 12px;
        color: rgba(200, 200, 200, 1);
    }
</style>
