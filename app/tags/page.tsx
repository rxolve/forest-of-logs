import Link from 'next/link';

import { getAllTags } from '@/app/_lib/entries';

export const metadata = {
  title: '태그',
};

export default async function TagsPage() {
  const tagMap = await getAllTags();
  const tags = Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <section>
      <h1
        className="mb-8 text-3xl font-semibold tracking-tight"
        style={{ color: 'var(--color-ink)' }}
      >
        태그
      </h1>
      <div className="flex flex-wrap gap-3">
        {tags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="rounded-lg px-4 py-2 font-sans text-sm transition-colors hover:opacity-80"
            style={{
              backgroundColor:
                'color-mix(in srgb, var(--color-bark) 12%, transparent)',
              color: 'var(--color-bark)',
            }}
          >
            {tag}
            <span className="ml-1.5 opacity-60">{count}</span>
          </Link>
        ))}
      </div>
      {tags.length === 0 && (
        <p style={{ color: 'var(--color-muted)' }}>
          아직 태그가 없습니다.
        </p>
      )}
    </section>
  );
}
