export type FeaturedPost = {
  href: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  tag: string;
  date: string;
};

export const featuredPosts: FeaturedPost[] = [
  {
    href: '/blog/open-source-tools',
    title: '为什么要坚持开源工具',
    titleEn: 'Why We Build Open Source Tools',
    description: '开源不是一种营销方式，而是我们做软件的默认选择。',
    descriptionEn: 'Open source is not marketing — it is how we build software by default.',
    tag: '观点',
    date: '2026-10-18',
  },
  {
    href: '/blog/edge-first-architecture',
    title: '边缘优先架构的实践',
    titleEn: 'Practising an Edge-First Architecture',
    description: '把计算放到离用户更近的地方，会带来哪些真实收益。',
    descriptionEn: 'What changes when computation moves closer to the user.',
    tag: '工程',
    date: '2026-09-26',
  },
  {
    href: '/blog/building-simple-ssh',
    title: '构建 SimpleSSH 的三个决定',
    titleEn: 'Three Decisions Behind SimpleSSH',
    description: '一款 SSH 客户端背后的取舍。',
    descriptionEn: 'The trade-offs behind a modern SSH client.',
    tag: '产品',
    date: '2026-08-12',
  },
];
