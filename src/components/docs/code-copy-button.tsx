'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

import { useSite } from '@/contexts/site-context';

async function writeClipboard(value: string) {
  if (window.isSecureContext && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  // 非安全上下文 / 无 Clipboard API 时的兜底
  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const ok = (document as Document & { execCommand(command: string): boolean }).execCommand('copy');
  textarea.remove();
  if (!ok) throw new Error('Clipboard unavailable');
}

export default function CodeCopyButton({ text }: { text: string }) {
  const { t } = useSite();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const timer = window.setTimeout(() => setState('idle'), 2000);
    return () => window.clearTimeout(timer);
  }, [state]);

  const copy = useCallback(async () => {
    const fallback = buttonRef.current?.closest('[data-code-block]')?.querySelector('pre')?.textContent ?? '';
    try {
      await writeClipboard((text || fallback).replace(/\n+$/, ''));
      setState('copied');
    } catch {
      setState('failed');
    }
  }, [text]);

  const label = state === 'copied' ? t('copiedCode') : t('copyCode');

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={copy}
      aria-label={label}
      title={label}
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium transition hover:bg-[var(--site-hover)] ${
        state === 'failed' ? 'text-rose-500' : 'text-[var(--code-muted)] hover:text-[var(--code-fg)]'
      }`}
    >
      {state === 'copied' ? (
        <Check className="h-3.5 w-3.5 text-emerald-500" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {label}
    </button>
  );
}
