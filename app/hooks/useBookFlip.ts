'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FLIP_MS } from '../lib/metrics';
import { useReducedMotion } from './useReducedMotion';

interface Options {
  /** Number of physical leaves in the book. */
  sheetCount: number;
  /** Page index -> leaf index, for jumping from the contents. */
  sheetForPage: (pageIndex: number) => number;
}

/**
 * Tracks how many leaves have been turned.
 *
 * `turned` is the single source of truth: leaf k is turned when k < turned, and
 * `turned` also names the spread currently on screen. Unlike the previous
 * version this does not lock out input for the duration of the animation — a
 * guest flicking quickly through the book gets every turn they ask for, and
 * the leaves simply animate from wherever they happen to be. `settling` exists
 * only so the leaf that is moving can be lifted above its neighbours.
 */
export function useBookFlip({ sheetCount, sheetForPage }: Options) {
  const [turned, setTurned] = useState(0);
  const [settling, setSettling] = useState<number | null>(null);
  const turnedRef = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const go = useCallback(
    (requested: number) => {
      const target = Math.max(0, Math.min(requested, sheetCount));
      const from = turnedRef.current;
      if (target === from) return;

      turnedRef.current = target;
      setTurned(target);

      // The leaf that visibly moves is the one between the two positions.
      const moving = target > from ? target - 1 : target;
      setSettling(moving);

      if (timer.current) clearTimeout(timer.current);
      if (reducedMotion) {
        setSettling(null);
      } else {
        timer.current = setTimeout(() => setSettling(null), FLIP_MS);
      }
    },
    [sheetCount, reducedMotion],
  );

  /**
   * Moves without animating. Used when the viewport crosses the spread
   * breakpoint and the same reading position has to be re-expressed in a
   * different number of leaves.
   */
  const jump = useCallback((sheetIndex: number) => {
    const target = Math.max(0, Math.min(sheetIndex, sheetCount));
    if (target === turnedRef.current) return;
    turnedRef.current = target;
    setTurned(target);
    setSettling(null);
    if (timer.current) clearTimeout(timer.current);
  }, [sheetCount]);

  const next = useCallback(() => go(turnedRef.current + 1), [go]);
  const prev = useCallback(() => go(turnedRef.current - 1), [go]);
  const goToPage = useCallback(
    (pageIndex: number) => go(sheetForPage(pageIndex)),
    [go, sheetForPage],
  );

  return {
    turned,
    settling,
    next,
    prev,
    jump,
    goToPage,
    canGoNext: turned < sheetCount,
    canGoPrev: turned > 0,
    spreadCount: sheetCount + 1,
    reducedMotion,
  };
}
