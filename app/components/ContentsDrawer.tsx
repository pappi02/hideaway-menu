'use client';

import { useEffect, useRef } from 'react';
import { venue } from '../data/venue';
import type { ContentsEntry } from '../types/menu';
import { Hairline } from './Ornament';

interface Props {
  open: boolean;
  onClose: () => void;
  onNavigate: (pageIndex: number) => void;
  /** Contents of the edition currently on screen — the two paginate differently. */
  entries: ContentsEntry[];
  currentPageIndex: number;
}

/**
 * Quick navigation. The book carries a printed contents page too; this is the
 * shortcut for a guest who already knows what they are after.
 *
 * Focus is moved into the drawer on open and returned to whatever opened it on
 * close, and Tab is kept inside while it is up — none of which the previous
 * drawer did, so keyboard users could tab straight through into the hidden
 * pages behind it.
 */
export function ContentsDrawer({ open, onClose, onNavigate, entries, currentPageIndex }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>('button')?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>('button, [href]');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      restoreTo.current?.focus();
    };
  }, [open, onClose]);

  return (
    <>
      <div
        className={`drawer-scrim${open ? ' is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className={`drawer${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu contents"
        inert={!open || undefined}
      >
        <div className="drawer-head">
          <p className="t-eyebrow drawer-eyebrow">{venue.name}</p>
          <h2 className="t-engraved drawer-title">Contents</h2>
          <Hairline width={40} />
        </div>

        <nav className="drawer-nav">
          <ul>
            {entries.map((entry) => {
              const active = currentPageIndex >= entry.pageIndex;
              return (
                <li key={entry.label}>
                  <button
                    type="button"
                    className={`drawer-link${active ? ' is-passed' : ''}`}
                    onClick={() => onNavigate(entry.pageIndex)}
                  >
                    <span className="drawer-link-label">{entry.label}</span>
                    <span className="leader" aria-hidden="true" />
                    <span className="drawer-link-folio">
                      {entry.folio !== null ? String(entry.folio).padStart(2, '0') : ''}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="drawer-foot">
          <button type="button" className="drawer-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
