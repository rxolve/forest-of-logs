import Link from 'next/link';

interface PaginationProps {
  current: number;
  total: number;
}

export function Pagination({ current, total }: PaginationProps) {
  if (total <= 1) return null;

  const prevHref =
    current === 2 ? '/' : current > 2 ? `/page/${current - 1}` : null;
  const nextHref = current < total ? `/page/${current + 1}` : null;

  return (
    <nav
      className="mt-12 flex items-center justify-between font-sans text-sm"
      style={{ color: 'var(--color-muted)' }}
      aria-label="페이지 탐색"
    >
      <div>
        {prevHref ? (
          <Link href={prevHref} className="transition-colors hover:opacity-70">
            &larr; 이전
          </Link>
        ) : (
          <span style={{ opacity: 0.3 }}>&larr; 이전</span>
        )}
      </div>
      <div>
        {current} / {total}
      </div>
      <div>
        {nextHref ? (
          <Link href={nextHref} className="transition-colors hover:opacity-70">
            다음 &rarr;
          </Link>
        ) : (
          <span style={{ opacity: 0.3 }}>다음 &rarr;</span>
        )}
      </div>
    </nav>
  );
}
