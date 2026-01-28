export interface ProjectItemProps {
  imageUrl: string;
  imageAlt: string;

  title: string;
  description: string;
  madeBy: string;
  
  madeByURL: string;
  infoUrl: string;
  downloadUrl: string;
  
  githubUrl: string;
  discordUrl: string;
  
  openSource: string;
  canMessWithSystem: string;
  licenseUsed: string;
}

interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: "file" | "dir";
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

const OWNER = "Creativity-Archived";
const REPO = "Creativity-Archived";
const BRANCH = "mods";
const PATH = "addedMods";

export async function fetchMods(): Promise<ProjectItemProps[]> {
  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}?ref=${BRANCH}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const files = (await response.json()) as GitHubFile[];
    const modFiles = files.filter(
      (file) => file.type === "file" && file.download_url,
    );

    const projectPromises = modFiles.map(async (file) => {
      const fileResponse = await fetch(file.download_url);
      if (!fileResponse.ok) {
        console.error(`Failed to fetch ${file.download_url}`);
        return null;
      }
      return (await fileResponse.json()) as ProjectItemProps;
    });

    const projects = await Promise.all(projectPromises);
    // Filter out any nulls from failed fetches
    return projects.filter((p): p is ProjectItemProps => p !== null);
  } catch (error) {
    console.error("Failed to fetch mods from GitHub:", error);
    return []; // Return an empty array on error
  }
}
