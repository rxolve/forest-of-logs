export interface EntryMeta {
  title: string;
  date: string;
  style: string;
  tags: string[];
  project: string;
}

export interface Entry extends EntryMeta {
  slug: string;
  content: {
    ko: string;
    en: string;
  };
}
