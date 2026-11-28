'use client';

import { ArrowLeft, CalendarDays, Clock, FileText, History } from 'lucide-react';

import AuthorCard from '@/components/author-card';
import { useSite } from '@/contexts/site-context';
import { blogDictionaries } from '@/lib/blog/i18n';

export function BlogBackLink() {
  const { lang } = useSite();

  return (
    <a
      href="/blog"
      className="inline-flex items-center gap-2 text-xs text-[var(--site-muted)] transition hover:text-[var(--site-fg)]"
    >
      <ArrowLeft className="h-3.5 w-3.5" /> {blogDictionaries[lang].backToBlog}
    </a>
  );
}

export default function BlogPostMeta({
  author,
  date,
  modified,
  words,
  minutes,
}: {
  author: string;
  date?: string;
  modified?: string | null;
  words: number;
  minutes: number;
}) {
  const { lang } = useSite();
  const dict = blogDictionaries[lang];
  const number = words.toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US');
  const modifiedDate = modified
    ? new Date(modified).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
      })
    : null;

  return (
    <div className="mt-5">
      <AuthorCard name={author} role={dict.by} />

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--site-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5" />
          {number} {dict.wordsUnit}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {minutes} {dict.readingTime}
        </span>
        {date && (
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {date}
          </span>
        )}
        {modifiedDate && (
          <span className="inline-flex items-center gap-1.5">
            <History className="h-3.5 w-3.5" />
            {dict.updated}：{modifiedDate}
          </span>
        )}
      </div>
    </div>
  );
}
