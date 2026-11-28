export type Lang = 'zh' | 'en';
export type Theme = 'light' | 'dark';

export const THEME_COOKIE = 'codpex-theme';
export const LANG_COOKIE = 'codpex-lang';
export const CONSENT_COOKIE = 'codpex-cookie-consent';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const DEFAULT_THEME: Theme = 'light';
export const DEFAULT_LANG: Lang = 'zh';

export function parseTheme(value: string | null | undefined): Theme {
  return value === 'dark' || value === 'light' ? value : DEFAULT_THEME;
}

export function parseLang(value: string | null | undefined): Lang {
  return value === 'zh' || value === 'en' ? value : DEFAULT_LANG;
}

export function htmlLang(lang: Lang): string {
  return lang === 'zh' ? 'zh-CN' : 'en';
}

/** URL 中的语言段优先级最高，保证文档正文语言与界面语言一致。 */
export function langFromPath(path: string): Lang | null {
  const match = path.match(/^\/(en|zh)(?:\/|$)/);
  return match ? (match[1] as Lang) : null;
}

export function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

export function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${COOKIE_MAX_AGE};samesite=lax`;
}
