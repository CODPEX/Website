import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://codpex.top'),
  title: 'CODPEX — 从灵感的源头到执行的巅峰',
  description:
    'CODPEX 是一支充满热情的团队，致力于构建开源工具与软件，赋能全球的开发者与创作者。',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return children;
}
