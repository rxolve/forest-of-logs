'use client';

import Link from 'next/link';

import type { EntryMeta } from '@/app/_types/entry';
import { useLanguage } from '@/app/_components/language-provider';

export function EntryCard({ entry }: { entry: EntryMeta & { slug: string } }) {
  const { lang } = useLanguage();
  const title = lang === 'en' && entry.titleEn ? entry.titleEn : entry.title;

  return (
    <article className="group py-6">
      <Link href={`/${entry.slug}`} className="block">
        <time
          className="mb-1 block font-sans text-sm"
          style={{ color: 'var(--color-muted)' }}
        >
          {entry.date}
        </time>
        <h2
          className="text-xl font-semibold transition-colors group-hover:opacity-80"
          style={{ color: 'var(--color-ink)' }}
        >
          {title}
        </h2>
        {entry.tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {entry.tags.map(tag => (
              <span
                key={tag}
                className="rounded-md px-2 py-0.5 font-sans text-xs"
                style={{
                  backgroundColor:
                    'color-mix(in srgb, var(--color-bark) 12%, transparent)',
                  color: 'var(--color-bark)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
