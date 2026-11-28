'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, Check, ExternalLink, ShieldAlert, X } from 'lucide-react';

import { useSite } from '@/contexts/site-context';

type PendingLink = {
  url: string;
  hostname: string;
  newTab: boolean;
};

const SKIP_KEY = 'codpex-external-link-skip';
const SITE_HOST = 'codpex.top';

function readSkip() {
  try {
    return sessionStorage.getItem(SKIP_KEY) === '1';
  } catch {
    return false;
  }
}

function writeSkip() {
  try {
    sessionStorage.setItem(SKIP_KEY, '1');
  } catch {
    // sessionStorage unavailable
  }
}

function getExternalUrl(anchor: HTMLAnchorElement): URL | null {
  const href = anchor.getAttribute('href');
  if (!href || anchor.hasAttribute('download') || anchor.dataset.externalGuard === 'off') return null;

  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return null;
  }

  if (!/^https?:$/.test(url.protocol)) return null;

  const currentHost = window.location.hostname;
  const isSameHost = url.hostname === currentHost;
  const isOwnDomain = url.hostname === SITE_HOST || url.hostname.endsWith(`.${SITE_HOST}`);
  if (isSameHost || isOwnDomain) return null;

  return url;
}

export default function ExternalLinkGuard() {
  const { t } = useSite();
  const [pending, setPending] = useState<PendingLink | null>(null);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!anchor) return;

      const url = getExternalUrl(anchor);
      if (!url || readSkip()) return;

      event.preventDefault();
      setRemember(false);
      setPending({
        url: url.href,
        hostname: url.hostname,
        newTab: anchor.target === '_blank',
      });
    };

    // 捕获阶段拦截，确保先于 React 的冒泡事件处理
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    if (!pending) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPending(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [pending]);

  const close = useCallback(() => setPending(null), []);

  const proceed = () => {
    if (!pending) return;
    if (remember) writeSkip();

    if (pending.newTab) {
      window.open(pending.url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.assign(pending.url);
    }
    setPending(null);
  };

  if (!pending) return null;

  return (
    <div className="site-dialog-backdrop" onClick={close} role="presentation">
      <div
        className="site-dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="external-link-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="site-dialog-inner">
          <div className="flex items-start justify-between gap-4">
            <span className="site-dialog-eyebrow">{t('externalLinkEyebrow')}</span>
            <button type="button" onClick={close} aria-label={t('close')} className="site-dialog-close">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 flex items-start gap-3.5">
            <span className="site-dialog-badge">
              <ShieldAlert className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2 id="external-link-title" className="site-dialog-title">
                {t('externalLinkTitle')}
              </h2>
              <p className="site-dialog-desc mt-1.5">{t('externalLinkDesc')}</p>
            </div>
          </div>

          <div className="site-dialog-inset mt-5">
            <div className="flex items-center gap-2 text-[11px] font-medium text-[var(--site-subtle)]">
              <ExternalLink className="h-3.5 w-3.5" />
              {t('externalLinkDestination')}
            </div>
            <div className="mt-1.5 truncate text-sm font-semibold text-[var(--site-link)]">{pending.hostname}</div>
            <div className="mt-1 truncate text-[11px] leading-5 text-[var(--site-muted)]" title={pending.url}>
              {pending.url}
            </div>
          </div>

          <label className="relative mt-4 flex cursor-pointer items-center gap-2 text-[11px] text-[var(--site-muted)]">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="site-dialog-toggle"
            />
            <span className="site-dialog-checkbox" aria-hidden="true">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {t('externalLinkRemember')}
          </label>

          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={close} autoFocus className="site-dialog-btn site-dialog-btn--ghost">
              {t('externalLinkStay')}
            </button>
            <button type="button" onClick={proceed} className="site-dialog-btn site-dialog-btn--primary">
              {t('externalLinkContinue')}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
