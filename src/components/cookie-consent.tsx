'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, Cookie, X } from 'lucide-react';

import { useSite } from '@/contexts/site-context';
import { CONSENT_COOKIE, readCookie, writeCookie } from '@/lib/preferences';

// 等首屏揭幕结束后再出现，避免与加载动画叠加。
const SHOW_DELAY = 900;

type Consent = 'all' | 'essential';

export default function CookieConsent() {
  const { t } = useSite();
  const [visible, setVisible] = useState(false);

  const decide = useCallback((value: Consent) => {
    writeCookie(CONSENT_COOKIE, value);
    setVisible(false);
  }, []);

  useEffect(() => {
    if (readCookie(CONSENT_COOKIE)) return;
    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    // Esc 等同「仅必要」，避免提示反复出现
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') decide('essential');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible, decide]);

  if (!visible) return null;

  return (
    <div className="site-cookie-anchor">
      <div className="site-dialog-panel" role="dialog" aria-labelledby="cookie-consent-title">
        <div className="site-dialog-inner">
          <div className="flex items-start justify-between gap-4">
            <span className="site-dialog-eyebrow">{t('cookieEyebrow')}</span>
            <button
              type="button"
              onClick={() => decide('essential')}
              aria-label={t('close')}
              className="site-dialog-close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 flex items-start gap-3.5">
            <span className="site-dialog-badge">
              <Cookie className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2 id="cookie-consent-title" className="site-dialog-title">
                {t('cookieTitle')}
              </h2>
              <p className="site-dialog-desc mt-1.5">{t('cookieDesc')}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => decide('essential')}
              className="site-dialog-btn site-dialog-btn--ghost"
            >
              {t('cookieEssential')}
            </button>
            <button
              type="button"
              onClick={() => decide('all')}
              className="site-dialog-btn site-dialog-btn--primary"
            >
              {t('cookieAccept')}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
