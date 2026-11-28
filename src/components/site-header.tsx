'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Languages, Menu, Moon, Sun, X } from 'lucide-react';

import { useSite } from '@/contexts/site-context';

export default function SiteHeader() {
  const { t, isDark, lang, toggleLang, toggleTheme } = useSite();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const themeButton = (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t('themeLabel')}
      title={t('themeLabel')}
      className="grid h-8 w-8 place-items-center rounded-lg transition hover:opacity-70"
      style={{ color: 'var(--site-fg)' }}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );

  const langButton = (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t('languageLabel')}
      title={t('languageLabel')}
      className="flex items-center gap-1 rounded-lg px-1 text-xs font-semibold transition hover:opacity-70"
      style={{ color: 'var(--site-fg)' }}
    >
      <Languages className="h-3.5 w-3.5" />
      {lang === 'zh' ? 'EN' : '中'}
    </button>
  );

  // 文档链接始终跟随 URL 语言段，避免状态与路径短暂不一致
  const pathLang = pathname.match(/^\/(en|zh)(?:\/|$)/)?.[1];
  const docsLang = pathLang === 'en' || pathLang === 'zh' ? pathLang : lang;

  const links = [
    { href: `/${docsLang}/docs`, label: t('docs'), external: false },
    { href: '/blog', label: t('blog'), external: false },
    { href: 'https://github.com/CODPEX', label: t('github'), external: true },
  ];

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b"
      style={{
        borderColor: 'var(--site-border)',
        backgroundColor: 'var(--site-header-bg)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a
          href="/"
          className="flex min-w-0 items-center gap-2 font-black tracking-tight"
          style={{ color: 'var(--site-fg)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className="h-7 w-7 flex-none" style={{ filter: isDark ? 'invert(1)' : 'none' }} />
          <span className="truncate text-sm">{t('brandShort')}</span>
        </a>

        {/* 桌面导航 */}
        <nav className="hidden items-center gap-5 text-sm sm:gap-6 md:flex">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition hover:opacity-80"
                style={{ color: 'var(--site-muted)' }}
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:opacity-80"
                style={{ color: 'var(--site-muted)' }}
              >
                {link.label}
              </a>
            ),
          )}
          <span className="mx-1 h-4 w-px" style={{ backgroundColor: 'var(--site-border)' }} />
          {themeButton}
          {langButton}
        </nav>

        {/* 移动端控制 */}
        <div className="flex items-center gap-1 md:hidden">
          {themeButton}
          {langButton}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? t('close') : t('menu')}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="ml-1 grid h-9 w-9 place-items-center rounded-lg border transition"
            style={{
              color: 'var(--site-fg)',
              borderColor: 'var(--site-border)',
              backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
            }}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* 移动端下拉菜单 */}
      {open && (
        <div
          id="mobile-nav"
          className="border-t md:hidden"
          style={{
            borderColor: 'var(--site-border)',
            backgroundColor: isDark ? 'rgba(5,6,11,0.96)' : 'rgba(246,247,251,0.97)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {links.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold transition"
                  style={{ color: 'var(--site-fg)' }}
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4 opacity-60" />
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold transition"
                  style={{ color: 'var(--site-fg)' }}
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
