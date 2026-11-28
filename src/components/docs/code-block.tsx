import type { ReactNode } from 'react';
import {
  File,
  FileText,
  FolderOpen,
  FolderRoot,
  MoreHorizontal,
  type LucideIcon,
} from 'lucide-react';

import CodeCopyButton from '@/components/docs/code-copy-button';

type CodeBlockProps = {
  children?: ReactNode;
  language?: string;
  code?: string;
  variant?: 'code' | 'tree';
};

const LANGUAGE_LABELS: Record<string, string> = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  jsx: 'JSX',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  tsx: 'TSX',
  py: 'Python',
  python: 'Python',
  sh: 'Bash',
  bash: 'Bash',
  shell: 'Shell',
  zsh: 'Zsh',
  yml: 'YAML',
  yaml: 'YAML',
  md: 'Markdown',
  markdown: 'Markdown',
  json: 'JSON',
  jsonc: 'JSONC',
  json5: 'JSON5',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  diff: 'Diff',
  text: 'Text',
  plaintext: 'Text',
  txt: 'Text',
  ini: 'INI',
  toml: 'TOML',
  xml: 'XML',
  sql: 'SQL',
  go: 'Go',
  rust: 'Rust',
  rs: 'Rust',
  java: 'Java',
  c: 'C',
  cpp: 'C++',
  'c++': 'C++',
  cs: 'C#',
  'c#': 'C#',
  dockerfile: 'Dockerfile',
  docker: 'Dockerfile',
  powershell: 'PowerShell',
  ps1: 'PowerShell',
  bat: 'Batch',
  batch: 'Batch',
  gradle: 'Gradle',
  groovy: 'Groovy',
  kotlin: 'Kotlin',
  kt: 'Kotlin',
  http: 'HTTP',
  makefile: 'Makefile',
};

function languageLabel(language?: string): string {
  if (!language) return 'Text';
  return LANGUAGE_LABELS[language.toLowerCase()] ?? language;
}

// 在服务端把 Shiki 的高亮节点还原成纯文本，复制按钮无需等待 hydration 后读 DOM。
function plainText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(plainText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return plainText((node as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

type TreeRow = {
  guide: string;
  name: string;
  comment: string;
  kind: 'root' | 'dir' | 'file' | 'more';
};

const TREE_LINE = /^([\s│]*)([├└][─]+\s*)?(.*)$/;

function parseTree(source: string): TreeRow[] {
  return source
    .replace(/\r/g, '')
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const match = TREE_LINE.exec(line);
      const guide = `${match?.[1] ?? ''}${match?.[2] ?? ''}`;
      const rest = match?.[3] ?? line;
      const hashIndex = rest.search(/\s#/);
      const name = hashIndex >= 0 ? rest.slice(0, hashIndex) : rest;
      const comment = hashIndex >= 0 ? rest.slice(hashIndex) : '';
      const trimmed = name.trim();

      const kind: TreeRow['kind'] =
        trimmed === '.' || trimmed === './' || (!match?.[2] && /\/$/.test(trimmed))
          ? 'root'
          : /\/$/.test(trimmed)
            ? 'dir'
            : trimmed === '...'
              ? 'more'
              : 'file';

      return { guide, name, comment, kind };
    });
}

function treeIcon(row: TreeRow): LucideIcon {
  if (row.kind === 'root') return FolderRoot;
  if (row.kind === 'dir') return FolderOpen;
  if (row.kind === 'more') return MoreHorizontal;
  return /\.(md|txt|xml|json|ya?ml|log)$/i.test(row.name.trim()) ? FileText : File;
}

// 结构树不走 Shiki：单独解析层级连线、目录/文件图标与行内注释，保持等宽对齐。
function TreeView({ source }: { source: string }) {
  return (
    <span data-tree="" className="block min-w-max py-1 font-mono text-[13px] leading-7">
      {parseTree(source).map((row, index) => {
        const Icon = treeIcon(row);
        return (
          <span
            key={index}
            className="flex items-center gap-2 rounded-lg px-2 transition-colors hover:bg-[var(--site-hover)]"
          >
            <span className="whitespace-pre text-[var(--code-tree-line)]">{row.guide}</span>
            <Icon
              className={`h-3.5 w-3.5 flex-none ${
                row.kind === 'root' || row.kind === 'dir'
                  ? 'text-[var(--code-tree-dir)]'
                  : 'text-[var(--code-muted)]'
              }`}
            />
            <span
              className={`whitespace-pre ${
                row.kind === 'root'
                  ? 'font-semibold text-[var(--code-tree-dir)]'
                  : row.kind === 'dir'
                    ? 'font-medium text-[var(--code-tree-dir)]'
                    : row.kind === 'more'
                      ? 'text-[var(--code-muted)]'
                      : 'text-[var(--code-fg)]'
              }`}
            >
              {row.name}
            </span>
            {row.comment && <span className="whitespace-pre text-[var(--code-muted)]">{row.comment}</span>}
          </span>
        );
      })}
    </span>
  );
}

export default function CodeBlock({ children, language, code, variant = 'code' }: CodeBlockProps) {
  const label = variant === 'tree' ? 'Structure' : languageLabel(language);
  const text = (variant === 'tree' ? code ?? '' : plainText(children)).replace(/\n+$/, '');

  return (
    <div
      data-code-block=""
      className="group my-6 overflow-hidden rounded-2xl border border-[var(--code-border)] bg-[var(--code-bg)] shadow-[0_18px_40px_-32px_rgba(15,23,42,0.45)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--code-border)] bg-[var(--code-header)] px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--code-muted)]">{label}</span>
        <CodeCopyButton text={text} />
      </div>
      <div className="overflow-x-auto [scrollbar-width:thin]">
        <pre
          className={`min-w-full p-5 text-[13px] leading-6 ${
            variant === 'tree'
              ? 'font-mono text-[var(--code-fg)]'
              : 'shiki font-mono text-[var(--code-fg)] [&_code]:bg-transparent [&_code]:p-0 [&_code]:font-mono'
          }`}
        >
          {variant === 'tree' ? <TreeView source={code ?? ''} /> : children}
        </pre>
      </div>
    </div>
  );
}
