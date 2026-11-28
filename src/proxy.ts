import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { docsRoute } from '@/lib/shared';

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `/llms.mdx${docsRoute}{/*path}.md`,
);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // root layout 需要知道当前路径，才能在 SSR 阶段正确设置 <html lang>。
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-codpex-path', pathname);

  // files like `/docs/page.md` are served by the rewrites of the Next.js config
  const result =
    isMarkdownPreferred(request) && !/\.(md|txt)$/.test(pathname) && rewriteDocs(pathname);

  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl), {
      request: { headers: requestHeaders },
      // this URL has two representations, selected by `Accept`
      headers: { Vary: 'Accept' },
    });
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}
