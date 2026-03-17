export interface ProjectItemProps {
  imageUrl: string;
  imageAlt: string;
  bannerUrl: string;
  readmeText: string;

  type: string;
  whatType: string;
  nsfw: string;

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

export interface RepoProjectResult {
  repoUrl: string;
  repoName: string;
  missing: string[];
  project?: ProjectItemProps;
  error?: string;
}
