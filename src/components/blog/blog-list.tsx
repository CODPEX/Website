'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, BookOpen, Clock, FileText, UserRound } from 'lucide-react';

import SpotlightCard from '@/components/react-bits/SpotlightCard';
import { useSite } from '@/contexts/site-context';
import { blogDictionaries, blogTagLabel, normalizeBlogTag } from '@/lib/blog/i18n';

export type BlogPost = {
  url: string;
  title: string;
  description?: string;
  tag?: string;
  date?: string;
  author: string;
  words: number;
  minutes: number;
};

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const { theme, isDark, lang } = useSite();
  const dict = blogDictionaries[lang];
  const [active, setActive] = useState('all');

  const tagKey = (tag?: string) => normalizeBlogTag(tag) ?? (tag ? `raw:${tag}` : 'other');

  const tags = useMemo(() => {
    const counts = new Map<string, { label: string; count: number }>();
    posts.forEach((post) => {
      const key = tagKey(post.tag);
      const label = blogTagLabel(dict, post.tag) || dict.all;
      const current = counts.get(key);
      counts.set(key, { label: current?.label ?? label, count: (current?.count ?? 0) + 1 });
    });
    return [
      { key: 'all', label: dict.all, count: posts.length },
      ...Array.from(counts.entries()).map(([key, value]) => ({ key, ...value })),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, dict]);

  const visible =
    active === 'all'
      ? posts
      : posts.filter((post) => tagKey(post.tag) === active);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {tags.map((tag) => {
          const selected = tag.key === active;
          return (
            <button
              key={tag.key}
              type="button"
              onClick={() => setActive(tag.key)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition ${
                selected
                  ? 'border-indigo-500 bg-indigo-500 text-white'
                  : isDark
                    ? 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-indigo-400'
                    : 'border-slate-200 bg-white/70 text-slate-600 hover:border-indigo-400'
              }`}
            >
              {tag.label}
              <span className={selected ? 'text-white/70' : 'text-[var(--site-subtle)]'}>{tag.count}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post, index) => (
          <motion.div
            key={post.url}
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
            className="h-full"
          >
            <a href={post.url} className="block h-full">
              <SpotlightCard
                theme={theme}
                spotlightColor={isDark ? 'rgba(129,140,248,0.22)' : 'rgba(79,70,229,0.16)'}
                intensity={0.8}
                spotlightSize={220}
                borderGlow={0.7}
                ambient
                className="flex h-full flex-col rounded-2xl p-6"
              >
                <div className="flex items-center justify-between gap-3 text-xs text-[var(--site-subtle)]">
                  <span className="rounded-full border border-[var(--site-border)] px-2.5 py-1 text-indigo-500">
                    {blogTagLabel(dict, post.tag)}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h2 className="mt-6 text-lg font-semibold text-[var(--site-fg)]">{post.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-[var(--site-muted)]">{post.description}</p>

                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[var(--site-subtle)]">
                  <span className="inline-flex items-center gap-1.5">
                    <UserRound className="h-3 w-3" />
                    {post.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="h-3 w-3" />
                    {post.words.toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US')} {dict.wordsUnit}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {post.minutes} {dict.readingTime}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-indigo-500">
                  <BookOpen className="h-3.5 w-3.5" /> {dict.readMore} <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </SpotlightCard>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
