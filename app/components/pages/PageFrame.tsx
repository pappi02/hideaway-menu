'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { BookPage } from '../../types/menu';
import { venue } from '../../data/venue';

/**
 * Which half of the spread a page is printed on. Drives the gutter shadow and
 * which outside edge the folio sits against — the details that make a spread
 * read as one open book rather than two tiles side by side.
 */
export type PageSide = 'recto' | 'verso' | 'single';

export const PageSideContext = createContext<PageSide>('single');

export function usePageSide(): PageSide {
  return useContext(PageSideContext);
}

interface PageFrameProps {
  page: BookPage;
  children: ReactNode;
  /** Suppresses the folio line, for covers and dividers. */
  bare?: boolean;
}

export function PageFrame({ page, children, bare = false }: PageFrameProps) {
  const side = usePageSide();
  const surface = page.stock === 'bone' ? 'surface-bone' : 'surface-onyx';

  return (
    <div className={`page ${surface} surface-grain page--${side}`} data-stock={page.stock}>
      {side !== 'single' && (
        <span className={`page-gutter page-gutter--${side}`} aria-hidden="true" />
      )}

      <div className="page-inner">{children}</div>

      {!bare && (
        <div className="page-folio" aria-hidden="true">
          <span className="page-folio-mark">{venue.monogram}</span>
          <span className="page-folio-rule" />
          <span className="page-folio-number">
            {page.folio !== null ? String(page.folio).padStart(2, '0') : ''}
          </span>
        </div>
      )}
    </div>
  );
}
