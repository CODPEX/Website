import { getRepoDocPath, gitConfig } from './shared';

type CommitEntry = {
  author?: { login?: string } | null;
  commit?: { author?: { name?: string; date?: string } };
};

type ContributorEntry = {
  login?: string;
};

export type GithubDocInfo = {
  names: string[];
  lastModified: string | null;
  createdAt: string | null;
};

export function normalizeNames(value: string | string[] | undefined): string[] {
  if (!value) return [];
  const list = Array.isArray(value) ? value : [value];
  return Array.from(new Set(list.map((name) => name.trim()).filter(Boolean)));
}

async function githubFetch(url: string, headers: HeadersInit) {
  const response = await fetch(url, {
    headers,
    next: { revalidate: 3600 },
  });
  if (!response.ok) return null;
  return response.json();
}

export async function getGithubDocInfo(docPath: string): Promise<GithubDocInfo> {
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const repoUrl = `https://api.github.com/repos/${gitConfig.user}/${gitConfig.repo}`;

  try {
    const commits = (await githubFetch(
      `${repoUrl}/commits?path=${encodeURIComponent(getRepoDocPath(docPath))}&per_page=100`,
      headers,
    )) as CommitEntry[] | null;

    if (commits?.length) {
      const commitAuthors = commits
        .map((commit) => commit.author?.login ?? commit.commit?.author?.name)
        .filter((name): name is string => Boolean(name));
      const lastModified = commits[0]?.commit?.author?.date ?? null;
      // commits 按时间倒序返回，最后一项是能拿到的最早提交
      const createdAt = commits[commits.length - 1]?.commit?.author?.date ?? lastModified;

      return {
        names: Array.from(new Set(commitAuthors)).slice(0, 10),
        lastModified,
        createdAt,
      };
    }
  } catch {
    // fall through to repository contributors
  }

  try {
    const contributors = (await githubFetch(
      `${repoUrl}/contributors?per_page=10`,
      headers,
    )) as ContributorEntry[] | null;

    const logins =
      contributors?.map((contributor) => contributor.login).filter((login): login is string => Boolean(login)) ?? [];

    if (logins.length) {
      return { names: Array.from(new Set(logins)).slice(0, 10), lastModified: null, createdAt: null };
    }
  } catch {
    // return empty result when GitHub is unavailable
  }

  return { names: [], lastModified: null, createdAt: null };
}
