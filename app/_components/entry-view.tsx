'use client';

import Link from 'next/link';

import type { Entry } from '@/app/_types/entry';
import { useLanguage } from '@/app/_components/language-provider';

interface EntryViewProps {
  entry: Entry;
  koContent: React.ReactNode;
  enContent: React.ReactNode;
  styleDescription?: string;
}

export function EntryView({
  entry,
  koContent,
  enContent,
  styleDescription,
}: EntryViewProps) {
  const { lang, setLang } = useLanguage();
  const title = lang === 'en' && entry.titleEn ? entry.titleEn : entry.title;

  return (
    <>
      <header className="mb-10">
        <h1
          className="mb-2 text-3xl font-semibold tracking-tight"
          style={{ color: 'var(--color-ink)' }}
        >
          {title}
        </h1>
        <div className="flex items-center gap-3 font-sans text-sm">
          <time style={{ color: 'var(--color-muted)' }}>{entry.date}</time>
          {entry.project && (
            <span style={{ color: 'var(--color-bark)' }}>{entry.project}</span>
          )}
        </div>
        {entry.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {entry.tags.map(tag => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="rounded-md px-2 py-0.5 font-sans text-xs transition-colors hover:opacity-80"
                style={{
                  backgroundColor:
                    'color-mix(in srgb, var(--color-bark) 12%, transparent)',
                  color: 'var(--color-bark)',
                }}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        {styleDescription && (
          <p
            className="mt-3 font-sans text-xs italic"
            style={{ color: 'var(--color-muted)', opacity: 0.7 }}
          >
            {styleDescription}
          </p>
        )}
      </header>
      <div className="mb-8 flex gap-2 font-sans text-sm">
        <button
          onClick={() => setLang('ko')}
          className="rounded-md px-3 py-1 transition-colors"
          style={{
            backgroundColor:
              lang === 'ko'
                ? 'color-mix(in srgb, var(--color-forest) 15%, transparent)'
                : 'transparent',
            color:
              lang === 'ko' ? 'var(--color-forest)' : 'var(--color-muted)',
          }}
        >
          한국어
        </button>
        <button
          onClick={() => setLang('en')}
          className="rounded-md px-3 py-1 transition-colors"
          style={{
            backgroundColor:
              lang === 'en'
                ? 'color-mix(in srgb, var(--color-forest) 15%, transparent)'
                : 'transparent',
            color:
              lang === 'en' ? 'var(--color-forest)' : 'var(--color-muted)',
          }}
        >
          English
        </button>
      </div>
      <div className="prose">{lang === 'ko' ? koContent : enContent}</div>
    </>
  );
}
