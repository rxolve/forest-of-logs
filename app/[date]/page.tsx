import { notFound } from 'next/navigation';
import Link from 'next/link';

import { getAllEntries, getEntry } from '@/app/_lib/entries';
import { generateEntryMetadata } from '@/app/_lib/metadata';
import { EntryContent } from '@/app/_components/entry-content';

interface PageProps {
  params: Promise<{ date: string }>;
}

export async function generateStaticParams() {
  const entries = await getAllEntries();
  return entries.map(entry => ({ date: entry.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { date } = await params;
  const entry = await getEntry(date);
  if (!entry) return {};
  return generateEntryMetadata(entry);
}

export default async function EntryPage({ params }: PageProps) {
  const { date } = await params;
  const entry = await getEntry(date);

  if (!entry) {
    notFound();
  }

  return (
    <article>
      <header className="mb-10">
        <Link
          href="/"
          className="mb-4 inline-block font-sans text-sm transition-colors hover:opacity-70"
          style={{ color: 'var(--color-muted)' }}
        >
          &larr; 숲으로 돌아가기
        </Link>
        <h1
          className="mb-2 text-3xl font-semibold tracking-tight"
          style={{ color: 'var(--color-ink)' }}
        >
          {entry.title}
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
      </header>
      <EntryContent ko={entry.content.ko} en={entry.content.en} />
    </article>
  );
}
