import type { MetadataRoute } from 'next';

import { getAllEntries } from '@/app/_lib/entries';

export const dynamic = 'force-static';

const SITE_URL = 'https://forest-of-logs.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getAllEntries();

  const entryUrls = entries.map(entry => ({
    url: `${SITE_URL}/${entry.slug}`,
    lastModified: new Date(entry.date),
    changeFrequency: 'never' as const,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
    },
    {
      url: `${SITE_URL}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
    ...entryUrls,
  ];
}
