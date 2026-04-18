import { notFound } from 'next/navigation';
import Link from 'next/link';

import { getAllEntries, getEntry } from '@/app/_lib/entries';
import { generateEntryMetadata } from '@/app/_lib/metadata';
import { renderMdx } from '@/app/_lib/mdx';
import { EntryView } from '@/app/_components/entry-view';
import { tryGetStyle } from '@/styles';

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

  const [koContent, enContent] = await Promise.all([
    renderMdx(entry.content.ko),
    renderMdx(entry.content.en),
  ]);

  const styleDescription = tryGetStyle(entry.style)?.description;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: entry.title,
    datePublished: entry.date,
    url: `https://rxolve.github.io/${entry.slug}`,
    keywords: entry.tags,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/"
        className="mb-4 inline-block font-sans text-sm transition-colors hover:opacity-70"
        style={{ color: 'var(--color-muted)' }}
      >
        &larr; 숲으로 돌아가기
      </Link>
      <EntryView
        entry={entry}
        koContent={koContent}
        enContent={enContent}
        styleDescription={styleDescription}
      />
    </article>
  );
}
