import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { getMDXComponents } from '@/components/mdx';
import DocsToc from '@/components/docs/docs-toc';
import DocsHero from '@/components/docs/docs-hero';
import DocsPagination from '@/components/docs/docs-pagination';
import { getAdjacentDocs } from '@/lib/docs-navigation';
import { getPageImageUrl } from '@/lib/shared';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const toc = (page.data.toc ?? [])
    .slice(1)
    .map((item) => ({
      title: item.title,
      url: item.url,
      depth: item.depth,
    }));

  const { previous, next } = getAdjacentDocs(
    source.getPages(i18n.defaultLanguage).map((item) => ({
      id: item.data.id,
      title: item.data.title,
      url: item.url,
    })),
    page.url,
  );

  return (
    <div className="relative min-h-screen">
      <DocsHero title={page.data.title} description={page.data.description} />

      <div className="mt-10 flex gap-12">
        <article className="min-w-0 flex-1 rounded-[32px] border border-[var(--site-border)] bg-[var(--site-card)] px-6 py-10 backdrop-blur-sm sm:px-10">
          <MDX components={getMDXComponents({ h1: () => null })} />
          <DocsPagination previous={previous} next={next} />
        </article>
        <DocsToc toc={toc} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: `${page.data.title} — CODPEX Docs`,
    description: page.data.description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
