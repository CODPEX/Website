import { DollarSign, RotateCw, UserRound } from 'lucide-react';

import { licenseConfig } from '@/lib/shared';

const mark = 'grid h-4 w-4 place-items-center rounded-full border border-current/40';

export default function LicenseBadge({ className = '' }: { className?: string }) {
  return (
    <a
      href={licenseConfig.url}
      target="_blank"
      rel="noreferrer license"
      title={licenseConfig.name}
      className={`group inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-gradient-to-r from-indigo-500/[0.08] via-fuchsia-500/[0.06] to-transparent px-2.5 py-1 text-[var(--site-link)] backdrop-blur transition hover:border-indigo-400/60 hover:from-indigo-500/[0.12] ${className}`}
    >
      <span className="flex items-center gap-0.5">
        <span className={`${mark} text-[7px] font-black leading-none`}>CC</span>
        <span className={mark}>
          <UserRound className="h-2 w-2" strokeWidth={3} />
        </span>
        <span className={`${mark} relative`}>
          <DollarSign className="h-2 w-2" strokeWidth={3} />
          <span className="absolute h-[1px] w-2.5 rotate-45 bg-current" aria-hidden="true" />
        </span>
        <span className={mark}>
          <RotateCw className="h-2 w-2" strokeWidth={3} />
        </span>
      </span>
      <span className="text-[10px] font-semibold tracking-wide text-[var(--site-fg)]">{licenseConfig.name}</span>
    </a>
  );
}
