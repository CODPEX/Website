import type { ReactNode } from 'react';

import LocaleSync from '@/components/locale-sync';
import type { Lang } from '@/contexts/site-context';

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Lang = lang === 'zh' ? 'zh' : 'en';

  return (
    <>
      <LocaleSync lang={locale} />
      {children}
    </>
  );
}
