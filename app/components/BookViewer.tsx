'use client';

import { useEffect, useState } from 'react';
import { menuPages } from '../data/menuData';
import { usePageFlip } from '../hooks/usePageFlip';
import { useSwipe } from '../hooks/useSwipe';
import { BookPageComponent } from './BookPage';
import { PageFlipControls } from './PageFlipControls';
import { PageIndicator } from './PageIndicator';
import { ContentsDrawer } from './ContentsDrawer';

export function BookViewer() {
  const {
    currentPage,
    isFlipping,
    nextPage,
    prevPage,
    goToPage,
    canGoNext,
    canGoPrev,
    totalPages,
  } = usePageFlip(menuPages.length);

  const [isContentsOpen, setIsContentsOpen] = useState(false);

  useSwipe({
    onSwipeLeft: nextPage,
    onSwipeRight: prevPage,
    threshold: 60,
    enabled: !isContentsOpen,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isContentsOpen) {
        e.preventDefault();
        setIsContentsOpen(false);
        return;
      }

      if (isContentsOpen) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage, isContentsOpen]);

  return (
    <div className="relative w-full h-screen bg-charcoal overflow-hidden flex items-center justify-center p-2 sm:p-4 md:p-8">
      <div className="book-viewport relative w-full max-w-md md:max-w-5xl h-full max-h-[850px] mx-auto">
        {menuPages.map((page, index) => (
          <BookPageComponent
            key={page.id}
            page={page}
            isTurned={index < currentPage}
            isVisible={index === currentPage}
            isFlipping={isFlipping}
            zIndex={menuPages.length - index}
          />
        ))}

        <PageFlipControls
          onPrev={prevPage}
          onNext={nextPage}
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
        />

        <PageIndicator
          currentPage={currentPage}
          totalPages={totalPages}
        />

        <ContentsDrawer
          currentPage={currentPage}
          onNavigate={goToPage}
          isOpen={isContentsOpen}
          onOpenChange={setIsContentsOpen}
        />
      </div>

      <div className="hidden lg:block fixed bottom-4 left-4 text-warm-gray-light text-xs">
        <p>Use arrow keys or click edges to navigate</p>
      </div>
    </div>
  );
}
