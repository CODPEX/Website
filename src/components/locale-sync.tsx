'use client';

import { useEffect } from 'react';

import { useSite, type Lang } from '@/contexts/site-context';

/**
 * 将 URL 中的语言段同步到站点上下文，
 * 使 /en/docs、/zh/docs 的 UI 文案跟随路径语言，并把该语言写回 Cookie 保持。
 */
export default function LocaleSync({ lang }: { lang: Lang }) {
  const { setLang } = useSite();

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  return null;
}
