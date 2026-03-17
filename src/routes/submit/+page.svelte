<script lang="ts">
    import TopBar from "@src/webpack/components/topBar.svelte";

    let modLink = "";
    let submitStatus = "";
    let isSubmitting = false;

    const isValidGithubUrl = (url: string): boolean => {
        try {
            const parsed = new URL(url);
            return (
                parsed.hostname === "github.com" &&
                parsed.pathname.split("/").filter(Boolean).length >= 2
            );
        } catch {
            return false;
        }
    };

    const submitMod = async () => {
        submitStatus = "";
        if (!isValidGithubUrl(modLink)) {
            submitStatus = "Please enter a valid GitHub repository URL.";
            return;
        }

        isSubmitting = true;
        try {
            const response = await fetch("/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ modLink }),
            });

            if (!response.ok) {
                const data = (await response.json()) as { error?: string };
                throw new Error(data.error ?? "Failed to submit.");
            }
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
            
            <h1>Remember:</h1>
            <p>
                Make sure the repository has <code>.creativity-archived</code> and has the required files needed, such as <code>banner.png</code>, <code>logo.png</code>, <code>config.json</code>, and <code>readme.md</code>. If you're confused, <a href="https://github.com/Creativity-Archived/test-repo" target="_blank">check this repository</a>.
            </p>
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
    
    code {
        background-color: rgba(20, 20, 20, 1);
    }
</style>
