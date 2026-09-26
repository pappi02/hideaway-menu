/**
 * Downloads the exact font files the menu uses into `app/fonts/`.
 *
 * They are committed to the repo and loaded with `next/font/local`, so the
 * built menu has no runtime dependency on fonts.googleapis.com. A QR menu is
 * read on hotel wifi and sometimes on no wifi at all; a blocking round trip to
 * a third party for the typefaces is not acceptable for that.
 *
 * Re-run with `npm run fonts` only when the font list in app/layout.tsx changes.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'app', 'fonts');

// A modern UA is required or the API serves the legacy TTF stylesheet.
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const FACES = [
  { file: 'Cinzel-Regular.woff2', family: 'Cinzel', spec: 'wght@400', pick: 'wght' },
  { file: 'Cinzel-Medium.woff2', family: 'Cinzel', spec: 'wght@500', pick: 'wght' },
  { file: 'CormorantGaramond-Regular.woff2', family: 'Cormorant Garamond', spec: 'wght@400' },
  { file: 'CormorantGaramond-SemiBold.woff2', family: 'Cormorant Garamond', spec: 'wght@600' },
  { file: 'CormorantGaramond-Italic.woff2', family: 'Cormorant Garamond', spec: 'ital,wght@1,400' },
  { file: 'Inter-Light.woff2', family: 'Inter', spec: 'wght@300' },
  { file: 'Inter-Regular.woff2', family: 'Inter', spec: 'wght@400' },
  { file: 'Inter-Medium.woff2', family: 'Inter', spec: 'wght@500' },
];

async function get(url, headers = {}) {
  let lastError;
  for (let i = 0; i < 5; i += 1) {
    try {
      const r = await fetch(url, {
        headers: { 'User-Agent': UA, ...headers },
        signal: AbortSignal.timeout(30000),
      });
      if (r.ok) return r;
      lastError = new Error(`HTTP ${r.status}`);
    } catch (e) {
      lastError = e;
    }
    await new Promise((res) => setTimeout(res, 1200 * (i + 1)));
  }
  throw lastError;
}

/** Pulls the woff2 URL out of the `/* latin *\/` block of a css2 response. */
function latinWoff2(css) {
  const blocks = css.split('/*').map((b) => `/*${b}`);
  const latin = blocks.find((b) => b.startsWith('/* latin */'));
  const source = latin ?? css;
  const match = source.match(/url\((https:\/\/[^)]+\.woff2)\)/);
  if (!match) throw new Error('no woff2 in stylesheet');
  return match[1];
}

await fs.mkdir(OUT, { recursive: true });

for (const face of FACES) {
  const api = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(face.family)}:${face.spec}&display=swap`;
  const css = await (await get(api)).text();
  const url = latinWoff2(css);
  const bytes = Buffer.from(await (await get(url)).arrayBuffer());
  await fs.writeFile(path.join(OUT, face.file), bytes);
  console.log(`${face.file}  ${(bytes.length / 1024).toFixed(1)} KB`);
}

console.log(`\n${FACES.length} faces written to app/fonts/`);
