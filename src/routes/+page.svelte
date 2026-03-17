<script lang="ts">
    import { onMount } from "svelte";
    import TopBar from "@src/webpack/components/topBar.svelte";
    import ProjectItem from "@src/webpack/frame/items/projectItem.svelte";
    import type {
        RepoProjectResult,
        ProjectItemProps,
    } from "@src/lib/types/github";

    let projects: RepoProjectResult[] = [];
    let loading = true;
    let loadError = "";

    const fallbackProject = (project: RepoProjectResult): ProjectItemProps => ({
        imageUrl: "",
        imageAlt: project.repoName,
        bannerUrl: "",
        readmeText: "",
        title: project.repoName,
        description: project.error
            ? `Failed to check repository: ${project.error}`
            : "Missing config.json or incomplete metadata.",
        madeBy: "Unknown",
        madeByURL: project.repoUrl,
        infoUrl: project.repoUrl,
        downloadUrl: project.repoUrl,
        githubUrl: project.repoUrl,
        discordUrl: "",
        openSource: "",
        canMessWithSystem: "",
        licenseUsed: "",
        type: "",
        whatType: "",
        nsfw: "",
    });

    onMount(async () => {
        try {
            const response = await fetch("/api/github");
            if (!response.ok) {
                throw new Error(`Load failed (${response.status})`);
            }
            const data = (await response.json()) as RepoProjectResult[];
            projects = data;
        } catch (error) {
            loadError =
                error instanceof Error
                    ? error.message
                    : "Failed to load projects.";
        } finally {
            loading = false;
        }
    });
</script>

<main>
    <TopBar current="Home" />

    <div class="mainContainer">
        {#if loading}
            <span class="status">Loading projects...</span>
        {:else if loadError}
            <span class="status error">{loadError}</span>
        {:else if projects.length === 0}
            <span class="status">No projects found.</span>
        {:else}
            {#each projects as project}
                <ProjectItem
                    {...project.project ?? fallbackProject(project)}
                    repoUrl={project.repoUrl}
                    validationMissing={project.missing}
                    validationError={project.error ?? null}
                />
            {/each}
        {/if}
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

    .status {
        color: rgba(200, 200, 200, 1);
        font-size: 13px;
    }

    .error {
        color: rgba(255, 120, 120, 1);
    }
</style>
