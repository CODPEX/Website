import { source } from '@/lib/source';
import { buildSidebarGroups } from '@/lib/docs-sidebar';
import DocsShell from '@/components/docs/docs-shell';

export default async function Layout({ children, params }: LayoutProps<'/[lang]/docs'>) {
  const { lang } = await params;

  // 官方 i18n page tree：按 locale 读取 meta.json 定义的文档列表、顺序与分组，
  // 缺失的翻译会由 Fumadocs 自动回退到默认语言，无需手工补齐。
  const groups = buildSidebarGroups(source.getPageTree(lang));

  return (
    <DocsShell groups={groups} locale={lang}>
      {children}
    </DocsShell>
  );
}
