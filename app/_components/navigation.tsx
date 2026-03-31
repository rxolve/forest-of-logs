'use client';

import Link from 'next/link';

import { ThemeToggle } from '@/app/_components/theme-toggle';

export function Navigation() {
  return (
    <header className="mx-auto flex max-w-[680px] items-center justify-between px-6 py-6">
      <Link
        href="/"
        className="font-sans text-lg font-semibold tracking-tight"
        style={{ color: 'var(--color-forest)' }}
      >
        로그의 숲
      </Link>
      <nav className="flex items-center gap-4">
        <Link
          href="/tags"
          className="font-sans text-sm transition-colors hover:opacity-70"
          style={{ color: 'var(--color-muted)' }}
        >
          태그
        </Link>
        <Link
          href="/feed.xml"
          className="font-sans text-sm transition-colors hover:opacity-70"
          style={{ color: 'var(--color-muted)' }}
        >
          RSS
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
