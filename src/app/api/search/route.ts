import { source } from '@/lib/source';

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('query')?.trim().toLowerCase() ?? '';
  const pages = source.getPages().map((page) => ({
    title: page.data.title,
    description: page.data.description ?? '',
    url: page.url,
  }));

  const data = query
    ? pages.filter((page) => `${page.title} ${page.description}`.toLowerCase().includes(query))
    : pages;

  return Response.json({ data });
}
