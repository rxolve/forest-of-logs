import type { Metadata } from 'next';

import type { EntryMeta } from '@/app/_types/entry';

const SITE_URL = 'https://forest-of-logs.vercel.app';

export function generateEntryMetadata(entry: EntryMeta): Metadata {
  return {
    title: entry.title,
    description: `${entry.date} — ${entry.project}`,
    openGraph: {
      title: entry.title,
      description: `${entry.date} — ${entry.project}`,
      type: 'article',
      url: `${SITE_URL}/${entry.date}`,
      siteName: '로그의 숲 — Forest of Logs',
    },
  };
}
