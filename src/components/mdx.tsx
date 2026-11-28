import { Children, cloneElement, isValidElement, type ReactNode } from 'react';
import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';

import Callout from '@/components/docs/callout';
import CodeBlock from '@/components/docs/code-block';
import MdxCard from '@/components/docs/mdx-card';

type CodeElementProps = { className?: string; children?: ReactNode };

const LANGUAGE_CLASS = /(?:^|\s)language-([\w+#.-]+)(?:\s|$)/;
const ALERT_MARKER = /^\[!(info|note|tip|warning|warn|caution|danger|error|important)\]\s*/i;
const TREE_LANGUAGES = new Set(['text', 'txt', 'plaintext', 'tree']);

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

function codeLanguage(children: ReactNode): string | undefined {
  for (const child of Children.toArray(children)) {
    if (!isValidElement<CodeElementProps>(child)) continue;
    const match = LANGUAGE_CLASS.exec(child.props.className ?? '');
    if (match) return match[1];
  }
  return undefined;
}

// 支持 `> [!WARNING] ...` 形式的状态标记，去掉标记后交给 Callout 渲染。
// MDX 会在 <blockquote> 与 <p> 之间留下空白文本节点，因此不能只看第一个子节点。
function splitAlert(nodes: ReactNode[]): { type: string; children: ReactNode } | null {
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];

    if (typeof node === 'string') {
      const match = ALERT_MARKER.exec(node.trimStart());
      if (!match) continue;
      const leftover = node.trimStart().slice(match[0].length);
      return {
        type: match[1],
        children: [...nodes.slice(0, index), ...(leftover ? [leftover] : []), ...nodes.slice(index + 1)],
      };
    }

    if (!isValidElement<CodeElementProps>(node)) continue;
    const inner = Children.toArray(node.props.children);
    for (let j = 0; j < inner.length; j += 1) {
      const head = inner[j];
      if (typeof head !== 'string') break;
      const match = ALERT_MARKER.exec(head.trimStart());
      if (!match) continue;
      const leftover = head.trimStart().slice(match[0].length);
      const rest = leftover ? [leftover, ...inner.slice(j + 1)] : inner.slice(j + 1);
      return {
        type: match[1],
        children: [...nodes.slice(0, index), cloneElement(node, { children: rest }), ...nodes.slice(index + 1)],
      };
    }
  }

  return null;
}

// 用 ```text 写的目录结构树，交由 CodeBlock 的 tree 变体单独渲染。
function isStructureTree(children: ReactNode, language?: string): boolean {
  if (language && !TREE_LANGUAGES.has(language.toLowerCase())) return false;
  const text = textOf(children);
  return (text.match(/[├└]/g) ?? []).length >= 2;
}

function slugify(node: ReactNode): string | undefined {
  return (
    textOf(node)
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-|-$/g, '') || undefined
  );
}

type CardProps = {
  title?: string;
  href?: string;
  description?: string;
  icon?: ReactNode;
  badge?: string;
};

export function getMDXComponents(components?: MDXComponents) {
  return {
    h1: ({ children, ...props }) => (
      <h1 id={slugify(children)} className="mt-10 text-3xl font-bold tracking-tight text-[var(--site-fg)]" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        id={slugify(children)}
        className="mb-4 mt-12 border-b border-[var(--site-border)] pb-3 text-2xl font-semibold tracking-tight text-[var(--site-fg)]"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 id={slugify(children)} className="mb-3 mt-8 text-xl font-semibold text-[var(--site-fg)]" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="my-4 text-sm leading-7 text-[var(--site-muted)] sm:text-base" {...props}>
        {children}
      </p>
    ),
    a: ({ href = '#', children, ...props }) =>
      href.startsWith('/') ? (
        <Link
          href={href}
          className="font-medium text-[var(--site-link)] underline decoration-[var(--site-link)]/30 underline-offset-4 transition hover:opacity-80"
          {...props}
        >
          {children}
        </Link>
      ) : (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          className="font-medium text-[var(--site-link)] underline decoration-[var(--site-link)]/30 underline-offset-4 transition hover:opacity-80"
          {...props}
        >
          {children}
        </a>
      ),
    ul: ({ children, ...props }) => (
      <ul className="my-4 list-disc space-y-2 pl-6 text-sm leading-7 text-[var(--site-muted)]" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-4 list-decimal space-y-2 pl-6 text-sm leading-7 text-[var(--site-muted)]" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="marker:text-[var(--site-link)]" {...props}>
        {children}
      </li>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-[var(--site-fg)]" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="italic text-[var(--site-muted)]" {...props}>
        {children}
      </em>
    ),
    // 未标注状态的引用统一作为「信息」提醒，整体圆角。
    blockquote: ({ children }) => {
      const nodes = Children.toArray(children).filter(
        (node) => typeof node !== 'string' || node.trim().length > 0,
      );
      const alert = splitAlert(nodes);
      return <Callout type={alert?.type ?? 'info'}>{alert?.children ?? nodes}</Callout>;
    },
    hr: () => <hr className="my-10 border-[var(--site-border)]" />,
    table: ({ children, ...props }) => (
      <div className="my-6 overflow-x-auto rounded-2xl border border-[var(--site-border)]">
        <table className="w-full border-collapse text-left text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-[var(--site-hover)] text-xs uppercase tracking-wide" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th className="whitespace-nowrap px-4 py-3 font-semibold text-[var(--site-fg)]" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border-t border-[var(--site-border)] px-4 py-3 align-top text-[var(--site-muted)]" {...props}>
        {children}
      </td>
    ),
    tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
    // rehypeCode(Shiki) 输出带高亮 span 的 <pre>，这里只提取语言交给 CodeBlock，
    // 不再用行内 <pre> 样式覆盖 Shiki 的配色。
    pre: ({ children }) => {
      const language = codeLanguage(children);
      if (isStructureTree(children, language)) {
        return <CodeBlock variant="tree" code={textOf(children)} />;
      }
      return <CodeBlock language={language}>{children}</CodeBlock>;
    },
    code: ({ children, className, ...props }) =>
      LANGUAGE_CLASS.test(className ?? '') ? (
        // 块级 <code class="language-xxx"> 必须保持原样，行内代码样式会破坏语法高亮
        <code className={className} {...props}>
          {children}
        </code>
      ) : (
        <code
          className={`${className ?? ''} rounded bg-[var(--site-hover)] px-1.5 py-0.5 font-mono text-[0.9em] text-[var(--site-link)]`}
          {...props}
        >
          {children}
        </code>
      ),
    Callout,
    Cards: ({ children }: { children?: ReactNode }) => (
      <div className="my-8 grid gap-4 sm:grid-cols-2">{children}</div>
    ),
    Card: ({ title, href, description, icon, badge }: CardProps) => (
      <MdxCard title={title} href={href} description={description} icon={icon} badge={badge} />
    ),
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
