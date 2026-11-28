import { giscusConfig } from './shared';

type CategoryEntry = {
  node_id?: string;
  name?: string;
  slug?: string;
};


export async function getGiscusCategoryId(): Promise<string | null> {
  if (giscusConfig.categoryId) return giscusConfig.categoryId;

  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;

  try {
    const response = await fetch(`https://api.github.com/repos/${giscusConfig.repo}/discussions/categories`, {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;

    const categories = (await response.json()) as CategoryEntry[];
    const preferred =
      categories.find((category) => category.name?.toLowerCase() === giscusConfig.category.toLowerCase()) ??
      categories[0];

    return preferred?.node_id ?? null;
  } catch {
    return null;
  }
}
