'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
  LANG_COOKIE,
  THEME_COOKIE,
  htmlLang,
  langFromPath,
  readCookie,
  writeCookie,
  type Lang,
  type Theme,
} from '@/lib/preferences';

export type { Lang, Theme } from '@/lib/preferences';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const zh = {
  brand: 'CODPEX',
  footerTagline: 'Unleash your creativity, software shapes the future.',
  docs: '文档',
  blog: '博客',
  github: 'GitHub',
  backHome: '返回官网',
  returnSite: '返回官网',
  generalDocs: '通用文档',
  backToDocs: '返回文档中心',
  previousDoc: '上一篇',
  nextDoc: '下一篇',
  searchDocs: '搜索文档...',
  documentation: 'DOCUMENTATION',
  allDocs: '全部文档',
  onThisPage: 'ON THIS PAGE',
  themeLabel: '切换明暗主题',
  languageLabel: '切换语言',
  badge: 'CODPEX · OPEN SOURCE',
  heroLine1: '从灵感的源头',
  heroLine2: '到执行的巅峰',
  heroEnglish: 'From the source of an idea to the summit of execution.',
  heroSlogan1: 'From the source of an idea',
  heroSlogan2: 'to the summit of execution.',
  weBuild: '我们打造',
  heroDesc1: '站在技术前沿，创造无限可能。',
  heroDesc2: '我们是一支充满热情的团队，致力于构建开源工具与软件，赋能全球的开发者与创作者。',
  btnProducts: '了解产品',
  btnContact: '保持联系',
  statSince: '始于',
  statProjects: '开源项目',
  statProducts: '产品线',
  statOpen: '开源精神',
  featuresBadge: 'KEY FEATURES',
  featuresTitle: '为何选择我们的产品',
  featuresDesc: '专为开发者体验和性能而打造。',
  f1Label: '性能',
  f1Title: '高速',
  f1Desc: '优化的代码库，实现快速加载和平滑交互。',
  f2Label: '设计',
  f2Title: '响应式',
  f2Desc: '完美适配任何屏幕尺寸，提供无缝用户体验。',
  f3Label: '界面',
  f3Title: '现代 UI',
  f3Desc: '简洁、极简的设计，辅以微妙的动画和过渡效果。',
  f4Label: '兼容性',
  f4Title: '跨平台',
  f4Desc: '在所有现代浏览器和设备上无缝运行。',
  ready: '开箱即用',
  productsBadge: 'OUR PRODUCTS',
  productsTitle: '探索我们的最新项目',
  productsDesc: '从认证 API 到 AI 助手，每一件产品都源于真实问题。',
  prod1: 'A-Login API · 安全登录与用户管理',
  prod2: 'SimpleSSH · 优雅的云服务器连接体验',
  prod3: 'S-AI Music · 随天气变化的智能音乐',
  productDocs: '产品文档',
  aboutBadge: 'ABOUT CODPEX',
  aboutTitle1: '从灵感的源头',
  aboutTitle2: '到执行的巅峰。',
  aboutDesc: '我们是一支充满热情的团队，致力于构建开源工具与软件，赋能全球的开发者与创作者。',
  mission: '在 CODPEX，我们相信开源与协作的力量。我们的使命是创造高质量、易用的工具来解决实际问题——从身份验证 API 到 AI 驱动的开发助手。',
  value1: '高性能',
  value2: '安全优先',
  value3: '开源',
  value4: '跨平台',
  contactBadge: 'KEEP IN TOUCH',
  contactTitle1: '不要落后，快来',
  contactTitle2: '跟上',
  contactDesc: '告诉我们您对我们产品的看法，以及您希望在未来看到什么。',
  contactWarning: '接收表单因被机器人滥用已关闭，请通过邮件或 GitHub 联系我们。',
  copyright: '© 2023 - 2026 CODPEX. All rights reserved.',
  docsBadge: 'CODPEX / DOCUMENTATION',
  docsBack: '返回官网',
  docsCenter: '文档中心',
  docsMenu: '文档菜单',
  close: '关闭',
  menu: '菜单',
  brandShort: 'CODPEX',
  copyCode: '复制代码',
  copiedCode: '已复制',
  licenseTitle: '版权许可',
  viewLicense: '查看许可',
  originalUrl: '原文链接',
  comments: '评论',
  manageOnGithub: '在 GitHub 上管理',
  commentsHint: '评论由 GitHub Discussions 提供支持。',
  commentsSetupTitle: '评论功能尚未配置',
  commentsSetupHint: '当前项目尚未接入评论系统，请先配置 giscus 后再访问。',
  externalLinkStay: '留在本站',
  externalLinkTitle: '即将离开本站',
  externalLinkDesc: '您即将访问的外部链接内容不由 CODPEX 控制，请注意安全。',
  externalLinkContinue: '继续访问',
  externalWork: '外部项目',
  docAuthors: '作者',
  docContributors: '贡献者',
  lastUpdated: '最后更新',
  publishedAt: '发布于',
  wordsUnit: '字',
  readingTime: '分钟阅读',
  editOnGitHub: '在 GitHub 上编辑',
  linkCopied: '链接已复制',
  shareLink: '分享链接',
  calloutInfo: '信息',
  calloutWarning: '警告',
  calloutDanger: '危险',
  externalLinkEyebrow: '安全提示',
  externalLinkDestination: '目标站点',
  externalLinkRemember: '本次会话不再提示',
  cookieEyebrow: '隐私偏好',
  cookieTitle: 'Cookie 使用提示',
  cookieDesc: '我们使用少量 Cookie 记住明暗主题与语言偏好，让每次访问保持一致体验。你可以选择仅保留必要 Cookie。',
  cookieEssential: '仅必要',
  cookieAccept: '接受全部',
} as const;

type Dict = { [K in keyof typeof zh]: string };

const en: Dict = {
  brand: 'CODPEX',
  footerTagline: 'Unleash your creativity, software shapes the future.',
  docs: 'Docs',
  blog: 'Blog',
  github: 'GitHub',
  backHome: 'Back to site',
  returnSite: 'Back to site',
  generalDocs: 'General',
  backToDocs: 'Back to docs center',
  previousDoc: 'Previous',
  nextDoc: 'Next',
  searchDocs: 'Search docs...',
  documentation: 'DOCUMENTATION',
  allDocs: 'All docs',
  onThisPage: 'ON THIS PAGE',
  themeLabel: 'Toggle light and dark theme',
  languageLabel: 'Switch language',
  badge: 'CODPEX · OPEN SOURCE',
  heroLine1: 'From the source of an idea',
  heroLine2: 'to the summit of execution.',
  heroEnglish: 'From the source of an idea to the summit of execution.',
  heroSlogan1: 'From the source of an idea',
  heroSlogan2: 'to the summit of execution.',
  weBuild: 'We build',
  heroDesc1: 'Make dream happen! At the forefront of technology, create limitless possibilities.',
  heroDesc2: 'We are a passionate team building open-source tools and software that empower developers and creators around the world.',
  btnProducts: 'Learn about products',
  btnContact: 'Keep in touch',
  statSince: 'Since',
  statProjects: 'Open projects',
  statProducts: 'Product lines',
  statOpen: 'Open source',
  featuresBadge: 'KEY FEATURES',
  featuresTitle: 'Why Choose Our Products',
  featuresDesc: 'Built with developer experience and performance in mind.',
  f1Label: 'Performance',
  f1Title: 'High Speed',
  f1Desc: 'Optimized codebase for fast loading times and smooth interactions.',
  f2Label: 'Design',
  f2Title: 'Responsive',
  f2Desc: 'Perfectly adapts to any screen size for seamless user experience.',
  f3Label: 'Interface',
  f3Title: 'Modern UI',
  f3Desc: 'Clean, minimalist design with subtle animations and transitions.',
  f4Label: 'Compatibility',
  f4Title: 'Cross Platform',
  f4Desc: 'Works seamlessly across all modern browsers and devices.',
  ready: 'Ready to use',
  productsBadge: 'OUR PRODUCTS',
  productsTitle: 'Featured Products',
  productsDesc: 'Explore our latest projects and solutions, from auth APIs to AI assistants.',
  prod1: 'A-Login API · Secure login and user management',
  prod2: 'SimpleSSH · Elegant cloud server connections',
  prod3: 'S-AI Music · Smart weather-adaptive music',
  productDocs: 'Documentation',
  aboutBadge: 'ABOUT CODPEX',
  aboutTitle1: 'From the source of an idea',
  aboutTitle2: 'to the summit of execution.',
  aboutDesc: 'We are a passionate team building open-source tools and software that empower developers and creators around the world.',
  mission: 'At CODPEX, we believe in the power of open-source and collaboration. Our mission is to create high-quality, accessible tools that solve real problems — from authentication APIs to AI-powered development assistants.',
  value1: 'High Performance',
  value2: 'Security First',
  value3: 'Open Source',
  value4: 'Cross Platform',
  contactBadge: 'KEEP IN TOUCH',
  contactTitle1: "Don't fall behind, hurry up and",
  contactTitle2: 'catch up',
  contactDesc: 'Tell us your views about our products and what things you want to see in the future.',
  contactWarning: 'The receipt form was shut down due to bot abuse. Please reach us by email or GitHub.',
  copyright: '© 2023 - 2026 CODPEX. All rights reserved.',
  docsBadge: 'CODPEX / DOCUMENTATION',
  docsBack: 'Back to site',
  docsCenter: 'Docs Center',
  docsMenu: 'Docs menu',
  close: 'Close',
  menu: 'Menu',
  brandShort: 'CODPEX',
  copyCode: 'Copy code',
  copiedCode: 'Copied',
  licenseTitle: 'License',
  viewLicense: 'View license',
  originalUrl: 'Original URL',
  comments: 'Comments',
  manageOnGithub: 'Manage on GitHub',
  commentsHint: 'Comments are powered by GitHub Discussions.',
  commentsSetupTitle: 'Comments are not configured',
  commentsSetupHint: 'This project has not integrated a comment system yet. Please configure giscus first.',
  externalLinkStay: 'Stay here',
  externalLinkTitle: 'You are leaving this site',
  externalLinkDesc: 'You are about to visit an external link not controlled by CODPEX. Please proceed with caution.',
  externalLinkContinue: 'Continue',
  externalWork: 'External work',
  docAuthors: 'Author',
  docContributors: 'Contributor',
  lastUpdated: 'Last updated',
  publishedAt: 'Published',
  wordsUnit: 'words',
  readingTime: 'min read',
  editOnGitHub: 'Edit on GitHub',
  linkCopied: 'Link copied',
  shareLink: 'Share link',
  calloutInfo: 'Info',
  calloutWarning: 'Warning',
  calloutDanger: 'Danger',
  externalLinkEyebrow: 'Security notice',
  externalLinkDestination: 'Destination',
  externalLinkRemember: "Don't ask again this session",
  cookieEyebrow: 'Privacy',
  cookieTitle: 'Cookie notice',
  cookieDesc:
    'We use a few cookies to remember your theme and language so every visit feels consistent. You can choose to keep only essential cookies.',
  cookieEssential: 'Essential only',
  cookieAccept: 'Accept all',
};

const dictionaries: Record<Lang, Dict> = { zh, en };

type SiteContextValue = {
  lang: Lang;
  theme: Theme;
  isDark: boolean;
  t: (key: keyof Dict) => string;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  toggleTheme: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({
  children,
  initialTheme,
  initialLang,
}: {
  children: ReactNode;
  initialTheme: Theme;
  initialLang: Lang;
}) {
  const router = useRouter();
  const pathname = usePathname() ?? '/';

  // 服务端已从 Cookie 读取偏好，SSR 首帧即为正确主题，暗色加载不会再闪出浅色卡片。
  // URL 语言段优先级最高，保证 /en/docs 的界面与正文同为英文。
  const [lang, setLangState] = useState<Lang>(() => langFromPath(pathname) ?? initialLang);
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const setLang = useCallback((next: Lang) => setLangState(next), []);

  // 防御性纠正：若 HTML 来自缓存且携带了旧偏好，在首次绘制前以 Cookie 为准。
  // 正常路径下 Cookie 与 SSR 值一致，此处为空操作。
  useIsomorphicLayoutEffect(() => {
    const savedTheme = readCookie(THEME_COOKIE);
    if ((savedTheme === 'dark' || savedTheme === 'light') && savedTheme !== initialTheme) {
      setTheme(savedTheme);
    }

    if (!langFromPath(pathname)) {
      const savedLang = readCookie(LANG_COOKIE);
      if ((savedLang === 'zh' || savedLang === 'en') && savedLang !== initialLang) {
        setLangState(savedLang);
      }
    }
    // 仅挂载时执行一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 客户端导航后始终以 URL 语言为准
  useEffect(() => {
    const fromPath = langFromPath(pathname);
    if (fromPath) setLangState(fromPath);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writeCookie(THEME_COOKIE, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = htmlLang(lang);
    writeCookie(LANG_COOKIE, lang);
  }, [lang]);

  const toggleLang = () => {
    const next: Lang = lang === 'zh' ? 'en' : 'zh';
    setLangState(next);
    writeCookie(LANG_COOKIE, next);

    // 文档页切换语言必须跳转到对应语言版本，否则只换界面不换正文
    const localized = pathname.match(/^\/(?:en|zh)(\/.*)?$/);
    if (localized) {
      const rest = localized[1] ?? '';
      router.push(rest && rest !== '/' ? `/${next}${rest}` : `/${next}/docs`);
      return;
    }
    const unprefixed = pathname.match(/^\/docs(\/.*)?$/);
    if (unprefixed) router.push(`/${next}/docs${unprefixed[1] ?? ''}`);
  };

  const toggleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    const root = document.documentElement;

    // 切换瞬间禁用过渡，避免颜色渐变过程中露出亮色
    root.classList.add('theme-switching');
    root.dataset.theme = next;
    writeCookie(THEME_COOKIE, next);
    setTheme(next);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => root.classList.remove('theme-switching'));
    });
  };

  const value: SiteContextValue = {
    lang,
    theme,
    isDark: theme === 'dark',
    t: (key) => dictionaries[lang][key],
    setLang,
    toggleLang,
    toggleTheme,
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within SiteProvider');
  return context;
}
