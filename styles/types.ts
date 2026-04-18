export interface StyleExample {
  label: string;
  bad: string;
  good: string;
}

export interface WritingStyleConfig {
  name: string;
  description: string;
  principles: string[];
  forbid: string[];
  examples: StyleExample[];
  outputFormat: string;
}
