'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { useSite } from '@/contexts/site-context';
import type { DocNavPage } from '@/lib/docs-navigation';

type DocsPaginationProps = {
  previous?: DocNavPage;
  next?: DocNavPage;
};

export default function DocsPagination({ previous, next }: DocsPaginationProps) {
  const { t, isDark } = useSite();

  if (!previous && !next) return null;

  const linkClass = `group flex min-w-0 items-center gap-3 rounded-2xl border px-4 py-3 transition hover:border-indigo-400 ${
    isDark ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]' : 'border-slate-200 bg-white/60 hover:bg-white'
  }`;

  return (
    <nav
      aria-label={t('docs')}
      className="mt-12 grid gap-3 border-t border-[var(--site-border)] pt-6 sm:grid-cols-2"
    >
      {previous ? (
        <Link href={previous.url} className={`${linkClass} sm:col-start-1`}>
          <ArrowLeft className="h-4 w-4 flex-none text-[var(--site-accent)]" />
          <span className="flex min-w-0 flex-col gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--site-subtle)]">
              {t('previousDoc')}
            </span>
            <span className="break-words text-sm font-semibold text-[var(--site-fg)]">{previous.title}</span>
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}

      {next ? (
        <Link href={next.url} className={`${linkClass} sm:col-start-2 sm:justify-end sm:text-right`}>
          <span className="flex min-w-0 flex-col gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--site-subtle)]">
              {t('nextDoc')}
            </span>
            <span className="break-words text-sm font-semibold text-[var(--site-fg)]">{next.title}</span>
          </span>
          <ArrowRight className="h-4 w-4 flex-none text-[var(--site-accent)]" />
        </Link>
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}
    </nav>
  );
}
