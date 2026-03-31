import { getAllEntries } from '@/app/_lib/entries';
import { EntryCard } from '@/app/_components/entry-card';

export default async function HomePage() {
  const entries = await getAllEntries();

  return (
    <section>
      <div className="mb-12">
        <h1
          className="mb-2 text-3xl font-semibold tracking-tight"
          style={{ color: 'var(--color-ink)' }}
        >
          로그의 숲
        </h1>
        <p
          className="font-sans text-base"
          style={{ color: 'var(--color-muted)' }}
        >
          매일의 개발 세션을 기록하는 숲
        </p>
      </div>
      <div className="divide-y" style={{ borderColor: 'var(--color-muted)' }}>
        {entries.map(entry => (
          <EntryCard key={entry.slug} entry={entry} />
        ))}
      </div>
      {entries.length === 0 && (
        <p style={{ color: 'var(--color-muted)' }}>
          아직 심어진 나무가 없습니다.
        </p>
      )}
    </section>
  );
}
