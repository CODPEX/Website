'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { appName, authorCardConfig, gitConfig } from '@/lib/shared';

const GITHUB_NAME_RE = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

function PersonAvatar({ name, size = 40 }: { name: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const isGithubName = GITHUB_NAME_RE.test(name);

  if (isGithubName && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`https://github.com/${name}.png?size=${size * 2}`}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setFailed(true)}
        className="flex-none rounded-full border border-[var(--site-border)] object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className="flex flex-none items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

function getAuthorGithubUrl(name: string) {
  if (GITHUB_NAME_RE.test(name)) return `https://github.com/${name}`;
  if (name === appName) return `https://github.com/${gitConfig.user}`;
  return null;
}

export default function AuthorCard({ name, role, size = 40 }: { name: string; role: string; size?: number }) {
  const href = authorCardConfig.linkToGithub ? getAuthorGithubUrl(name) : null;

  const body = (
    <>
      <span className="flex flex-none items-center justify-center rounded-full bg-white p-0.5 shadow-[0_2px_10px_-6px_rgba(0,0,0,0.45)]">
        <PersonAvatar name={name} size={size} />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="break-words text-sm font-semibold text-[var(--site-fg)] transition group-hover:text-indigo-500">
          {name}
        </span>
        <span className="text-xs text-[var(--site-muted)]">{role}</span>
      </span>
      {href && (
        <ArrowUpRight className="h-3.5 w-3.5 flex-none text-indigo-500 opacity-0 transition group-hover:opacity-100" />
      )}
    </>
  );

  if (!href) {
    return <span className="inline-flex items-center gap-3">{body}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={`GitHub · ${name}`}
      className="group inline-flex items-center gap-3 rounded-xl transition hover:opacity-90"
    >
      {body}
    </a>
  );
}
