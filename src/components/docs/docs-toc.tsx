'use client';

import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { motion } from 'motion/react';

import { useSite } from '@/contexts/site-context';

export type TocItem = {
  title: ReactNode;
  url: string;
  depth?: number;
};

export default function DocsToc({ toc }: { toc: TocItem[] }) {
  const { t } = useSite();
  if (!toc.length) return null;

  const jumpTo = (event: ReactMouseEvent<HTMLAnchorElement>, item: TocItem) => {
    event.preventDefault();
    const label = typeof item.title === 'string' ? item.title.trim() : '';
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4'));
    const heading = label
      ? headings.find((element) => element.textContent?.trim() === label)
      : undefined;
    const target = heading ?? document.getElementById(item.url.replace(/^#/, ''));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (item.url.startsWith('#')) window.history.replaceState(null, '', item.url);
  };

  return (
    <aside className="hidden w-56 flex-none lg:block">
      <div className="sticky top-28 rounded-2xl border border-[var(--site-border)] bg-[var(--site-card)] p-5 backdrop-blur-sm">
        <div
          className="text-[11px] font-semibold tracking-[0.3em]"
          style={{ color: 'var(--site-accent)' }}
        >
          {t('onThisPage')}
        </div>
        <nav className="mt-4 space-y-1">
          {toc.map((item, index) => (
            <motion.a
              key={item.url}
              href={item.url}
              onClick={(event) => jumpTo(event, item)}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
              style={{ paddingLeft: `${Math.max(0, (item.depth ?? 1) - 1) * 14}px` }}
              className="block rounded-lg px-2 py-1.5 text-xs leading-5 text-[var(--site-muted)] transition hover:bg-[var(--site-hover)] hover:text-[var(--site-fg)]"
            >
              {item.title}
            </motion.a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
