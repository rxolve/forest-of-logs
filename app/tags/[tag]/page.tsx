import Link from 'next/link';

import { getAllTags, getEntriesByTag } from '@/app/_lib/entries';
import { EntryCard } from '@/app/_components/entry-card';

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tagMap = await getAllTags();
  return Array.from(tagMap.keys()).map(tag => ({ tag }));
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return { title: `#${decoded}` };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const entries = await getEntriesByTag(decoded);

  return (
    <section>
      <Link
        href="/tags"
        className="mb-4 inline-block font-sans text-sm transition-colors hover:opacity-70"
        style={{ color: 'var(--color-muted)' }}
      >
        &larr; 모든 태그
      </Link>
      <h1
        className="mb-8 text-3xl font-semibold tracking-tight"
        style={{ color: 'var(--color-ink)' }}
      >
        #{decoded}
      </h1>
      <div className="divide-y" style={{ borderColor: 'var(--color-muted)' }}>
        {entries.map(entry => (
          <EntryCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </section>
  );
}
