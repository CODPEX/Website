import type { Metadata } from 'next';

import { blogSource } from '@/lib/blog-source';
import { getDocStats } from '@/lib/doc-stats';
import { appName } from '@/lib/shared';
import SiteHeader from '@/components/site-header';
import BlogHero from '@/components/blog/blog-hero';
import BlogList from '@/components/blog/blog-list';

export const metadata: Metadata = {
  title: 'Blog — CODPEX',
  description: 'Notes on open-source tools, engineering practice, and product design.',
};

export default async function BlogIndex() {
  const posts = await Promise.all(
    blogSource.getPages().map(async (page) => {
      const text = await page.data.getText('processed');
      const { words, minutes } = getDocStats(text);

      return {
        url: page.url,
        title: page.data.title,
        description: page.data.description,
        date: page.data.date ?? '',
        tag: page.data.tag,
        author: page.data.author ?? appName,
        words,
        minutes,
      };
    }),
  );

  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="relative min-h-screen bg-[var(--site-bg)] text-[var(--site-fg)]">
      <SiteHeader />
      <div className="pointer-events-none fixed inset-0 z-0 codpex-grid" aria-hidden="true" />

      <BlogHero />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <BlogList posts={posts} />
      </section>
    </div>
  );
}
