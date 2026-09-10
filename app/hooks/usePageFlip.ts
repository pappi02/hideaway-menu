'use client';

import { useState, useCallback, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface PageFlipState {
  currentPage: number;
  isFlipping: boolean;
}

export function usePageFlip(totalPages: number) {
  const [state, setState] = useState<PageFlipState>({
    currentPage: 0,
    isFlipping: false,
  });

  const reducedMotion = useReducedMotion();
  const flipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToPage = useCallback((targetPage: number) => {
    setState(prev => {
      if (prev.isFlipping) return prev;
      if (targetPage < 0 || targetPage >= totalPages) return prev;
      if (targetPage === prev.currentPage) return prev;

      if (reducedMotion) {
        return { currentPage: targetPage, isFlipping: false };
      }

      if (flipTimeout.current) clearTimeout(flipTimeout.current);

      flipTimeout.current = setTimeout(() => {
        setState(s => ({ ...s, isFlipping: false }));
      }, 600);

      return { currentPage: targetPage, isFlipping: true };
    });
  }, [totalPages, reducedMotion]);

  const nextPage = useCallback(() => {
    goToPage(state.currentPage + 1);
  }, [goToPage, state.currentPage]);

  const prevPage = useCallback(() => {
    goToPage(state.currentPage - 1);
  }, [goToPage, state.currentPage]);

  const canGoNext = state.currentPage < totalPages - 1;
  const canGoPrev = state.currentPage > 0;

  return {
    ...state,
    nextPage,
    prevPage,
    goToPage,
    canGoNext,
    canGoPrev,
    totalPages,
    reducedMotion,
  };
}
