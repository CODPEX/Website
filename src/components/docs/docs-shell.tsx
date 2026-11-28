'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Menu, Search, X } from 'lucide-react';

import AnimatedList, { type AnimatedListEntry } from '@/components/react-bits/AnimatedList';
import ShinyText from '@/components/react-bits/ShinyText';
import SiteHeader from '@/components/site-header';
import { useSite } from '@/contexts/site-context';
import type { SidebarGroup } from '@/lib/docs-sidebar';

export default function DocsShell({
  groups,
  children,
  locale,
}: {
  groups: SidebarGroup[];
  children: ReactNode;
  locale: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { t, theme, isDark } = useSite();
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const isCenter = /(?:^\/(?:en|zh))?\/docs\/?$/.test(pathname);

  const keyFromPath = () => {
    for (const group of groups) {
      if (group.key === 'guide') continue;
      if (group.items.some((item) => pathname === item.url || pathname.startsWith(`${item.url}/`))) {
        return group.key;
      }
    }
    return 'guide';
  };

  const [selectedProduct, setSelectedProduct] = useState(keyFromPath);

  useEffect(() => {
    setSelectedProduct(keyFromPath());
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const activePageId = pathname.replace(/\/$/, '');

  const activeGroup = groups.find((group) => group.key === selectedProduct);

  const scopedPages = useMemo(() => activeGroup?.items ?? [], [activeGroup]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return scopedPages;
    return scopedPages.filter((page) => `${page.title} ${page.description ?? ''}`.toLowerCase().includes(q));
  }, [scopedPages, query]);

  const searchClass = `mt-4 flex items-center gap-2 rounded-xl border px-3 py-2.5 backdrop-blur transition focus-within:border-indigo-400 ${
    isDark ? 'border-white/10 bg-white/[0.04]' : 'border-slate-200 bg-white/70'
  }`;

  const backClass = `mt-5 inline-flex items-center gap-2 text-xs font-medium transition ${
    isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
  }`;

  const docsCenterClass = `mt-5 flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition hover:border-indigo-400 ${
    isDark
      ? 'border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]'
      : 'border-slate-200 bg-white/70 text-slate-700 hover:bg-white'
  }`;

  const docsCenterButton = (
    <Link href={`/${locale}/docs`} className={docsCenterClass} onClick={() => setMobileOpen(false)}>
      <BookOpen className="h-4 w-4 flex-none text-indigo-500" />
      {t('docsCenter')}
    </Link>
  );

  const sidebarNav = (
    <>
      {docsCenterButton}

      <div className={searchClass}>
        <Search className="h-4 w-4 flex-none text-[var(--site-subtle)]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('searchDocs')}
          aria-label={t('searchDocs')}
          className="w-full bg-transparent text-sm text-[var(--site-fg)] outline-none placeholder:text-[var(--site-subtle)]"
        />
      </div>

      <div className="mt-5 space-y-5">
        {filtered.length > 0 && (
          <div>
            <div
              className="mb-2.5 flex items-center gap-2 text-sm font-bold tracking-normal"
              style={{ color: isDark ? '#a5b4fc' : '#4f46e5' }}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: 'currentColor' }} />
              {selectedProduct === 'guide' ? t('generalDocs') : (activeGroup?.label ?? selectedProduct)}
            </div>
            <AnimatedList
              items={filtered.map((page) => ({
                id: page.url,
                title: page.title,
                description: page.description ?? t('brand'),
              }))}
              theme={theme}
              accentColor="#818cf8"
              animation="none"
              stagger={50}
              frame
              width="100%"
              maxHeight="none"
              gap={8}
              radius={16}
              showGradients={false}
              selectOnHover={false}
              enableArrowNavigation
              selectedId={activePageId}
              initialSelectedIndex={0}
              onItemSelect={(_item, index) => {
                setMobileOpen(false);
                router.push(filtered[index].url);
              }}
              renderItem={(item) => {
                const entry = item as AnimatedListEntry;
                return (
                  <span className="flex min-w-0 flex-col gap-1 py-0.5">
                    <span className="break-words text-sm font-semibold leading-5 text-[var(--site-fg)]">
                      {entry.title}
                    </span>
                    <span className="line-clamp-2 break-words text-xs leading-5 text-[var(--site-subtle)]">
                      {entry.description}
                    </span>
                  </span>
                );
              }}
            />
          </div>
        )}
      </div>

      <a href={`/${locale}/docs`} className={backClass} onClick={() => setMobileOpen(false)}>
        <ArrowLeft className="h-3.5 w-3.5" /> {t('backToDocs')}
      </a>
    </>
  );

  return (
    <div className="relative min-h-screen w-full bg-[var(--site-bg)] text-[var(--site-fg)]">
      <div className="pointer-events-none fixed inset-0 z-0 codpex-grid" aria-hidden="true" />
      <SiteHeader />

      <div className="relative z-10 mx-auto flex max-w-[1600px] gap-10 px-4 pb-24 pt-24 sm:px-6 sm:pt-28 lg:pt-32">
        {!isCenter && (
          <aside className="hidden w-64 flex-none lg:block">
            <div className="sticky top-24 pb-16 pr-1">
              <ShinyText
                text={t('documentation')}
                speed={3.5}
                color={isDark ? '#a5b4fc' : '#4f46e5'}
                shineColor={isDark ? '#ffffff' : '#312e81'}
                className="text-xs font-semibold tracking-[0.35em]"
              />
              {sidebarNav}
            </div>
          </aside>
        )}

        <div className="min-w-0 flex-1">
          {!isCenter && (
            <div
              className={`sticky top-16 z-30 -mx-4 mb-5 border-b px-4 py-2.5 backdrop-blur sm:-mx-6 sm:px-6 lg:hidden ${
                isDark
                  ? 'border-white/[0.06] bg-[#05060b]/85'
                  : 'border-slate-200 bg-[#f6f7fb]/85'
              }`}
            >
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label={t('docsMenu')}
                aria-expanded={mobileOpen}
                aria-controls="docs-mobile-nav"
                className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                  isDark
                    ? 'border-white/10 bg-white/[0.04] text-slate-200 hover:border-indigo-400/60'
                    : 'border-slate-200 bg-white/70 text-slate-700 hover:border-indigo-400'
                }`}
              >
                <Menu className="h-4 w-4 text-indigo-500" />
                {t('docsMenu')}
              </button>
            </div>
          )}
          {children}
        </div>
      </div>

      {!isCenter && mobileOpen && (
        <div
          id="docs-mobile-nav"
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t('docsMenu')}
        >
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label={t('close')}
            className="absolute inset-0 h-full w-full cursor-default bg-black/50 backdrop-blur-sm"
          />
          <div
            className={`absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col overflow-y-auto overscroll-contain border-r px-4 pb-10 pt-5 shadow-2xl ${
              isDark ? 'border-white/10 bg-[#05060b]' : 'border-slate-200 bg-[#f6f7fb]'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <ShinyText
                text={t('documentation')}
                speed={3.5}
                color={isDark ? '#a5b4fc' : '#4f46e5'}
                shineColor={isDark ? '#ffffff' : '#312e81'}
                className="text-xs font-semibold tracking-[0.35em]"
              />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label={t('close')}
                className={`grid h-8 w-8 flex-none place-items-center rounded-lg border transition ${
                  isDark
                    ? 'border-white/10 bg-white/[0.04] text-slate-300 hover:text-white'
                    : 'border-slate-200 bg-white/70 text-slate-600 hover:text-slate-900'
                }`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {sidebarNav}
          </div>
        </div>
      )}

      <div
        className={`pointer-events-none fixed bottom-4 right-6 z-20 flex items-center gap-2 rounded-lg border px-3 py-1.5 text-right text-[11px] ${
          isDark
            ? 'border-white/10 bg-[#05060b]/80 text-slate-400'
            : 'border-slate-200 bg-white/80 text-slate-500'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt="CODPEX"
          className="h-3.5 w-3.5 flex-none"
          style={{ filter: isDark ? 'invert(1)' : 'none' }}
        />
        {t('copyright')}
      </div>
    </div>
  );
}
