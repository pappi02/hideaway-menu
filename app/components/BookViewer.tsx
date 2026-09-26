'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { bookFor, buildSheets } from '../data/book';
import { venue } from '../data/venue';
import type { BookPage } from '../types/menu';
import { FLIP_MS, contentHeight, contentWidth } from '../lib/metrics';
import { useBookFit } from '../hooks/useBookFit';
import { useBookFlip } from '../hooks/useBookFlip';
import { useOverflowGuard } from '../hooks/useOverflowGuard';
import { useSwipe } from '../hooks/useSwipe';
import { BookSheet } from './BookSheet';
import { ContentsDrawer } from './ContentsDrawer';
import { Controls } from './Controls';

/** Leaves kept fully rendered on each side of the reading position. */
const WINDOW = 2;

export function BookViewer() {
  const { mode, metrics, scale, stageW, stageH, offsetY, ready } = useBookFit();
  const stageRef = useRef<HTMLDivElement>(null);
  const [contentsOpen, setContentsOpen] = useState(false);

  const book = bookFor(mode);
  const sheets = useMemo(() => buildSheets(book.pages, mode), [book, mode]);

  const sheetForPage = useCallback(
    (pageIndex: number) => (mode === 'spread' ? Math.ceil(pageIndex / 2) : pageIndex),
    [mode],
  );

  const { turned, settling, next, prev, jump, goToPage, canGoNext, canGoPrev, spreadCount } =
    useBookFlip({ sheetCount: sheets.length, sheetForPage });

  useOverflowGuard(book);

  const currentPageIndex = mode === 'spread' ? Math.max(0, turned * 2 - 1) : turned;

  /* Keep the reading position when the viewport crosses the spread breakpoint.
     The two editions paginate differently, so the position is carried across
     by chapter rather than by page number: landing on the right chapter is
     what a reader notices, landing on folio 14 of a different edition is not.
     `turned` still holds the old mode's value when this effect fires. */
  const prevMode = useRef(mode);
  useEffect(() => {
    if (prevMode.current === mode) return;
    const from = bookFor(prevMode.current);
    const wasAt = prevMode.current === 'spread' ? Math.max(0, turned * 2 - 1) : turned;
    const chapterId = chapterOf(from.pages[Math.min(wasAt, from.pages.length - 1)]);

    prevMode.current = mode;

    const target = chapterId
      ? book.pages.find((p) => chapterOf(p) === chapterId)?.index ?? 0
      : Math.min(wasAt, book.pages.length - 1);

    jump(mode === 'spread' ? Math.ceil(target / 2) : target);
  }, [mode, turned, jump, book]);

  useSwipe(stageRef, { onNext: next, onPrev: prev, enabled: !contentsOpen });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (contentsOpen || e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          prev();
          break;
        case 'Home':
          e.preventDefault();
          goToPage(0);
          break;
        case 'End':
          e.preventDefault();
          goToPage(book.pages.length - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [next, prev, goToPage, contentsOpen, book]);

  const handleNavigate = useCallback(
    (pageIndex: number) => {
      goToPage(pageIndex);
      setContentsOpen(false);
    },
    [goToPage],
  );

  /* A closed book sits centred on its cover; once open it settles over the
     spine; at the end it slides back so the final leaf stays centred. */
  const closed = mode === 'spread' && turned === 0;
  const atEnd = mode === 'spread' && turned === sheets.length;
  const shift = closed ? -metrics.pageW / 2 : atEnd ? metrics.pageW / 2 : 0;

  const openPage = book.pages[Math.min(currentPageIndex, book.pages.length - 1)];

  return (
    <div className="book-room">
      <div
        ref={stageRef}
        className="book-stage"
        style={{
          width: stageW,
          height: stageH,
          /* Absolutely centred rather than flex-centred: the stage's *unscaled*
             box is taller than a phone screen, and a laid-out element that big
             makes the document scrollable even though the transform draws it
             smaller. Taking it out of flow removes that entirely.
             Centring is done with negative margins rather than a percentage
             translate, so it does not interact with the scale that follows. */
          marginLeft: -stageW / 2,
          marginTop: -stageH / 2 + offsetY,
          transform: `scale(${scale}) translateX(${shift}px)`,
          opacity: ready ? 1 : 0,
          ...({
            '--flip-duration': `${FLIP_MS}ms`,
            '--page-w': `${metrics.pageW}px`,
            '--page-h': `${metrics.pageH}px`,
            '--page-mx': `${metrics.marginX}px`,
            '--page-mt': `${metrics.marginTop}px`,
            '--page-mb': `${metrics.marginBottom}px`,
            '--page-gutter': `${metrics.gutter}px`,
            '--page-header-h': `${metrics.headerH}px`,
            '--page-body-h': `${contentHeight(metrics)}px`,
            '--page-col-gap': `${metrics.columnGap}px`,
            '--page-content-w': `${contentWidth(metrics)}px`,
          } as React.CSSProperties),
        }}
      >
        {mode === 'spread' && !closed && !atEnd && <span className="book-spine" aria-hidden="true" />}

        {/* Fore-edges, so the book reads as a stack of paper rather than a card. */}
        <span className="book-edge" aria-hidden="true" style={{ left: stageW }} />
        {mode === 'spread' && !closed && (
          <span className="book-edge book-edge--left" aria-hidden="true" style={{ left: -10 }} />
        )}

        {sheets.map((sheet, k) => {
          const isTurned = k < turned;
          const base = isTurned ? k + 1 : sheets.length - k + 1;

          return (
            <BookSheet
              key={sheet.front.id}
              sheet={sheet}
              metrics={metrics}
              turned={isTurned}
              zIndex={k === settling ? base + sheets.length + 20 : base}
              mode={mode}
              mounted={Math.abs(k - turned) <= WINDOW}
              frontVisible={k === turned}
              backVisible={mode === 'spread' && k === turned - 1}
              onNavigate={handleNavigate}
            />
          );
        })}
      </div>

      <Controls
        onPrev={prev}
        onNext={next}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        spread={turned}
        spreadCount={spreadCount}
        onOpenContents={() => setContentsOpen(true)}
      />

      <ContentsDrawer
        open={contentsOpen}
        onClose={() => setContentsOpen(false)}
        onNavigate={handleNavigate}
        entries={book.contents}
        currentPageIndex={currentPageIndex}
      />

      <p className="sr-only" aria-live="polite">
        {openPage.kind === 'list'
          ? `${openPage.title}, page ${openPage.folio} of ${book.pages.length}`
          : `${venue.name} menu, ${openPage.kind.replace('-', ' ')}`}
      </p>
    </div>
  );
}

/** The chapter a page belongs to, for pages that belong to one. */
function chapterOf(page: BookPage | undefined): string | undefined {
  return page && (page.kind === 'chapter' || page.kind === 'list') ? page.chapterId : undefined;
}
