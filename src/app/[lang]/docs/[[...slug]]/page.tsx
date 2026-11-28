import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Info } from 'lucide-react';

import { i18n } from '@/lib/i18n';
import { source } from '@/lib/source';
import { getMDXComponents } from '@/components/mdx';
import DocsToc from '@/components/docs/docs-toc';
import DocsHero from '@/components/docs/docs-hero';
import DocsPagination from '@/components/docs/docs-pagination';
import { getAdjacentDocs } from '@/lib/docs-navigation';
import { getGithubDocInfo, normalizeNames } from '@/lib/doc-contributors';
import { getDocStats } from '@/lib/doc-stats';
import { getLocalGitDates } from '@/lib/doc-dates';
import { appName, getDocEditUrl, getPageImageUrl, siteUrl } from '@/lib/shared';
import DocsComments from '@/components/docs/docs-comments';
import CopyrightCard from '@/components/docs/copyright-card';
import { getGiscusCategoryId } from '@/lib/giscus';

export default async function Page(props: PageProps<'/[lang]/docs/[[...slug]]'>) {
  const params = await props.params;
  const fallbackLocale = i18n.defaultLanguage;
  const localizedPage = source.getPage(params.slug, params.lang);
  const fallbackPage =
    !localizedPage && params.lang !== fallbackLocale ? source.getPage(params.slug, fallbackLocale) : undefined;
  const page = localizedPage ?? fallbackPage;
  if (!page) notFound();

  const isFallback = !localizedPage && Boolean(fallbackPage);
  const fallbackNotice =
    params.lang === 'zh'
      ? '抱歉，此文档暂时未能提供您当前的语言的版本！以下显示英文版本。'
      : `Sorry, this document is not available in your current language yet! Showing the ${fallbackLocale.toUpperCase()} version.`;

  const MDX = page.data.body;
  const manualAuthors = normalizeNames(page.data.authors);
  const manualContributors = normalizeNames(page.data.contributors);
  const githubInfo = await getGithubDocInfo(page.path);
  const authors = manualAuthors.length > 0 ? manualAuthors : githubInfo.names.slice(0, 1);
  const displayAuthors = authors.length > 0 ? authors : [appName];
  const authorNames = new Set(displayAuthors.map((name) => name.toLowerCase()));
  const contributors = (manualContributors.length > 0 ? manualContributors : githubInfo.names.slice(0, 5)).filter(
    (name) => !authorNames.has(name.toLowerCase()),
  );
  const localDates = getLocalGitDates(page.absolutePath);
  const lastModified = localDates.modified ?? githubInfo.lastModified;
  const publishedAt = localDates.created ?? githubInfo.createdAt ?? lastModified;
  const editUrl = getDocEditUrl(page.path);
  const giscusCategoryId = await getGiscusCategoryId();
  const isDocsCenter = !params.slug || params.slug.length === 0;

  const processedText = await page.data.getText('processed');
  const { words, minutes } = getDocStats(processedText);

  const { previous, next } = getAdjacentDocs(
    source.getPages(params.lang).map((item) => ({
      id: item.data.id,
      title: item.data.title,
      url: item.url,
    })),
    page.url,
  );
  const toc = (page.data.toc ?? [])
    .slice(1)
    .map((item) => ({
      title: item.title,
      url: item.url,
      depth: item.depth,
    }));

  return (
    <div className="relative min-h-screen">
      <div className="flex gap-10">
        <div className="min-w-0 flex-1">
          {isFallback && (
            <div
              role="status"
              className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-[var(--site-fg)]"
            >
              <Info className="mt-0.5 h-4 w-4 flex-none text-amber-500" />
              <span>{fallbackNotice}</span>
            </div>
          )}

          <DocsHero
            title={page.data.title}
            description={page.data.description}
            authors={isDocsCenter ? [] : displayAuthors}
            contributors={isDocsCenter ? [] : contributors}
            editUrl={editUrl}
            publishedAt={publishedAt}
            lastModified={lastModified}
            wordCount={words}
            readingMinutes={minutes}
            external={Boolean(page.data.external)}
            repoUrl={page.data.repo}
            showLicense={!isDocsCenter}
            showActions={!isDocsCenter}
            showStats={!isDocsCenter}
          />

          <article className="copyable mt-10 rounded-[32px] border border-[var(--site-border)] bg-[var(--site-card)] px-6 py-10 backdrop-blur-sm sm:px-10">
            <MDX components={getMDXComponents({ h1: () => null })} />
            <DocsPagination previous={previous} next={next} />
          </article>

          {!isDocsCenter && <CopyrightCard url={`${siteUrl}${page.url}`} />}

          {!isDocsCenter && <DocsComments categoryId={giscusCategoryId} term={page.url} title={page.data.title} />}
        </div>
        {!isDocsCenter && <DocsToc toc={toc} />}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/[lang]/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page =
    source.getPage(params.slug, params.lang) ??
    (params.lang !== i18n.defaultLanguage ? source.getPage(params.slug, i18n.defaultLanguage) : undefined);
  if (!page) notFound();

  return {
    title: `${page.data.title} — CODPEX Docs`,
    description: page.data.description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
