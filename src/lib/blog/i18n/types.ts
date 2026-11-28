export type BlogTag = 'opinion' | 'engineering' | 'product';

export type BlogDict = {
  badge: string;
  title: string;
  description: string;
  all: string;
  readMore: string;
  backToBlog: string;
  by: string;
  wordsUnit: string;
  readingTime: string;
  updated: string;
  tags: Record<BlogTag, string>;
};
