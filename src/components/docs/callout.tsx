'use client';

import type { ReactNode } from 'react';
import { Info, OctagonAlert, TriangleAlert, type LucideIcon } from 'lucide-react';

import { useSite } from '@/contexts/site-context';

type CalloutKind = 'info' | 'warning' | 'danger';

const ALIASES: Record<string, CalloutKind> = {
  info: 'info',
  note: 'info',
  tip: 'info',
  hint: 'info',
  warning: 'warning',
  warn: 'warning',
  caution: 'warning',
  danger: 'danger',
  error: 'danger',
  important: 'danger',
};

const CONFIG: Record<
  CalloutKind,
  { Icon: LucideIcon; label: 'calloutInfo' | 'calloutWarning' | 'calloutDanger' }
> = {
  info: { Icon: Info, label: 'calloutInfo' },
  warning: { Icon: TriangleAlert, label: 'calloutWarning' },
  danger: { Icon: OctagonAlert, label: 'calloutDanger' },
};

export default function Callout({
  type,
  title,
  children,
}: {
  type?: string;
  title?: string;
  children?: ReactNode;
}) {
  const { t } = useSite();
  const kind = ALIASES[(type ?? '').toLowerCase()] ?? 'info';
  const { Icon, label } = CONFIG[kind];

  return (
    <div
      role="note"
      data-type={kind}
      className="callout relative my-6 overflow-hidden rounded-2xl border border-[var(--site-border)] bg-[var(--site-hover)] px-5 py-4"
    >
      <div className="callout__head flex items-center gap-2">
        <Icon className="h-4 w-4 flex-none" strokeWidth={2.1} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">{title ?? t(label)}</span>
      </div>
      <div className="callout__body mt-2 text-sm leading-7 text-[var(--site-fg)]">{children}</div>
    </div>
  );
}
