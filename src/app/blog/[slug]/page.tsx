import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { blogSource } from '@/lib/blog-source';
import { getDocStats } from '@/lib/doc-stats';
import { getLocalGitDates } from '@/lib/doc-dates';
import { appName } from '@/lib/shared';
import { getMDXComponents } from '@/components/mdx';
import SiteHeader from '@/components/site-header';
import BlurText from '@/components/react-bits/BlurText';
import BlogPostMeta, { BlogBackLink } from '@/components/blog/blog-post-meta';

type Props = { params: Promise<{ slug: string }> };

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const page = blogSource.getPage([slug]);
  if (!page) notFound();

  const MDX = page.data.body;
  const text = await page.data.getText('processed');
  const { words, minutes } = getDocStats(text);
  const modified = getLocalGitDates(page.absolutePath).modified;

  return (
    <div className="relative min-h-screen bg-[var(--site-bg)] text-[var(--site-fg)]">
      <SiteHeader />
      <div className="pointer-events-none fixed inset-0 z-0 codpex-grid" aria-hidden="true" />

      <article className="relative z-10 mx-auto max-w-3xl px-6 pb-28 pt-36">
        <BlogBackLink />
        <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
          <BlurText text={page.data.title} animateBy="words" direction="top" trigger="load" />
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--site-muted)]">{page.data.description}</p>

        <BlogPostMeta
          author={page.data.author ?? appName}
          date={page.data.date}
          modified={modified}
          words={words}
          minutes={minutes}
        />

        <div className="mt-8 rounded-[32px] border border-[var(--site-border)] bg-[var(--site-card)] px-6 py-10 backdrop-blur-sm sm:px-10">
          <MDX components={getMDXComponents({ h1: () => null })} />
        </div>
      </article>
    </div>
  );
}

export function generateStaticParams() {
  return blogSource.generateParams().map((page) => ({ slug: page.slug.join('/') }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = blogSource.getPage([slug]);
  if (!page) notFound();

  return {
    title: `${page.data.title} — CODPEX Blog`,
    description: page.data.description,
  };
}
