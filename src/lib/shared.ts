import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'CODPEX';
export const siteUrl = 'https://codpex.top';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';

export const licenseConfig = {
  name: 'CC BY-NC-SA 4.0',
  shortName: 'CC-BY-NC-SA',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  notice: {
    zh: '未经作者许可，严禁转载！',
    en: 'Reproduction without the author’s permission is prohibited.',
  },
};

export const gitConfig = {
  user: 'CODPEX',
  repo: 'Website',
  branch: 'main',
};

export function getRepoDocPath(docPath: string) {
  return `content/docs/${docPath.replace(/^\/+/, '')}`;
}

export function getDocEditUrl(docPath: string) {
  return `https://github.com/${gitConfig.user}/${gitConfig.repo}/edit/${gitConfig.branch}/${getRepoDocPath(docPath)}`;
}

export const authorCardConfig = {
  linkToGithub: true,
};

export const giscusConfig = {
  repo: 'CODPEX/Website',
  repoId: 'R_kgDOM4TqZg',
  category: 'Announcements',
  categoryId: 'DIC_kwDOM4TqZs4DLqLD',
};

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
