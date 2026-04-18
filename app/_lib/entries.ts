import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

import type { Entry, EntryMeta } from '@/app/_types/entry';

const CONTENT_DIR = path.join(process.cwd(), 'content/entries');
const LANG_SEPARATOR = '<!-- lang:en -->';

export const PAGE_SIZE = 10;

function splitBilingual(content: string): { ko: string; en: string } {
  const parts = content.split(LANG_SEPARATOR);
  const ko = parts[0].trim();
  const en = parts.length > 1 ? parts[1].trim() : ko;
  return { ko, en };
}

async function findMarkdownFiles(dir: string): Promise<string[]> {
  const results: string[] = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...(await findMarkdownFiles(fullPath)));
      } else if (entry.name.endsWith('.md')) {
        results.push(fullPath);
      }
    }
  } catch {
    return [];
  }

  return results;
}

export async function getAllEntries(): Promise<Entry[]> {
  const files = await findMarkdownFiles(CONTENT_DIR);

  const entries = await Promise.all(
    files.map(async filePath => {
      const raw = await fs.readFile(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const meta = data as EntryMeta;
      const slug = path.basename(filePath, '.md');

      return {
        ...meta,
        slug,
        content: splitBilingual(content),
      };
    })
  );

  return entries
    .filter(e => e.title)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getEntry(date: string): Promise<Entry | null> {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const filePath = path.join(CONTENT_DIR, year, month, `${date}.md`);

  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const meta = data as EntryMeta;

    return {
      ...meta,
      slug: date,
      content: splitBilingual(content),
    };
  } catch {
    return null;
  }
}

export async function getAllTags(): Promise<Map<string, number>> {
  const entries = await getAllEntries();
  const tagMap = new Map<string, number>();

  for (const entry of entries) {
    for (const tag of entry.tags ?? []) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    }
  }

  return tagMap;
}

export async function getEntriesByTag(tag: string): Promise<Entry[]> {
  const entries = await getAllEntries();
  return entries.filter(e => e.tags?.includes(tag));
}

export async function getPageCount(): Promise<number> {
  const entries = await getAllEntries();
  return Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
}

export async function getEntriesPage(page: number): Promise<Entry[]> {
  const entries = await getAllEntries();
  const start = (page - 1) * PAGE_SIZE;
  return entries.slice(start, start + PAGE_SIZE);
}
