import { columnWidth, columnsFor, contentHeight, type PageMetrics } from './metrics';
import { SECTION_GAP, dishHeight, sectionHeadingHeight } from './measure';
import type { Chapter, Dish, PageSection, Section } from '../types/menu';

/**
 * Flows a chapter's sections into fixed-height columns.
 *
 * The point of this module: the renderer is never handed more content than a
 * page can hold, so no page needs an overflow scroller. Anything that does not
 * fit starts a new page, exactly as it would in print.
 */

type Block =
  | { type: 'heading'; section: Section; height: number }
  | { type: 'dish'; section: Section; dish: Dish; height: number };

function buildBlocks(sections: Section[], colW: number): Block[] {
  const blocks: Block[] = [];
  for (const section of sections) {
    blocks.push({ type: 'heading', section, height: sectionHeadingHeight(section, false) });
    for (const dish of section.dishes) {
      blocks.push({ type: 'dish', section, dish, height: dishHeight(dish, colW) });
    }
  }
  return blocks;
}

function fragment(section: Section, continued: boolean): PageSection {
  return {
    id: section.id,
    title: section.title,
    note: section.note,
    dishes: [],
    continued,
    carriesOn: false,
  };
}

interface Filled {
  sections: PageSection[];
  cursor: number;
}

/**
 * Fills one column from `cursor` onwards and reports where it stopped.
 *
 * Two print conventions are enforced:
 *  - a section heading never ends a column on its own (an orphan heading);
 *  - a section split across columns reprints its heading marked "continued",
 *    so the reader is never left wondering whether they missed something.
 */
function fillColumn(blocks: Block[], cursor: number, budget: number): Filled {
  let used = 0;
  let i = cursor;
  const taken: Block[] = [];

  // Resuming mid-section costs a reprinted heading before anything else fits.
  const resuming = i < blocks.length && blocks[i].type === 'dish';
  if (resuming) {
    used += sectionHeadingHeight(blocks[i].section, true);
  }

  while (i < blocks.length) {
    const block = blocks[i];
    const gap = block.type === 'heading' && (taken.length > 0 || resuming) ? SECTION_GAP : 0;
    if (used + gap + block.height > budget) break;
    used += gap + block.height;
    taken.push(block);
    i += 1;
  }

  // Never leave a heading stranded at the foot of a column.
  while (taken.length > 0 && taken[taken.length - 1].type === 'heading') {
    taken.pop();
    i -= 1;
  }

  // Widow control. A heading with a single dish under it at the foot of a
  // column, while the rest of that section carries over, reads as an accident
  // rather than a break. Push the whole section over instead — unless it is
  // the only thing in the column, in which case there is nowhere to push it.
  // `taken` is exactly blocks[cursor..i-1], so the cursor rewinds by the
  // number of blocks dropped.
  const headAt = taken.findLastIndex((block) => block.type === 'heading');
  if (headAt > 0) {
    const dishesUnder = taken.length - headAt - 1;
    const sectionId = taken[headAt].section.id;
    const carriesOver = blocks[i]?.type === 'dish' && blocks[i].section.id === sectionId;
    if (dishesUnder < 2 && carriesOver) {
      const dropped = taken.length - headAt;
      taken.length = headAt;
      i -= dropped;
    }
  }

  // Guarantee forward progress: a block taller than an empty column would
  // otherwise loop forever. Place it and let the overflow checks report it.
  if (i === cursor && cursor < blocks.length) {
    taken.push(blocks[cursor]);
    i = cursor + 1;
    if (blocks[cursor].type === 'heading' && blocks[i]?.type === 'dish') {
      taken.push(blocks[i]);
      i += 1;
    }
  }

  const sections: PageSection[] = [];
  let current: PageSection | null = null;

  if (resuming && taken[0]?.type === 'dish') {
    current = fragment(taken[0].section, true);
    sections.push(current);
  }

  for (const block of taken) {
    if (block.type === 'heading') {
      current = fragment(block.section, false);
      sections.push(current);
    } else if (current) {
      current.dishes.push(block.dish);
    }
  }

  const last = sections[sections.length - 1];
  const next = blocks[i];
  if (last && next?.type === 'dish' && next.section.id === last.id) {
    last.carriesOn = true;
  }

  return { sections, cursor: i };
}

export interface FlowedPage {
  columnA: PageSection[];
  columnB: PageSection[];
  /** True when this is not the first page of the chapter. */
  continued: boolean;
}

/**
 * Lays out one two-column page and, when it is the chapter's last, balances it.
 *
 * Filling greedily leaves a chapter's final page with a full left column
 * beside a nearly empty right one, which reads as a mistake rather than as a
 * layout. So when everything remaining fits on this page, bisection finds the
 * shortest column height that still swallows it all, which spreads the
 * remainder evenly across the two columns.
 */
function twoColumnPage(blocks: Block[], cursor: number, budget: number): {
  page: FlowedPage;
  cursor: number;
} {
  const greedyA = fillColumn(blocks, cursor, budget);
  const greedyB = fillColumn(blocks, greedyA.cursor, budget);

  if (greedyB.cursor < blocks.length) {
    return {
      page: { columnA: greedyA.sections, columnB: greedyB.sections, continued: false },
      cursor: greedyB.cursor,
    };
  }

  let low = 1;
  let high = budget;
  let best: { a: Filled; b: Filled } | null = null;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const a = fillColumn(blocks, cursor, mid);
    const b = fillColumn(blocks, a.cursor, mid);
    if (a.cursor > cursor && b.cursor >= blocks.length) {
      best = { a, b };
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  const chosen = best ?? { a: greedyA, b: greedyB };
  return {
    page: { columnA: chosen.a.sections, columnB: chosen.b.sections, continued: false },
    cursor: blocks.length,
  };
}

function flowAt(blocks: Block[], columns: 1 | 2, budget: number): FlowedPage[] {
  const pages: FlowedPage[] = [];
  let cursor = 0;

  while (cursor < blocks.length) {
    if (columns === 2) {
      const { page, cursor: next } = twoColumnPage(blocks, cursor, budget);
      page.continued = pages.length > 0;
      pages.push(page);
      cursor = next;
    } else {
      const a = fillColumn(blocks, cursor, budget);
      cursor = a.cursor;
      pages.push({ columnA: a.sections, columnB: [], continued: pages.length > 0 });
    }
  }

  return pages;
}

/**
 * Flows a chapter, then evens out how full its pages are.
 *
 * Filling each page to the brim before starting the next leaves a chapter that
 * needs 1.2 pages looking like one crammed page followed by a near-empty one —
 * the reader reads it as a mistake. So once the greedy pass has established
 * how many pages the chapter genuinely needs, bisection finds the shortest
 * column that still fits in that many pages, which spreads the content evenly
 * across them. Same idea as balancing two columns, applied to the whole
 * chapter.
 */
export function flowChapter(chapter: Chapter, metrics: PageMetrics): FlowedPage[] {
  const columns = columnsFor(metrics, chapter.columns);
  const colW = columnWidth(metrics, columns);
  const budget = contentHeight(metrics);
  const blocks = buildBlocks(chapter.sections, colW);

  const greedy = flowAt(blocks, columns, budget);
  if (greedy.length <= 1) return greedy;

  let low = 1;
  let high = budget;
  let best = greedy;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const pages = flowAt(blocks, columns, mid);
    if (pages.length <= greedy.length) {
      best = pages;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return best;
}

/** Modelled height of a filled column — used by the overflow checks. */
export function columnHeight(
  sections: PageSection[],
  metrics: PageMetrics,
  columns: 1 | 2,
): number {
  const colW = columnWidth(metrics, columns);
  let total = 0;
  sections.forEach((section, index) => {
    if (index > 0) total += SECTION_GAP;
    total += sectionHeadingHeight(section, section.continued);
    for (const dish of section.dishes) total += dishHeight(dish, colW);
  });
  return total;
}
