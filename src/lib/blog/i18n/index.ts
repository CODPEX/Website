import type { Lang } from '@/contexts/site-context';
import type { BlogDict, BlogTag } from './types';
import { blogEn } from './en';
import { blogZh } from './zh';

export type { BlogDict, BlogTag };

export const blogDictionaries: Record<Lang, BlogDict> = {
  zh: blogZh,
  en: blogEn,
};

// 兼容 frontmatter 中已存在的旧中文标签
const tagAliases: Record<string, BlogTag> = {
  opinion: 'opinion',
  engineering: 'engineering',
  product: 'product',
  观点: 'opinion',
  工程: 'engineering',
  产品: 'product',
};

export function normalizeBlogTag(value: string | undefined): BlogTag | undefined {
  if (!value) return undefined;
  return tagAliases[value.trim()] ?? tagAliases[value.trim().toLowerCase()];
}

export function blogTagLabel(dict: BlogDict, value: string | undefined): string {
  if (!value) return '';
  const key = normalizeBlogTag(value);
  return key ? dict.tags[key] : value;
}
