'use client';

import { useEffect, type RefObject } from 'react';

interface Options {
  onNext?: () => void;
  onPrev?: () => void;
  /** Minimum horizontal travel, in CSS pixels, before a swipe counts. */
  threshold?: number;
  enabled?: boolean;
}

/**
 * Horizontal swipe detection, scoped to the book itself.
 *
 * The previous version bound to `document` and called `preventDefault` on any
 * touchmove with horizontal intent, which suppressed gestures across the whole
 * page including inside the contents drawer. Binding to the element means the
 * drawer, links and buttons keep their native behaviour.
 */
export function useSwipe(
  ref: RefObject<HTMLElement | null>,
  { onNext, onPrev, threshold = 55, enabled = true }: Options,
) {
  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;

    let startX = 0;
    let startY = 0;
    let startedAt = 0;
    let horizontal: boolean | null = null;

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      startedAt = Date.now();
      horizontal = null;
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      // Decide the gesture's axis once, then stick with it.
      if (horizontal === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
        horizontal = Math.abs(dx) > Math.abs(dy);
      }
      if (horizontal) e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!horizontal) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - startX;
      const elapsed = Date.now() - startedAt;

      // A short, fast flick counts even when it falls short of the threshold.
      const flick = elapsed < 300 && Math.abs(dx) > 28;
      if (Math.abs(dx) < threshold && !flick) return;

      if (dx < 0) onNext?.();
      else onPrev?.();
    };

    node.addEventListener('touchstart', onTouchStart, { passive: true });
    node.addEventListener('touchmove', onTouchMove, { passive: false });
    node.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      node.removeEventListener('touchstart', onTouchStart);
      node.removeEventListener('touchmove', onTouchMove);
      node.removeEventListener('touchend', onTouchEnd);
    };
  }, [ref, onNext, onPrev, threshold, enabled]);
}
