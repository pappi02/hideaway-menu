/**
 * Resizes the menu photography to the size the book actually draws it at.
 *
 * The stock originals are 4000–6000px wide. A full-bleed page is 720 design
 * pixels, so even on a high-density screen nothing above ~1600px is visible —
 * everything beyond that is wifi the guest waits on before they can read the
 * menu. This caps the long edge and re-encodes at a sensible quality.
 *
 * Idempotent: an image already within the cap is re-encoded, not upscaled.
 *
 * Run with `npm run images`.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'images',
  'menu',
);

/** Long edge cap. Two pages wide on a 2x display, with room to spare. */
const MAX_EDGE = 1600;
const QUALITY = 76;

const files = (await fs.readdir(DIR)).filter((f) => /\.jpe?g$/i.test(f));

let before = 0;
let after = 0;

for (const file of files) {
  const full = path.join(DIR, file);
  const original = await fs.readFile(full);
  before += original.length;

  const out = await sharp(original)
    .rotate() // honour EXIF orientation before we discard the metadata
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toBuffer();

  // Never make a file bigger by "optimising" it.
  if (out.length < original.length) {
    await fs.writeFile(full, out);
    after += out.length;
    console.log(
      `${file.padEnd(22)} ${(original.length / 1024).toFixed(0)} KB -> ${(out.length / 1024).toFixed(0)} KB`,
    );
  } else {
    after += original.length;
    console.log(`${file.padEnd(22)} ${(original.length / 1024).toFixed(0)} KB (kept)`);
  }
}

console.log(
  `\ntotal ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB`,
);
