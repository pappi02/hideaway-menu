'use client';

import type { ContentsPage as ContentsPageType } from '../../types/menu';
import { venue } from '../../data/venue';
import { Rule } from '../Ornament';
import { PageFrame } from './PageFrame';

interface Props {
  page: ContentsPageType;
  /** Jumping straight to a chapter from the printed contents. */
  onNavigate?: (pageIndex: number) => void;
}

export function ContentsPage({ page, onNavigate }: Props) {
  return (
    <PageFrame page={page}>
      <header className="contents-head">
        <p className="t-eyebrow contents-eyebrow">{venue.name}</p>
        <h2 className="t-engraved contents-title">Contents</h2>
        <div className="contents-rule">
          <Rule width={116} tone="ink" />
        </div>
      </header>

      <nav className="contents-nav" aria-label="Menu contents">
        <ol className="contents-list">
          {page.entries.map((entry) => (
            <li key={entry.label} className="contents-item">
              <button
                type="button"
                className="contents-link"
                onClick={() => onNavigate?.(entry.pageIndex)}
              >
                <span className="contents-label">{entry.label}</span>
                <span className="leader" aria-hidden="true" />
                <span className="contents-folio">
                  {entry.folio !== null ? String(entry.folio).padStart(2, '0') : ''}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <footer className="contents-hours">
        <p className="contents-currency">
          All prices in Kenyan Shillings, taxes included.
        </p>
        <span className="t-eyebrow contents-hours-title">Hours</span>
        <dl className="contents-hours-list">
          {venue.hours.map((slot) => (
            <div key={slot.label} className="contents-hours-row">
              <dt>{slot.label}</dt>
              <dd>{slot.value}</dd>
            </div>
          ))}
        </dl>
      </footer>
    </PageFrame>
  );
}
