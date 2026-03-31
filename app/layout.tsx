import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import { Navigation } from '@/app/_components/navigation';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '로그의 숲 — Forest of Logs',
    template: '%s | 로그의 숲',
  },
  description:
    '매일의 개발 세션을 하루키 문체로 기록하는 개발 일지. A developer journal written in warm, reflective prose.',
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
      </body>
    </html>
  );
}
