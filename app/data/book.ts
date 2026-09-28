import { chapters } from './menu';
import { venue } from './venue';
import { columnHeight, flowChapter, type FlowedPage } from '../lib/paginate';
import { SINGLE, SPREAD, columnsFor, contentHeight, type PageMetrics } from '../lib/metrics';
import type { BookPage, ContentsEntry, Sheet } from '../types/menu';
import { assetPath } from '../lib/basePath';

/** Slack below which a page is left top-aligned rather than optically centred. */
const CENTRE_THRESHOLD = 130;

/** Never push type more than this far down; a page should not float. */
const MAX_OFFSET = 150;

/**
 * How far to push a short page's type block down the page.
 *
 * A chapter that needs three-fifths of a page looks broken when its type sits
 * hard against the running head with a third of the leaf blank underneath. In
 * print the block would be optically centred instead. Both columns share the
 * offset so their headings stay on one line.
 */
function bodyOffset(page: FlowedPage, metrics: PageMetrics, columns: 1 | 2): number {
  const budget = contentHeight(metrics);
  const tallest = Math.max(
    columnHeight(page.columnA, metrics, columns),
    columnHeight(page.columnB, metrics, columns),
  );
  const slack = budget - tallest;
  if (slack < CENTRE_THRESHOLD) return 0;
  return Math.min(Math.round(slack / 2), MAX_OFFSET);
}

/**
 * Assembles the finished book from `data/menu.ts`.
 *
 * Page indices and folio numbers are derived here and nowhere else. The old
 * hand-maintained table of contents drifted out of sync the moment a page was
 * inserted; adding a chapter or a dish now repaginates the whole book and
 * renumbers the contents automatically.
 *
 * The book is built twice, once per edition (see lib/metrics.ts): the spread
 * edition for laptops and the taller, narrower single edition for phones. They
 * differ in page count and therefore in folio numbers, exactly as a hardback
 * and a pocket edition of the same text do.
 */

export interface Book {
  metrics: PageMetrics;
  pages: BookPage[];
  contents: ContentsEntry[];
}

/** Every page variant, minus the fields the assembler is responsible for. */
type Draft<T> = T extends unknown ? Omit<T, 'index' | 'folio'> & { folio?: number | null } : never;

function buildBook(metrics: PageMetrics): Book {
  const pages: BookPage[] = [];
  const contents: ContentsEntry[] = [];

  // Folios begin on the first leaf after the cover, as in print.
  let folio = 0;
  const push = (page: Draft<BookPage>) => {
    const numbered = page.kind !== 'cover' && page.kind !== 'back-cover';
    if (numbered) folio += 1;
    pages.push({
      ...page,
      index: pages.length,
      folio: numbered ? folio : null,
    } as BookPage);
  };

  push({ id: 'cover', kind: 'cover', stock: 'onyx', image: assetPath('/images/menu/cover.jpg') });

  push({
    id: 'welcome',
    kind: 'statement',
    stock: 'onyx',
    eyebrow: 'Welcome',
    title: 'Good Evening',
    body:
      'This is a kitchen without shortcuts. Stock is simmered overnight, bread is proved here, ' +
      'the fish comes up from the coast twice a week, and the beef is aged before it ever sees ' +
      'the fire. Take your time with it. Nothing here is in a hurry, and neither are you.',
    image: assetPath('/images/menu/welcome.jpg'),
  });

  // Placeholder; entries are filled once every chapter has a page index.
  const contentsIndex = pages.length;
  push({ id: 'contents', kind: 'contents', stock: 'bone', entries: [] });

  for (const chapter of chapters) {
    contents.push({ label: chapter.title, pageIndex: pages.length, folio: folio + 1 });

    if (chapter.image) {
      push({
        id: `${chapter.id}-divider`,
        kind: 'chapter',
        stock: 'onyx',
        chapterId: chapter.id,
        title: chapter.title,
        eyebrow: chapter.eyebrow,
        standfirst: chapter.standfirst,
        note: chapter.note,
        image: chapter.image,
        imagePosition: chapter.imagePosition,
      });
    }

    const flowed = flowChapter(chapter, metrics);
    const columns = columnsFor(metrics, chapter.columns);

    flowed.forEach((page, i) => {
      push({
        bodyOffset: bodyOffset(page, metrics, columns),
        id: `${chapter.id}-${i + 1}`,
        kind: 'list',
        stock: chapter.stock ?? 'onyx',
        chapterId: chapter.id,
        title: chapter.title,
        eyebrow: chapter.eyebrow,
        columns,
        columnA: page.columnA,
        columnB: page.columnB,
        continued: page.continued,
        footnote: i === flowed.length - 1 ? chapter.footnote : undefined,
        image: chapter.image,
        imagePosition: chapter.imagePosition,
      });
    });
  }

  /* The back matter is laid out so the last content spread is
     [allergen note | reservations] and the back cover stands alone. That needs
     the allergen note to fall on an odd index, which is arranged with a
     full-bleed plate rather than with a blank leaf. */
  if (pages.length % 2 === 0) {
    push({
      id: 'plate',
      kind: 'plate',
      stock: 'onyx',
      image: assetPath('/images/menu/resort.jpg'),
      caption: `${venue.name} ${venue.descriptor} · ${venue.city}`,
    });
  }

  push({
    id: 'allergens',
    kind: 'statement',
    stock: 'bone',
    eyebrow: 'A Note',
    title: 'On Allergens',
    body:
      'Our kitchen handles nuts, shellfish, dairy, egg and gluten, and we cannot guarantee any ' +
      'dish is free of traces. Tell your server what you cannot eat and the chef will cook ' +
      'around it. All prices are in Kenyan Shillings and include statutory taxes. Service is at ' +
      'your discretion.',
    legend: true,
  });

  push({ id: 'contact', kind: 'contact', stock: 'onyx' });
  push({ id: 'back-cover', kind: 'back-cover', stock: 'onyx' });

  (pages[contentsIndex] as { entries: ContentsEntry[] }).entries = contents;

  return { metrics, pages, contents };
}

export const spreadBook = buildBook(SPREAD);
export const singleBook = buildBook(SINGLE);

export function bookFor(mode: 'spread' | 'single'): Book {
  return mode === 'spread' ? spreadBook : singleBook;
}

/**
 * Pairs pages into physical leaves.
 *
 * In spread mode leaf k carries pages[2k] on its front and pages[2k+1] on its
 * back, so turning it swings pages[2k] to the left of the spine and reveals
 * pages[2k+1] beside pages[2k+2] — the way a real book behaves. In single mode
 * each page is its own leaf and the next page sits beneath it.
 */
export function buildSheets(pages: BookPage[], mode: 'spread' | 'single'): Sheet[] {
  if (mode === 'single') {
    return pages.map((page) => ({ front: page, back: null }));
  }
  const sheets: Sheet[] = [];
  for (let i = 0; i < pages.length; i += 2) {
    sheets.push({ front: pages[i], back: pages[i + 1] ?? null });
  }
  return sheets;
}
