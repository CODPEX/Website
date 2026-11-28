import type { Folder, Node, Root } from 'fumadocs-core/page-tree';

export type SidebarItem = {
  id: string;
  title: string;
  description?: string;
  url: string;
};

export type SidebarGroup = {
  key: string;
  label: string;
  items: SidebarItem[];
};

function toText(value: unknown): string {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : '';
}

function folderKey(folder: Folder): string {
  const ref = folder.$ref?.folder;
  if (ref) {
    const segments = ref.split('/').filter(Boolean);
    if (segments.length > 0) return segments[segments.length - 1];
  }
  return toText(folder.name).toLowerCase().replace(/\s+/g, '-') || 'guide';
}

/**
 * 从 Fumadocs 的 page tree（由 meta.json 生成）提取侧栏数据。
 *
 * 官方侧栏以 source.getPageTree(locale) 为数据源，这里仅把它转成可跨 RSC
 * 边界传递的纯数据（tree 中的 name/icon/description 可能是 ReactNode）。
 * 分组与顺序完全由 meta.json 决定，不再依赖 URL 字符串解析。
 */
export function buildSidebarGroups(tree: Root): SidebarGroup[] {
  const groups = new Map<string, SidebarGroup>();
  const rootGroup = { key: 'guide', label: '' };

  const visit = (nodes: Node[], current: { key: string; label: string }) => {
    for (const node of nodes) {
      if (node.type === 'page') {
        const group = groups.get(current.key) ?? { ...current, items: [] };
        group.items.push({
          id: node.url,
          title: toText(node.name) || node.url,
          description: toText(node.description) || undefined,
          url: node.url,
        });
        groups.set(current.key, group);
      } else if (node.type === 'folder') {
        // 仅容器的文件夹（如 products）不单独成组，沿用上层分组
        const hasDirectPages = node.children.some((child) => child.type === 'page');
        const next = hasDirectPages
          ? { key: folderKey(node), label: toText(node.name) || folderKey(node) }
          : current;
        visit(node.children, next);
      }
    }
  };

  visit(tree.children, rootGroup);
  return Array.from(groups.values());
}
