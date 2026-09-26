/**
 * The book is laid out on a fixed-size canvas and then scaled to fit the
 * viewport with a CSS transform.
 *
 * This is why nothing in the menu ever scrolls: because the canvas is always
 * exactly `pageW x pageH` design pixels, the paginator in `lib/paginate.ts`
 * can decide at module-evaluation time precisely how many dishes fit on a
 * page, and that decision holds on every device. Sizing pages in viewport
 * units instead would make "does this fit?" unanswerable until render, which
 * is what forced the previous version to fall back on overflow scrolling.
 *
 * There are two editions of the same book, because one canvas cannot serve
 * both cases. A laptop shows a two-page spread at roughly 3:2; a phone is
 * about 1:2. Scaling the wide page down to phone width would leave the type
 * at around 10px — legible in a screenshot, not across a dim table. So the
 * phone gets a narrower, taller page that fills its screen, and the book is
 * paginated separately for it, exactly as a pocket edition is reset rather
 * than photographically reduced.
 */

export interface PageMetrics {
  id: 'spread' | 'single';
  pageW: number;
  pageH: number;
  marginX: number;
  marginTop: number;
  marginBottom: number;
  /** Extra inner margin on the spine side, so type clears the gutter shadow. */
  gutter: number;
  /** Height reserved for the running head. */
  headerH: number;
  /** Height reserved for the footnote and folio line. */
  footerH: number;
  /** Gap between the two columns of a two-column page. */
  columnGap: number;
  /** A narrow page is set in a single column whatever the chapter asks for. */
  maxColumns: 1 | 2;
}

export const SPREAD: PageMetrics = {
  id: 'spread',
  pageW: 720,
  pageH: 1000,
  marginX: 62,
  marginTop: 58,
  marginBottom: 54,
  gutter: 26,
  headerH: 138,
  footerH: 72,
  columnGap: 34,
  maxColumns: 2,
};

export const SINGLE: PageMetrics = {
  id: 'single',
  pageW: 480,
  pageH: 980,
  marginX: 40,
  marginTop: 46,
  marginBottom: 40,
  gutter: 0,
  headerH: 112,
  footerH: 64,
  columnGap: 0,
  maxColumns: 1,
};

/** Usable height for flowing content on a list page. */
export function contentHeight(m: PageMetrics): number {
  return m.pageH - m.marginTop - m.marginBottom - m.headerH - m.footerH;
}

/** Usable width of the type area. */
export function contentWidth(m: PageMetrics): number {
  return m.pageW - m.marginX * 2 - m.gutter;
}

export function columnWidth(m: PageMetrics, columns: 1 | 2): number {
  const w = contentWidth(m);
  return columns === 1 ? w : (w - m.columnGap) / 2;
}

export function columnsFor(m: PageMetrics, requested: 1 | 2 | undefined): 1 | 2 {
  return Math.min(requested ?? 1, m.maxColumns) as 1 | 2;
}

/** Below this viewport width the book shows one page at a time. */
export const SPREAD_BREAKPOINT = 1024;

/** Duration of a page turn, in ms. */
export const FLIP_MS = 900;
