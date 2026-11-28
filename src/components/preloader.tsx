'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// 首次入站仅做极短的揭幕；页面内容本身由 SSG HTML 立即可见。
const MIN_SPLASH = 240;
const MAX_SPLASH = 600;

/**
 * 遮罩由 root layout 静态输出，只在「本次会话首次入站」短暂出现。
 * 站内客户端导航通过 pathname 变化立即揭幕；整页站内跳转 / 刷新由
 * layout 的首屏脚本添加 .preloader-skip，首帧就不渲染遮罩。
 */
export default function Preloader() {
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  useEffect(() => {
    const root = document.documentElement;
    const element = document.getElementById('app-preloader');

    const reveal = () => {
      if (element) element.dataset.done = 'true';
      root.classList.add('app-loaded');
    };

    // 站内导航：不等待、不淡出，直接保持内容可见
    if (pathname !== lastPath.current) {
      lastPath.current = pathname;
      root.classList.add('preloader-skip');
      reveal();
      return;
    }

    // 整页站内跳转 / 刷新：首屏脚本已跳过遮罩
    if (root.classList.contains('preloader-skip')) {
      reveal();
      return;
    }

    if (!element || element.dataset.done === 'true') {
      reveal();
      return;
    }

    let finished = false;
    let innerFrame = 0;
    let revealTimer = 0;
    const startedAt = performance.now();

    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, MIN_SPLASH - (performance.now() - startedAt));
      revealTimer = window.setTimeout(reveal, wait);
    };

    const outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(finish);
    });
    const fallback = window.setTimeout(finish, MAX_SPLASH);

    // 从 bfcache 恢复时同样跳过动画
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      finished = true;
      reveal();
    };
    window.addEventListener('pageshow', onPageShow);

    return () => {
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
      window.clearTimeout(fallback);
      window.clearTimeout(revealTimer);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [pathname]);

  return null;
}
