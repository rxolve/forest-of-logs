import type { Metadata } from 'next';

import type { EntryMeta } from '@/app/_types/entry';

const SITE_URL = 'https://rxolve.github.io';

export function generateEntryMetadata(entry: EntryMeta): Metadata {
  const url = `${SITE_URL}/${entry.date}`;

  return {
    title: entry.title,
    description: `${entry.date} — ${entry.project}`,
    openGraph: {
      title: entry.title,
      description: `${entry.date} — ${entry.project}`,
      type: 'article',
      url,
      siteName: '로그의 숲 — Forest of Logs',
      publishedTime: entry.date,
      tags: entry.tags,
    },
    alternates: {
      canonical: url,
    },
  };
}
