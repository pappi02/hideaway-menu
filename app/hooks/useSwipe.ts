'use client';

import { useRef, useCallback, useEffect } from 'react';

interface SwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  enabled?: boolean;
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 60,
  enabled = true,
}: SwipeOptions) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const onTouchStart = useCallback((e: TouchEvent) => {
    if (!enabledRef.current) return;
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    touchEnd.current = null;
    isDragging.current = true;
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!enabledRef.current || !isDragging.current || !touchStart.current) return;
    touchEnd.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    const diffX = Math.abs(touchEnd.current.x - touchStart.current.x);
    const diffY = Math.abs(touchEnd.current.y - touchStart.current.y);

    if (diffX > diffY && diffX > 10) {
      e.preventDefault();
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!enabledRef.current || !touchStart.current || !touchEnd.current) {
      isDragging.current = false;
      touchStart.current = null;
      touchEnd.current = null;
      return;
    }

    const diffX = touchStart.current.x - touchEnd.current.x;
    const diffY = touchStart.current.y - touchEnd.current.y;
    const absX = Math.abs(diffX);
    const absY = Math.abs(diffY);

    if (absX > absY && absX > threshold) {
      if (diffX > 0) {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    }

    isDragging.current = false;
    touchStart.current = null;
    touchEnd.current = null;
  }, [onSwipeLeft, onSwipeRight, threshold]);

  useEffect(() => {
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [onTouchStart, onTouchMove, onTouchEnd]);
}
