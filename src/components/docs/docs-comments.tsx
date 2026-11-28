'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MessageCircle, Settings2 } from 'lucide-react';

import { giscusConfig } from '@/lib/shared';
import { useSite } from '@/contexts/site-context';

type GiscusMessage = {
  giscus?: {
    discussion?: {
      totalCommentCount?: number;
      totalReplyCount?: number;
    };
  };
};

export default function DocsComments({
  categoryId,
  term,
  title,
}: {
  categoryId?: string | null;
  term?: string;
  title?: string;
}) {
  const { t, lang, theme, isDark } = useSite();
  const containerRef = useRef<HTMLDivElement>(null);
  const [commentCount, setCommentCount] = useState<number | null>(null);
  const resolvedCategoryId = categoryId ?? giscusConfig.categoryId;
  const configured = Boolean(giscusConfig.repoId && resolvedCategoryId);
  const themeRef = useRef(theme);
  themeRef.current = theme;
  const sentThemeRef = useRef<string | null>(null);

  const manageUrl = term
    ? `https://github.com/${giscusConfig.repo}/discussions?discussions_q=${encodeURIComponent(`in:title "${term}"`)}`
    : `https://github.com/${giscusConfig.repo}/discussions`;

  useEffect(() => {
    if (!configured) return;
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';
    sentThemeRef.current = null;
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    const attributes: Record<string, string> = {
      'data-repo': giscusConfig.repo,
      'data-repo-id': giscusConfig.repoId,
      'data-category': giscusConfig.category,
      'data-category-id': resolvedCategoryId,
      // 使用文章唯一路径作为 discussion 标识，确保每篇文章拥有独立评论区
      'data-mapping': 'specific',
      'data-term': term || window.location.pathname,
      'data-strict': '1',
      'data-reactions-enabled': '1',
      // 开启元数据回传，用于在标题旁显示评论数
      'data-emit-metadata': '1',
      'data-input-position': 'bottom',
      'data-theme': themeRef.current === 'dark' ? 'dark' : 'light',
      'data-lang': lang === 'zh' ? 'zh-CN' : 'en',
      'data-loading': 'lazy',
    };
    Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));

    container.appendChild(script);
    return () => {
      container.innerHTML = '';
    };
  }, [configured, resolvedCategoryId, term, lang]);

  // 主题切换时通过 postMessage 同步 iframe，避免重新加载评论区
  useEffect(() => {
    if (!configured) return;

    const syncTheme = () => {
      if (sentThemeRef.current === theme) return;
      const iframe = containerRef.current?.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
      if (!iframe?.contentWindow) return;
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme: theme === 'dark' ? 'dark' : 'light' } } },
        'https://giscus.app',
      );
      sentThemeRef.current = theme;
    };

    syncTheme();

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://giscus.app') return;
      if (!(event.data as { giscus?: unknown })?.giscus) return;
      syncTheme();
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [configured, theme]);

  useEffect(() => {
    if (!configured) return;
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://giscus.app') return;
      const data = event.data as GiscusMessage;
      const discussion = data?.giscus?.discussion;
      if (!discussion) return;
      setCommentCount(discussion.totalCommentCount ?? 0);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [configured]);

  return (
    <section
      className={`relative mt-8 overflow-hidden rounded-[24px] border border-[var(--site-border)] bg-[var(--site-card)] px-4 py-8 backdrop-blur-sm sm:mt-10 sm:rounded-[32px] sm:px-10 sm:py-10 ${
        isDark ? 'shadow-[0_22px_44px_-20px_rgba(0,0,0,0.8)]' : 'shadow-[0_22px_44px_-22px_rgba(24,24,27,0.3)]'
      }`}
    >
      <span
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent sm:inset-x-10"
        aria-hidden="true"
      />

      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`grid h-9 w-9 flex-none place-items-center rounded-xl border sm:h-10 sm:w-10 ${
              isDark ? 'border-white/10 bg-white/[0.04]' : 'border-slate-200 bg-white/70'
            }`}
          >
            <MessageCircle className="h-4 w-4 text-[var(--site-muted)] sm:h-4.5 sm:w-4.5" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-bold tracking-wide text-[var(--site-fg)]">{t('comments')}</h2>
              {configured && commentCount !== null && (
                <span className="rounded-full border border-[var(--site-border)] px-2 py-0.5 text-[11px] font-semibold text-[var(--site-subtle)]">
                  {commentCount}
                </span>
              )}
            </div>
            <p className="truncate text-xs text-[var(--site-muted)]">{title ?? 'GitHub Discussions'}</p>
          </div>
        </div>

        {configured && (
          <a
            href={manageUrl}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex w-full items-center justify-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition sm:w-auto sm:flex-none sm:py-1.5 ${
              isDark
                ? 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-indigo-400/60 hover:text-white'
                : 'border-slate-200 bg-white/70 text-slate-600 hover:border-indigo-400 hover:text-slate-900'
            }`}
          >
            {t('manageOnGithub')}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      {configured ? (
        <>
          <div ref={containerRef} className="giscus-comments" />
          <p className="mt-4 text-[11px] leading-5 text-[var(--site-muted)] sm:mt-5">{t('commentsHint')}</p>
        </>
      ) : (
        <div
          className={`flex items-start gap-3 rounded-2xl border border-dashed px-4 py-5 sm:gap-4 sm:px-6 sm:py-6 ${
            isDark ? 'border-white/15 bg-white/[0.03]' : 'border-slate-300 bg-slate-50/60'
          }`}
        >
          <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-fuchsia-500/10 sm:h-10 sm:w-10">
            <Settings2 className="h-4 w-4 text-indigo-500 sm:h-4.5 sm:w-4.5" />
          </span>
          <div className="min-w-0 text-sm leading-6 text-[var(--site-muted)]">
            <p className="font-semibold text-[var(--site-fg)]">{t('commentsSetupTitle')}</p>
            <p className="mt-1">{t('commentsSetupHint')}</p>
            <a
              href="https://giscus.app/zh-CN"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              giscus.app →
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
