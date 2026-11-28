'use client';

import type { ReactNode } from 'react';
import { ArrowUpRight, Package } from 'lucide-react';

import SpotlightCard from '@/components/react-bits/SpotlightCard';
import { useSite } from '@/contexts/site-context';

type MdxCardProps = {
  title?: string;
  href?: string;
  description?: string;
  icon?: ReactNode;
  badge?: string;
};

export default function MdxCard({ title, href = '#', description, icon, badge }: MdxCardProps) {
  const { theme, isDark } = useSite();
  const external = href.startsWith('http');

  return (
    <SpotlightCard
      theme={theme}
      spotlightColor={isDark ? 'rgba(129,140,248,0.24)' : 'rgba(79,70,229,0.14)'}
      intensity={0.8}
      spotlightSize={220}
      borderGlow={0.7}
      ambient
      className="h-full rounded-2xl p-5"
    >
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        className="group flex h-full flex-col"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/15 text-indigo-500">
            {icon ?? <Package className="h-5 w-5" />}
          </span>
          <div className="flex items-center gap-2">
            {badge && (
              <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-2 py-0.5 text-[10px] font-semibold text-fuchsia-500">
                {badge}
              </span>
            )}
            <ArrowUpRight className="h-4 w-4 flex-none text-indigo-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>

        <h3 className="mt-4 text-base font-bold tracking-tight text-[var(--site-fg)] transition group-hover:text-indigo-500">
          {title}
        </h3>
        {description ? <p className="mt-2 flex-1 text-xs leading-6 text-[var(--site-muted)]">{description}</p> : null}
      </a>
    </SpotlightCard>
  );
}
