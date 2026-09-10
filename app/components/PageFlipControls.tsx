'use client';

interface PageFlipControlsProps {
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export function PageFlipControls({
  onPrev,
  onNext,
  canGoPrev,
  canGoNext
}: PageFlipControlsProps) {
  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4 z-50 pointer-events-none">
      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        className={`pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full
                    bg-charcoal/60 text-ivory backdrop-blur-sm transition-all duration-200
                    ${canGoPrev ? 'hover:bg-charcoal/80 active:scale-95' : 'opacity-30 cursor-not-allowed'}`}
        aria-label="Previous page"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full
                    bg-charcoal/60 text-ivory backdrop-blur-sm transition-all duration-200
                    ${canGoNext ? 'hover:bg-charcoal/80 active:scale-95' : 'opacity-30 cursor-not-allowed'}`}
        aria-label="Next page"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
