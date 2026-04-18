import type { WritingStyleConfig } from './types';
import { murakamiStyle } from './murakami';

const styles: Record<string, WritingStyleConfig> = {
  murakami: murakamiStyle,
};

export function getStyle(name: string): WritingStyleConfig {
  const style = styles[name];
  if (!style) {
    throw new Error(
      `Unknown style: ${name}. Available: ${Object.keys(styles).join(', ')}`
    );
  }
  return style;
}

export function tryGetStyle(name: string): WritingStyleConfig | undefined {
  return styles[name];
}

export function getAllStyles(): WritingStyleConfig[] {
  return Object.values(styles);
}
