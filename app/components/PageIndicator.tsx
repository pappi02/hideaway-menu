'use client';

interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
}

export function PageIndicator({ currentPage, totalPages }: PageIndicatorProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
      <span className="text-meta text-ivory/70 bg-charcoal/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px]">
        {String(currentPage + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
      </span>
    </div>
  );
}
