'use client';

import { BookPage } from '../../types/menu';
import { MenuItemList } from '../menu/MenuItemList';

export function ExperiencePage({ page }: { page: BookPage }) {
  const hasImage = !!page.backgroundImage;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {hasImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${page.backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
      )}

      <div className={`relative z-10 h-full flex flex-col ${hasImage ? 'text-ivory' : 'text-charcoal'} px-6 py-8 sm:px-8`}>
        <div className="mb-8 shrink-0 text-center sm:text-left">
          <p className={`text-meta ${hasImage ? 'text-champagne' : 'text-gold-deep'} mb-3 tracking-[0.2em]`}>{page.section}</p>
          <h2 className="text-display text-3xl sm:text-5xl mb-2 leading-tight">{page.title}</h2>
          <p className={`text-body text-sm italic ${hasImage ? 'text-warm-gray-light' : 'text-warm-gray-dark'}`}>{page.subtitle}</p>
          <div className="w-16 h-px bg-champagne mx-auto sm:mx-0 mt-4" />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {page.content && <MenuItemList content={page.content} dark={hasImage} />}
        </div>
      </div>
    </div>
  );
}
