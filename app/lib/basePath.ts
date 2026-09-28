// Mirrors `basePath` in next.config.ts. The site is served under /menu on
// the executive-hideaway domain, so every hardcoded /public reference (data
// files, CSS background-image strings, preload links) needs this prefix —
// next/image and next/link add it automatically, plain strings don't.
export const BASE_PATH = '/menu';

export function assetPath(path: string) {
  return `${BASE_PATH}${path}`;
}
