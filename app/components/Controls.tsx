'use client';

interface Props {
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  spread: number;
  spreadCount: number;
  onOpenContents: () => void;
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <polyline points={dir === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
    </svg>
  );
}

/**
 * Navigation chrome. Deliberately sparse and outside the book: at a high-end
 * table the menu should look like a menu, not like an app.
 */
export function Controls({
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
  spread,
  spreadCount,
  onOpenContents,
}: Props) {
  return (
    <>
      {/* Full-height tap targets at the screen edges, clear of the type area. */}
      <button
        type="button"
        className="edge-zone edge-zone--left"
        onClick={onPrev}
        disabled={!canGoPrev}
        aria-label="Previous page"
        tabIndex={-1}
      />
      <button
        type="button"
        className="edge-zone edge-zone--right"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next page"
        tabIndex={-1}
      />

      <div className="chrome">
        <button
          type="button"
          className="chrome-btn"
          onClick={onPrev}
          disabled={!canGoPrev}
          aria-label="Previous page"
        >
          <Chevron dir="left" />
        </button>

        <button type="button" className="chrome-contents" onClick={onOpenContents}>
          <span className="chrome-contents-label">Contents</span>
          <span className="chrome-progress" aria-hidden="true">
            <span
              className="chrome-progress-fill"
              style={{ width: `${(spread / Math.max(1, spreadCount - 1)) * 100}%` }}
            />
          </span>
        </button>

        <button
          type="button"
          className="chrome-btn"
          onClick={onNext}
          disabled={!canGoNext}
          aria-label="Next page"
        >
          <Chevron dir="right" />
        </button>
      </div>
    </>
  );
}
