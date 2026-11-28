'use client';

import { useSite } from '@/contexts/site-context';

export default function SiteCopyright() {
  const { t } = useSite();

  return (
    <div className="pointer-events-none fixed bottom-4 right-6 z-20 flex items-center gap-2 rounded-lg border border-[var(--site-border)] bg-[var(--site-card)] px-3 py-1.5 text-right text-[11px] text-[var(--site-muted)] backdrop-blur">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="CODPEX" className="site-logo h-3.5 w-3.5 flex-none" />
      {t('copyright')}
    </div>
  );
}
