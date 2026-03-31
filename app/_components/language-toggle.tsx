'use client';

import { useState } from 'react';

interface LanguageToggleProps {
  ko: React.ReactNode;
  en: React.ReactNode;
}

export function LanguageToggle({ ko, en }: LanguageToggleProps) {
  const [lang, setLang] = useState<'ko' | 'en'>('ko');

  return (
    <div>
      <div className="mb-8 flex gap-2 font-sans text-sm">
        <button
          onClick={() => setLang('ko')}
          className="rounded-md px-3 py-1 transition-colors"
          style={{
            backgroundColor:
              lang === 'ko'
                ? 'color-mix(in srgb, var(--color-forest) 15%, transparent)'
                : 'transparent',
            color:
              lang === 'ko' ? 'var(--color-forest)' : 'var(--color-muted)',
          }}
        >
          한국어
        </button>
        <button
          onClick={() => setLang('en')}
          className="rounded-md px-3 py-1 transition-colors"
          style={{
            backgroundColor:
              lang === 'en'
                ? 'color-mix(in srgb, var(--color-forest) 15%, transparent)'
                : 'transparent',
            color:
              lang === 'en' ? 'var(--color-forest)' : 'var(--color-muted)',
          }}
        >
          English
        </button>
      </div>
      <div>{lang === 'ko' ? ko : en}</div>
    </div>
  );
}
