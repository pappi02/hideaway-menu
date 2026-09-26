'use client';

import { memo } from 'react';
import type { Sheet } from '../types/menu';
import type { PageMetrics } from '../lib/metrics';
import { PageRenderer } from './PageRenderer';
import { PageSideContext } from './pages/PageFrame';

interface Props {
  sheet: Sheet;
  metrics: PageMetrics;
  turned: boolean;
  /** Stacking order, recomputed on every turn so the moving leaf stays on top. */
  zIndex: number;
  /** In spread mode a leaf occupies the right half of the stage. */
  mode: 'spread' | 'single';
  /** Leaves outside the reading window render as bare stock, to keep the DOM light. */
  mounted: boolean;
  frontVisible: boolean;
  backVisible: boolean;
  onNavigate: (pageIndex: number) => void;
}

/**
 * One physical leaf.
 *
 * A leaf carries two pages: the recto on its front and the verso printed on its
 * back. Turning it rotates -180deg about its spine-side edge, which swings the
 * recto across to the left of the spine and brings the verso up facing the
 * reader — the same motion as turning a page in a printed book. The previous
 * implementation rendered only one face per sheet, so a turned page simply
 * vanished instead of landing on the left-hand side of the spread.
 */
function BookSheetImpl({
  sheet,
  metrics,
  turned,
  zIndex,
  mode,
  mounted,
  frontVisible,
  backVisible,
  onNavigate,
}: Props) {
  const spread = mode === 'spread';

  return (
    <div
      className="book-sheet"
      data-turned={turned}
      style={{
        zIndex,
        width: metrics.pageW,
        height: metrics.pageH,
        left: spread ? metrics.pageW : 0,
        transform: `rotateY(${turned ? -180 : 0}deg)`,
      }}
    >
      <div
        className="book-sheet-face"
        inert={!frontVisible || undefined}
        aria-hidden={!frontVisible}
      >
        {mounted && (
          <PageSideContext.Provider value={spread ? 'recto' : 'single'}>
            <PageRenderer page={sheet.front} onNavigate={onNavigate} />
          </PageSideContext.Provider>
        )}
        <span className="book-sheet-shade book-sheet-shade--front" aria-hidden="true" />
      </div>

      {sheet.back && (
        <div
          className="book-sheet-face book-sheet-face--back"
          inert={!backVisible || undefined}
          aria-hidden={!backVisible}
        >
          {mounted && (
            <PageSideContext.Provider value={spread ? 'verso' : 'single'}>
              <PageRenderer page={sheet.back} onNavigate={onNavigate} />
            </PageSideContext.Provider>
          )}
          <span className="book-sheet-shade book-sheet-shade--back" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

export const BookSheet = memo(BookSheetImpl);
