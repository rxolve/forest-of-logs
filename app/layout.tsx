import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';

import { Navigation } from '@/app/_components/navigation';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://forest-of-logs.vercel.app'),
  title: {
    default: '로그의 숲 — Forest of Logs',
    template: '%s | 로그의 숲',
  },
  description:
    '매일의 개발 세션을 기록하는 개발 일지. A developer journal written in calm, reflective prose.',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '로그의 숲 — Forest of Logs',
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&family=Noto+Serif+KR:wght@400;600&family=JetBrains+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          <main className="mx-auto max-w-[680px] px-6 pb-24 pt-8">
            {children}
          </main>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
