'use client';

import { useEffect } from 'react';

import BlurText from '@/components/react-bits/BlurText';
import ShinyText from '@/components/react-bits/ShinyText';
import { useSite } from '@/contexts/site-context';
import { blogDictionaries } from '@/lib/blog/i18n';

export default function BlogHero() {
  const { lang } = useSite();
  const dict = blogDictionaries[lang];

  // 让浏览器标题与描述跟随当前语言
  useEffect(() => {
    document.title = `${dict.title} — CODPEX`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', dict.description);
  }, [dict]);

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 pb-12 pt-36">
      <ShinyText
        text={dict.badge}
        speed={3.4}
        color="#4f46e5"
        shineColor="#312e81"
        className="text-xs font-semibold tracking-[0.3em]"
      />
      <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
        <BlurText text={dict.title} animateBy="letters" direction="top" trigger="load" />
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--site-muted)] sm:text-base">{dict.description}</p>
    </section>
  );
}
