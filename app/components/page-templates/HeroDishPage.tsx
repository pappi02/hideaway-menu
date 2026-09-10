'use client';

import { BookPage } from '../../types/menu';
import { MenuItemList } from '../menu/MenuItemList';

export function HeroDishPage({ page }: { page: BookPage }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {page.backgroundImage && (
        <div className="absolute top-0 left-0 right-0 h-[55%]">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${page.backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal" />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-charcoal text-ivory px-6 py-6 sm:px-8">
        <div className="h-full flex flex-col">
          <div className="mb-3 shrink-0">
            <p className="text-meta text-champagne mb-1">{page.section}</p>
            <h2 className="text-display text-2xl sm:text-3xl">{page.title}</h2>
            {page.subtitle && (
              <p className="text-body text-xs text-warm-gray-light mt-1">{page.subtitle}</p>
            )}
            <div className="w-10 h-px bg-champagne mt-3" />
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {page.content && <MenuItemList content={page.content} dark />}
          </div>
        </div>
      </div>
    </div>
  );
}
