import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';

import './global.css';
import { SiteProvider } from '@/contexts/site-context';
import CookieConsent from '@/components/cookie-consent';
import ExternalLinkGuard from '@/components/external-link-guard';
import Preloader from '@/components/preloader';
import {
  LANG_COOKIE,
  THEME_COOKIE,
  htmlLang,
  langFromPath,
  parseLang,
  parseTheme,
} from '@/lib/preferences';

export const metadata: Metadata = {
  metadataBase: new URL('https://codpex.top'),
  title: 'CODPEX',
  icons: { icon: '/favicon.svg' },
};

// 兜底：即使 HTML 来自缓存，也在首屏绘制前按 cookie 修正主题与语言。
const themeScript = `
(function () {
  try {
    var cookie = document.cookie || '';
    var theme = (cookie.match(/(?:^|; )codpex-theme=(dark|light)/) || [])[1];
    if (theme) document.documentElement.setAttribute('data-theme', theme);
    var pathLang = (location.pathname.match(/^\/(en|zh)(?:\/|$)/) || [])[1];
    var lang = pathLang || (cookie.match(/(?:^|; )codpex-lang=(en|zh)/) || [])[1];
    if (lang) document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    // 本次会话内再次进入、刷新、以及任何站内整页跳转：首帧直接显示内容，不播放加载动画
    var root = document.documentElement;
    var sameSite = false;
    try { sameSite = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch (e) {}
    try {
      var seen = sessionStorage.getItem('codpex-visited') === '1';
      sessionStorage.setItem('codpex-visited', '1');
      if (seen || sameSite) root.classList.add('app-loaded', 'preloader-skip');
    } catch (e) {}
    // 主脚本异常时的兜底：确保页面内容最终可见
    setTimeout(function () { root.classList.add('app-loaded'); }, 1200);
  } catch (e) {}
})();
`;

export default async function Layout({ children }: LayoutProps<'/'>) {
  // SSR 阶段就确定偏好，避免暗色主题首屏先渲染出浅色卡片。
  const cookieStore = await cookies();
  const headerStore = await headers();
  const theme = parseTheme(cookieStore.get(THEME_COOKIE)?.value);
  // URL 语言段优先于 Cookie，保证 /en/docs 的 <html lang> 与正文一致。
  const lang =
    langFromPath(headerStore.get('x-codpex-path') ?? '') ??
    parseLang(cookieStore.get(LANG_COOKIE)?.value);

  return (
    <html lang={htmlLang(lang)} data-theme={theme} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-[var(--site-bg)] text-[var(--site-fg)] antialiased">
        <div id="app-preloader" role="status" aria-live="polite" aria-label="Loading CODPEX">
          <div className="app-preloader__inner">
            <div className="app-preloader__logo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="CODPEX" className="site-logo app-preloader__logo" width={72} height={72} />
            </div>
            <div className="app-preloader__brand">CODPEX</div>
            <div className="app-preloader__bar" aria-hidden="true">
              <span className="app-preloader__fill" />
            </div>
            <div className="app-preloader__hint" aria-hidden="true" />
          </div>
          <div className="app-preloader__copyright">© 2023 - 2026 CODPEX. All rights reserved.</div>
        </div>

        <div id="app-content">
          <SiteProvider initialTheme={theme} initialLang={lang}>
            {children}
            <ExternalLinkGuard />
            <CookieConsent />
            <Preloader />
          </SiteProvider>
        </div>
      </body>
    </html>
  );
}
