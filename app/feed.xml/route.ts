import { getAllEntries } from '@/app/_lib/entries';

export const dynamic = 'force-static';

const SITE_URL = 'https://forest-of-logs.vercel.app';

export async function GET() {
  const entries = await getAllEntries();

  const items = entries
    .map(
      entry => `
    <item>
      <title><![CDATA[${entry.title}]]></title>
      <link>${SITE_URL}/${entry.slug}</link>
      <guid>${SITE_URL}/${entry.slug}</guid>
      <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
      <description><![CDATA[${entry.content.ko.slice(0, 200)}...]]></description>
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>로그의 숲 — Forest of Logs</title>
    <link>${SITE_URL}</link>
    <description>매일의 개발 세션을 하루키 문체로 기록하는 개발 일지</description>
    <language>ko</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
