import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';

import { source } from '@/lib/source';
import { getPageImageUrl } from '@/lib/shared';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  let fonts: { name: string; data: ArrayBuffer; weight: 400 | 700; style: 'normal' }[] = [];
  try {
    const fontBuffer = await readFile(join(process.cwd(), 'public/fonts/HarmonyOS_Sans_Regular.ttf'));
    const fontData = fontBuffer.buffer.slice(
      fontBuffer.byteOffset,
      fontBuffer.byteOffset + fontBuffer.byteLength,
    ) as ArrayBuffer;
    fonts = [
      { name: 'HarmonyOS', data: fontData, weight: 400, style: 'normal' },
      { name: 'HarmonyOS', data: fontData, weight: 700, style: 'normal' },
    ];
  } catch {
    // 字体资源缺失时回退到内置字体
  }

  const ascii = (value?: string) => (value && /^[\x00-\x7F]+$/.test(value) ? value : undefined);
  const title = ascii(page.data.title) ?? page.url;
  const description = ascii(page.data.description) ?? 'CODPEX Documentation';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #0b1024 0%, #160b26 55%, #05060b 100%)',
          color: '#ffffff',
          fontFamily: fonts.length > 0 ? 'HarmonyOS' : 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 28, letterSpacing: 2 }}>
          <div
            style={{
              display: 'flex',
              width: 46,
              height: 46,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              background: 'linear-gradient(135deg, #6366f1, #d946ef)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            C
          </div>
          CODPEX
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: '#c7d2fe', lineHeight: 1.4 }}>
            {description}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 22, color: '#818cf8', letterSpacing: 4 }}>DOCUMENTATION</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      ...(fonts.length > 0 ? { fonts } : {}),
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImageUrl(page).segments,
  }));
}
