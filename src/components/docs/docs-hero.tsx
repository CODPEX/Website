'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, CalendarDays, Check, Clock, FileText, History, Link2, PencilLine } from 'lucide-react';

import Aurora from '@/components/react-bits/Aurora';
import BlurText from '@/components/react-bits/BlurText';
import ShinyText from '@/components/react-bits/ShinyText';
import LicenseBadge from '@/components/license-badge';
import { useSite } from '@/contexts/site-context';
import { appName, authorCardConfig, gitConfig } from '@/lib/shared';

type DocsHeroProps = {
  title: string;
  description?: string;
  authors?: string[];
  contributors?: string[];
  editUrl?: string;
  publishedAt?: string | null;
  lastModified?: string | null;
  wordCount?: number;
  readingMinutes?: number;
  external?: boolean;
  repoUrl?: string;
  showLicense?: boolean;
  showActions?: boolean;
  showStats?: boolean;
};

const GITHUB_NAME_RE = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

function PersonAvatar({ name, size = 40 }: { name: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const isGithubName = GITHUB_NAME_RE.test(name);

  if (isGithubName && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`https://github.com/${name}.png?size=${size * 2}`}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setFailed(true)}
        className="flex-none rounded-full border border-[var(--site-border)] object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className="flex flex-none items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

function getAuthorGithubUrl(name: string) {
  if (GITHUB_NAME_RE.test(name)) return `https://github.com/${name}`;
  if (name === appName) return `https://github.com/${gitConfig.user}`;
  return null;
}

function PersonChip({ name, role }: { name: string; role: string }) {
  const href = authorCardConfig.linkToGithub ? getAuthorGithubUrl(name) : null;

  const body = (
    <>
      <PersonAvatar name={name} />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="break-words text-sm font-semibold text-[var(--site-fg)] transition group-hover:text-indigo-500">
          {name}
        </span>
        <span className="text-xs text-[var(--site-muted)]">{role}</span>
      </span>
      {href && (
        <ArrowUpRight className="h-3.5 w-3.5 flex-none text-indigo-500 opacity-0 transition group-hover:opacity-100" />
      )}
    </>
  );

  if (!href) {
    return <span className="inline-flex items-center gap-3">{body}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={`GitHub · ${name}`}
      className="group inline-flex items-center gap-3 rounded-xl transition hover:opacity-90"
    >
      {body}
    </a>
  );
}

export default function DocsHero({
  title,
  description,
  authors = [],
  contributors = [],
  editUrl,
  publishedAt,
  lastModified,
  wordCount = 0,
  readingMinutes = 0,
  external = false,
  repoUrl,
  showLicense = false,
  showActions = true,
  showStats = true,
}: DocsHeroProps) {
  const { t, isDark, lang } = useSite();
  const [copied, setCopied] = useState(false);

  const formatDate = (value?: string | null) =>
    value
      ? new Date(value).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          timeZone: 'UTC',
        })
      : null;

  const publishedDate = formatDate(publishedAt);
  const modifiedDate = formatDate(lastModified);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(true);
    }
  }, []);

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[var(--site-border)] bg-[var(--site-card)] px-6 py-16 backdrop-blur-sm sm:px-10">
      <div className="absolute inset-0 opacity-60">
        <Aurora
          colorStops={['#4f46e5', '#a855f7', '#ec4899']}
          amplitude={1}
          blend={0.7}
          speed={0.75}
          height={320}
          layers={3}
          glow={0.7}
          brightness={0.85}
          mouseInteraction
          lightMode={!isDark}
          intro
        />
      </div>
      {/* 由 data-theme 驱动，服务端渲染时也不会先出现浅色遮罩 */}
      <div className="pointer-events-none absolute inset-0 hero-overlay" aria-hidden="true" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <ShinyText
              text={t('docsBadge')}
              speed={3.4}
              color={isDark ? '#a5b4fc' : '#4f46e5'}
              shineColor={isDark ? '#ffffff' : '#312e81'}
              className="text-xs font-semibold tracking-[0.3em]"
            />
            {external && repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
                  isDark
                    ? 'border-white/15 bg-white/[0.06] text-slate-300 hover:border-indigo-400/60 hover:text-white'
                    : 'border-slate-200 bg-white/70 text-slate-600 hover:border-indigo-400 hover:text-slate-900'
                }`}
              >
                <ArrowUpRight className="h-3 w-3" />
                {t('externalWork')} · {repoUrl.replace(/^https?:\/\/github\.com\//, '')}
              </a>
            )}
          </div>
          {showLicense && <LicenseBadge className="flex-none" />}
        </div>
        <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-[var(--site-fg)] sm:text-5xl">
          <BlurText
            text={title}
            animateBy="words"
            direction="top"
            delay={100}
            stepDuration={0.4}
            blur={8}
            distance={30}
            effect="blur"
            trigger="load"
          />
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--site-muted)] sm:text-base">{description}</p>

        {(authors.length > 0 || contributors.length > 0) && (
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            {authors.map((name) => (
              <PersonChip key={`author-${name}`} name={name} role={t('docAuthors')} />
            ))}
            {contributors.map((name) => (
              <PersonChip key={`contributor-${name}`} name={name} role={t('docContributors')} />
            ))}
          </div>
        )}

        {showStats && (wordCount > 0 || readingMinutes > 0 || publishedDate || modifiedDate) && (
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--site-muted)]">
            {wordCount > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                {wordCount.toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US')} {t('wordsUnit')}
              </span>
            )}
            {readingMinutes > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {readingMinutes} {t('readingTime')}
              </span>
            )}
            {publishedDate && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {t('publishedAt')}：{publishedDate}
              </span>
            )}
            {modifiedDate && (
              <span className="inline-flex items-center gap-1.5">
                <History className="h-3.5 w-3.5" />
                {t('lastUpdated')}：{modifiedDate}
              </span>
            )}
          </div>
        )}

        {showActions && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {editUrl && (
              <a
                href={editUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-indigo-400/40 bg-indigo-500/10 px-6 py-3 text-sm font-semibold text-[var(--site-fg)] transition hover:border-indigo-400"
              >
                <PencilLine className="h-4 w-4 text-indigo-500" /> {t('editOnGitHub')} <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-2 rounded-xl border border-[var(--site-border)] bg-[var(--site-card)] px-6 py-3 text-sm font-semibold text-[var(--site-fg)] transition hover:border-indigo-400"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Link2 className="h-4 w-4 text-indigo-500" />}
              {copied ? t('linkCopied') : t('shareLink')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
