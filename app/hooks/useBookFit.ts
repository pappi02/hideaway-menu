'use client';

import { useCallback, useEffect, useState } from 'react';
import { SINGLE, SPREAD, SPREAD_BREAKPOINT, type PageMetrics } from '../lib/metrics';

export type BookMode = 'spread' | 'single';

interface Fit {
  mode: BookMode;
  metrics: PageMetrics;
  /** Scale applied to the fixed-size canvas so it fills the viewport. */
  scale: number;
  /** Canvas size in design pixels: one page, or two side by side. */
  stageW: number;
  stageH: number;
  /** Screen pixels to lift the book, clearing the navigation pill at the foot. */
  offsetY: number;
  /** False until the first measurement lands, to avoid a mis-scaled flash. */
  ready: boolean;
}

/** Breathing room around the book, so pages never touch the screen edge. */
const PAD_X_PHONE = 14;
const PAD_X_DESKTOP = 28;
const PAD_Y_PHONE = 16;
const PAD_Y_DESKTOP = 44;

/**
 * Measures the viewport and works out how large the book can be drawn.
 *
 * The book is authored at a fixed pixel size and scaled with a CSS transform,
 * which is what lets the paginator guarantee every page fits without measuring
 * content at runtime. Which of the two editions is used — and therefore how
 * much type lands on a page — is decided here.
 */
export function useBookFit(): Fit {
  const [fit, setFit] = useState<Fit>({
    mode: 'single',
    metrics: SINGLE,
    scale: 1,
    stageW: SINGLE.pageW,
    stageH: SINGLE.pageH,
    offsetY: 0,
    ready: false,
  });

  const measure = useCallback(() => {
    const vw = window.innerWidth;
    // visualViewport tracks what is left once mobile browser chrome and any
    // on-screen keyboard are accounted for; innerHeight does not.
    const vh = window.visualViewport?.height ?? window.innerHeight;

    const mode: BookMode = vw >= SPREAD_BREAKPOINT ? 'spread' : 'single';
    const metrics = mode === 'spread' ? SPREAD : SINGLE;
    const stageW = mode === 'spread' ? metrics.pageW * 2 : metrics.pageW;
    const stageH = metrics.pageH;

    const padX = mode === 'spread' ? PAD_X_DESKTOP : PAD_X_PHONE;
    const padY = mode === 'spread' ? PAD_Y_DESKTOP : PAD_Y_PHONE;
    // Room at the foot for the navigation pill, which floats over the book.
    const chromeH = mode === 'spread' ? 72 : 78;

    const scale = Math.min(
      (vw - padX * 2) / stageW,
      (vh - padY * 2 - chromeH) / stageH,
    );

    setFit({
      mode,
      metrics,
      scale: Math.max(scale, 0.1),
      stageW,
      stageH,
      // The book is centred in the room, so half of the space reserved for the
      // navigation pill would otherwise open up above it instead of below.
      offsetY: -chromeH / 2,
      ready: true,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);
    window.visualViewport?.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
      window.visualViewport?.removeEventListener('resize', measure);
    };
  }, [measure]);

  return fit;
}
