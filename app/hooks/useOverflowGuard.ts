'use client';

import { useEffect } from 'react';
import { contentHeight } from '../lib/metrics';
import { columnHeight } from '../lib/paginate';
import type { Book } from '../data/book';

/**
 * Development-time check that the paginator's height model still matches what
 * the components actually render.
 *
 * The model in lib/measure.ts mirrors the CSS by hand. If someone changes a
 * type size or a margin in the stylesheet without updating the model, pages
 * would start overflowing again — silently, because nothing scrolls any more.
 * This catches that drift on the next dev run rather than in the dining room.
 */
export function useOverflowGuard(book: Book) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;

    const problems: string[] = [];
    const budget = contentHeight(book.metrics);

    for (const page of book.pages) {
      if (page.kind !== 'list') continue;
      for (const [label, column] of [
        ['A', page.columnA],
        ['B', page.columnB],
      ] as const) {
        const height = columnHeight(column, book.metrics, page.columns);
        if (height > budget) {
          problems.push(
            `${page.id} column ${label}: ${Math.round(height)}px modelled vs ${budget}px available`,
          );
        }
      }
    }

    // Compare the model against the DOM, which is the real arbiter.
    const frame = requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>('.page-column').forEach((node) => {
        if (node.scrollHeight > node.clientHeight + 1) {
          problems.push(`a rendered column overflows by ${node.scrollHeight - node.clientHeight}px`);
        }
      });

      if (problems.length > 0) {
        console.warn(
          `[hideaway-menu] ${book.metrics.id} edition overflows — the height model in ` +
            'lib/measure.ts has drifted from app/styles/book.css:\n  ' +
            problems.join('\n  '),
        );
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [book]);
}
