'use client';

import { tableOfContents } from '../data/menuData';

interface ContentsDrawerProps {
  currentPage: number;
  onNavigate: (pageIndex: number) => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ContentsDrawer({ currentPage, onNavigate, isOpen, onOpenChange }: ContentsDrawerProps) {
  const handleNavigate = (pageIndex: number) => {
    onNavigate(pageIndex);
    onOpenChange(false);
  };

  return (
    <>
      <button
        onClick={() => onOpenChange(!isOpen)}
        className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full
                   bg-charcoal/60 text-ivory backdrop-blur-sm hover:bg-charcoal/80 transition-all duration-200
                   active:scale-95"
        aria-label={isOpen ? 'Close contents' : 'Open contents'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute inset-0 z-40 bg-charcoal/80 backdrop-blur-sm transition-opacity"
          onClick={() => onOpenChange(false)}
        />
      )}

      <div
        className={`absolute top-0 right-0 h-full w-72 max-w-[80vw] z-50 bg-ivory shadow-2xl
                    transform transition-transform duration-300 ease-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!isOpen}
        inert={!isOpen || undefined}
      >
        <div className="h-full flex flex-col p-6">
          <div className="mb-6">
            <h3 className="text-display text-xl text-charcoal mb-1">Contents</h3>
            <div className="w-8 h-px bg-champagne" />
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-0.5">
              {tableOfContents.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavigate(item.pageIndex)}
                    className={`w-full text-left py-2.5 px-3 rounded-sm text-sm transition-colors duration-150
                              ${currentPage === item.pageIndex
                                ? 'bg-champagne/15 text-espresso font-medium'
                                : 'text-warm-gray-dark hover:bg-cream hover:text-charcoal'}`}
                  >
                    <span className="text-meta text-gold-deep mr-3 text-[10px]">
                      {String(item.pageIndex + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 pt-4 border-t border-espresso/10">
            <p className="text-meta text-warm-gray-dark text-center text-[10px]">
              Executive Hideaway Resort & Spa
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
