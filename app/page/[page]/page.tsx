import { notFound } from 'next/navigation';

import { getEntriesPage, getPageCount } from '@/app/_lib/entries';
import { EntryCard } from '@/app/_components/entry-card';
import { Pagination } from '@/app/_components/pagination';

interface PageProps {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const count = await getPageCount();
  if (count < 2) return [];
  return Array.from({ length: count - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { page } = await params;
  return { title: `${page} 페이지` };
}

export default async function EntriesPage({ params }: PageProps) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);
  if (isNaN(pageNum) || pageNum < 2) notFound();

  const [entries, pageCount] = await Promise.all([
    getEntriesPage(pageNum),
    getPageCount(),
  ]);

  if (entries.length === 0 || pageNum > pageCount) notFound();

  return (
    <section>
      <div className="divide-y" style={{ borderColor: 'var(--color-muted)' }}>
        {entries.map(entry => (
          <EntryCard key={entry.slug} entry={entry} />
        ))}
      </div>
      <Pagination current={pageNum} total={pageCount} />
    </section>
  );
}
