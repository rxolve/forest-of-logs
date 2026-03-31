import { renderMdx } from '@/app/_lib/mdx';
import { LanguageToggle } from '@/app/_components/language-toggle';

interface EntryContentProps {
  ko: string;
  en: string;
}

export async function EntryContent({ ko, en }: EntryContentProps) {
  const [koContent, enContent] = await Promise.all([
    renderMdx(ko),
    renderMdx(en),
  ]);

  return (
    <LanguageToggle
      ko={<div className="prose">{koContent}</div>}
      en={<div className="prose">{enContent}</div>}
    />
  );
}
