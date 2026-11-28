'use client';

import { ArrowUpRight, DollarSign, RotateCw, UserRound } from 'lucide-react';

import { useSite } from '@/contexts/site-context';
import { licenseConfig } from '@/lib/shared';

const mark = 'grid h-4 w-4 place-items-center rounded-full border border-current/40';

export default function CopyrightCard({ url }: { url: string }) {
  const { t, isDark } = useSite();

  return (
    <section
      className={`mt-8 flex items-start gap-4 rounded-3xl border px-5 py-5 sm:px-6 sm:py-6 ${
        isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-white/70'
      }`}
    >
      <span
        className={`grid h-11 w-11 flex-none place-items-center rounded-xl border ${
          isDark ? 'border-indigo-400/25 bg-indigo-500/10' : 'border-indigo-500/20 bg-indigo-500/[0.06]'
        }`}
        aria-hidden="true"
      >
        <span className="grid grid-cols-2 gap-0.5 text-[var(--site-link)]">
          <span className={`${mark} text-[6px] font-black leading-none`}>CC</span>
          <span className={mark}>
            <UserRound className="h-2 w-2" strokeWidth={3} />
          </span>
          <span className={`${mark} relative`}>
            <DollarSign className="h-2 w-2" strokeWidth={3} />
            <span className="absolute h-[1px] w-2.5 rotate-45 bg-current" />
          </span>
          <span className={mark}>
            <RotateCw className="h-2 w-2" strokeWidth={3} />
          </span>
        </span>
      </span>

      <div className="min-w-0 text-sm leading-6">
        <p className="font-semibold text-[var(--site-fg)]">
          {t('licenseTitle')}：
          <a
            href={licenseConfig.url}
            target="_blank"
            rel="noreferrer license"
            className="text-indigo-500 underline decoration-indigo-500/30 underline-offset-4 transition hover:opacity-80"
          >
            {licenseConfig.name}
          </a>
          <span className="ml-2 inline-flex items-center gap-0.5 text-xs font-normal text-[var(--site-muted)]">
            {t('viewLicense')}
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </p>

        <p className="mt-1 break-all text-xs text-[var(--site-muted)]">
          {t('originalUrl')}：
          <a
            href={url}
            className="underline decoration-[var(--site-border)] underline-offset-4 transition hover:text-[var(--site-fg)]"
          >
            {url}
          </a>
        </p>

      </div>
    </section>
  );
}
