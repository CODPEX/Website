export type DocNavPage = {
  id?: number;
  title: string;
  url: string;
};

/**
 * 从文档 URL 解析所属分组。
 * 兼容 i18n 的 locale 前缀（/en/docs/...）与无前缀形式（/docs/...）。
 */
export function getDocGroup(url: string): string {
  const segments = url
    .replace(/^\/(?:[a-z]{2}(?:-[a-zA-Z]{2})?\/)?docs\/?/, '')
    .split('/')
    .filter(Boolean);
  return segments.length > 1 ? segments[1] : 'guide';
}

/** 去掉语言前缀，让不同语言版本的同一篇文档可以互相匹配 */
function withoutLocale(url: string): string {
  return url.replace(/^\/(?:en|zh)(?=\/)/, '');
}

/**
 * 按 frontmatter 的 id 升序排列；缺少 id 的页面排在最后并保持原有相对顺序。
 */
export function sortDocsById<T extends DocNavPage>(pages: T[]): T[] {
  return pages
    .map((page, index) => ({ page, index }))
    .sort((a, b) => {
      const left = a.page.id ?? Number.MAX_SAFE_INTEGER;
      const right = b.page.id ?? Number.MAX_SAFE_INTEGER;
      return left - right || a.index - b.index;
    })
    .map((entry) => entry.page);
}

/**
 * 在同一产品分组内按 id 顺序计算上一篇 / 下一篇。
 */
export function getAdjacentDocs<T extends DocNavPage>(pages: T[], currentUrl: string) {
  const group = getDocGroup(currentUrl);
  const scoped = sortDocsById(pages.filter((page) => getDocGroup(page.url) === group));
  const current = withoutLocale(currentUrl);
  const index = scoped.findIndex((page) => withoutLocale(page.url) === current);

  if (index < 0) return { previous: undefined, next: undefined };

  return {
    previous: scoped[index - 1],
    next: scoped[index + 1],
  };
}
