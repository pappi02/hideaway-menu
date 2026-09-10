'use client';

import { BookPage } from '../../types/menu';

export function CoverPage({ page }: { page: BookPage }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-8 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${page.backgroundImage || '/images/menu/cover.jpg'})` }}
      >
        <div className="absolute inset-0 bg-charcoal/75" />
      </div>

      <div className="relative z-10">
        <div className="mb-8">
          <div className="w-16 h-px bg-champagne mx-auto mb-6" />
          <p className="text-meta text-champagne-muted mb-4">Nairobi, Kenya</p>
        </div>

        <h1 className="text-display text-4xl sm:text-5xl text-ivory mb-3 tracking-tight">
          {page.title}
        </h1>
        <p className="text-display text-xl text-champagne italic mb-2">
          {page.subtitle}
        </p>

        <div className="mt-8">
          <div className="w-16 h-px bg-champagne mx-auto mb-6" />
          <p className="text-meta text-warm-gray-light tracking-[0.2em]">
            {page.section}
          </p>
        </div>

        <div className="mt-12">
          <p className="text-xs text-warm-gray-light/60 tracking-wider animate-pulse">
            Swipe to explore
          </p>
        </div>
      </div>
    </div>
  );
}
