import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import type {
  ProjectItemProps,
  RepoProjectResult,
} from "@src/lib/types/github";

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

const REQUIRED_FILES = [
  "banner.png",
  "config.json",
  "logo.png",
  "readme.md",
] as const;
const MARKER_DIR = ".creativity-archived";
const DEFAULT_LIST_URL =
  "https://raw.githubusercontent.com/Creativity-Archived/.github/refs/heads/main/mods.txt";

type RepoParts = {
  owner: string;
  repo: string;
};

type RepoInfo = {
  default_branch: string;
};

type RawConfig = {
  isDownloadable?: string;
  isOpenSource?: string;
  canMessWithComputer?: string;
  license?: string;
  hasGithub?: string;
  hasWebsite?: string;
  hasDiscord?: string;
  title?: string;
  description?: string;
  madeBy?: string;
  githubURL?: string;
  discordURL?: string;
  websiteURL?: string;
  madeByURL?: string;
  type?: string;
  whatType?: string;
  nsfw?: string;
  NSFW?: string;
};

const extractRepoUrls = (text: string): string[] => {
  const urls = new Set<string>();
  const regex = /https?:\/\/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)/g;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const owner = match[1];
    const repo = match[2].replace(/\.git$/, "");
    urls.add(`https://github.com/${owner}/${repo}`);
  }

  return Array.from(urls);
};

const parseRepoUrl = (repoUrl: string): RepoParts | null => {
  try {
    const url = new URL(repoUrl);
    if (url.hostname !== "github.com") return null;
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    const owner = parts[0];
    const repo = parts[1].replace(/\.git$/, "");
    return { owner, repo };
  } catch {
    return null;
  }
};

const buildGithubHeaders = (token?: string): Record<string, string> => {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "Creativity-Archived",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const fetchRepoInfo = async (
  owner: string,
  repo: string,
  token?: string,
): Promise<RepoInfo> => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: buildGithubHeaders(token),
    },
  );
  if (!response.ok) {
    let details = "";
    try {
      const data = (await response.json()) as { message?: string };
      if (data?.message) details = `: ${data.message}`;
    } catch {
      // ignore body parse errors
    }
    throw new Error(`Failed to fetch repo info (${response.status})${details}`);
  }
  return (await response.json()) as RepoInfo;
};

const fetchContents = async (
  owner: string,
  repo: string,
  path: string,
  branch: string,
  token?: string,
): Promise<GitHubFile[]> => {
  const pathSegment = path ? `/${path}` : "";
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents${pathSegment}?ref=${branch}`,
    { headers: buildGithubHeaders(token) },
  );
  if (!response.ok) {
    throw new Error(`Missing ${path} (${response.status})`);
  }
  const data = (await response.json()) as GitHubFile[] | GitHubFile;
  if (Array.isArray(data)) {
    return data;
  }
  throw new Error(`${path || "root"} is not a directory`);
};

const buildProjectProps = (
  config: Partial<ProjectItemProps>,
  repoUrl: string,
  repoName: string,
  logoUrl?: string,
  bannerUrl?: string,
  readmeText?: string,
): ProjectItemProps => {
  return {
    imageUrl: config.imageUrl ?? logoUrl ?? "",
    imageAlt: config.imageAlt ?? config.title ?? repoName,
    bannerUrl: config.bannerUrl ?? bannerUrl ?? "",
    readmeText: readmeText ?? "",
    title: config.title ?? repoName,
    description: config.description ?? "",
    madeBy: config.madeBy ?? "Unknown",
    madeByURL: config.madeByURL ?? repoUrl,
    infoUrl: config.infoUrl ?? repoUrl,
    downloadUrl: config.downloadUrl ?? repoUrl,
    githubUrl: config.githubUrl ?? repoUrl,
    discordUrl: config.discordUrl ?? "",
    openSource: config.openSource ?? "",
    canMessWithSystem: config.canMessWithSystem ?? "",
    licenseUsed: config.licenseUsed ?? "",
    type: config.type ?? "",
    whatType: config.whatType ?? "",
    nsfw: config.nsfw ?? "",
  };
};

const normalizeYes = (value?: string): boolean => {
  if (!value) return false;
  return value.trim().toLowerCase() === "yes";
};

const normalizeNo = (value?: string): boolean => {
  if (!value) return false;
  return value.trim().toLowerCase() === "no";
};

const mapRawConfig = (raw: RawConfig): Partial<ProjectItemProps> => {
  const hasWebsite = normalizeYes(raw.hasWebsite);
  const hasGithub = normalizeYes(raw.hasGithub);
  const hasDiscord = normalizeYes(raw.hasDiscord);

  const websiteUrl = hasWebsite ? (raw.websiteURL ?? "") : "";
  const githubUrl = hasGithub ? (raw.githubURL ?? "") : "";
  const discordUrl = hasDiscord ? (raw.discordURL ?? "") : "";

  let openSource = "";
  if (normalizeYes(raw.isOpenSource)) openSource = "open";
  if (normalizeNo(raw.isOpenSource)) openSource = "closed";

  let canMessWithSystem = "";
  if (normalizeYes(raw.canMessWithComputer)) canMessWithSystem = "yes";
  if (normalizeNo(raw.canMessWithComputer)) canMessWithSystem = "no";

  return {
    title: raw.title ?? "",
    description: raw.description ?? "",
    madeBy: raw.madeBy ?? "",
    madeByURL: raw.madeByURL ?? "",
    infoUrl: websiteUrl,
    downloadUrl: normalizeYes(raw.isDownloadable) ? websiteUrl : "",
    githubUrl,
    discordUrl,
    openSource,
    canMessWithSystem,
    licenseUsed: raw.license ?? "",
    type: raw.type ?? "",
    whatType: raw.whatType ?? "",
    nsfw: raw.nsfw ?? raw.NSFW ?? "",
  };
};

const validateRepo = async (
  repoUrl: string,
  token?: string,
): Promise<RepoProjectResult> => {
  const parsed = parseRepoUrl(repoUrl);
  if (!parsed) {
    return {
      repoUrl,
      repoName: repoUrl,
      missing: [MARKER_DIR, ...REQUIRED_FILES],
      error: "Invalid GitHub repo URL",
    };
  }

  const { owner, repo } = parsed;
  const repoName = `${owner}/${repo}`;

  try {
    const repoInfo = await fetchRepoInfo(owner, repo, token);
    const branch = repoInfo.default_branch;
    const rootContents = await fetchContents(owner, repo, "", branch, token);
    const markerEntry = rootContents.find((file) => file.name === MARKER_DIR);

    let fileSource: GitHubFile[] = rootContents;
    let missing: string[] = [];

    if (!markerEntry) {
      missing.push(MARKER_DIR);
    } else if (markerEntry.type === "dir") {
      fileSource = await fetchContents(owner, repo, MARKER_DIR, branch, token);
    }

    const names = new Set(fileSource.map((file) => file.name));
    missing = missing.concat(REQUIRED_FILES.filter((file) => !names.has(file)));

    const configFile = fileSource.find(
      (file) => file.name === "config.json" && file.download_url,
    );
    const logoFile = fileSource.find(
      (file) => file.name === "logo.png" && file.download_url,
    );
    const bannerFile = fileSource.find(
      (file) => file.name === "banner.png" && file.download_url,
    );
    const readmeFile = fileSource.find(
      (file) => file.name.toLowerCase() === "readme.md" && file.download_url,
    );

    let readmeText = "";
    if (readmeFile?.download_url) {
      const readmeResponse = await fetch(readmeFile.download_url);
      if (readmeResponse.ok) {
        readmeText = await readmeResponse.text();
      }
    }

    let project: ProjectItemProps | undefined;
    if (configFile?.download_url) {
      const configResponse = await fetch(configFile.download_url);
      if (configResponse.ok) {
        const rawConfig = (await configResponse.json()) as RawConfig;
        const mappedConfig = mapRawConfig(rawConfig);
        project = buildProjectProps(
          mappedConfig,
          repoUrl,
          repoName,
          logoFile?.download_url ?? undefined,
          bannerFile?.download_url ?? undefined,
          readmeText,
        );
      }
    }

    return {
      repoUrl,
      repoName,
      missing,
      project,
    };
  } catch (error) {
    return {
      repoUrl,
      repoName,
      missing: [MARKER_DIR, ...REQUIRED_FILES],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const GET: RequestHandler = async ({ platform }) => {
  try {
    const token = platform?.env?.GITHUB_API as string | undefined;
    const response = await fetch(DEFAULT_LIST_URL);
    if (!response.ok) {
      throw new Error(`List fetch failed (${response.status})`);
    }

    const text = await response.text();
    const repoUrls = extractRepoUrls(text);
    const results = await Promise.all(
      repoUrls.map((repoUrl) => validateRepo(repoUrl, token)),
    );
    return json(results);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch repo list.";
    return json({ error: message }, { status: 500 });
  }
};
