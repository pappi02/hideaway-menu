'use client';

import { BookPage } from '../../types/menu';
import { MenuItemList } from '../menu/MenuItemList';

export function MenuDensePage({ page }: { page: BookPage }) {
  return (
    <div className="w-full h-full flex flex-col px-6 py-8 sm:px-8 bg-gradient-to-br from-ivory to-cream">
      <div className="mb-5 shrink-0">
        <p className="text-meta text-gold-deep mb-1.5">{page.section}</p>
        <h2 className="text-display text-2xl sm:text-3xl text-charcoal mb-0.5">{page.title}</h2>
        {page.subtitle && (
          <p className="text-body text-xs text-warm-gray-dark mt-1">{page.subtitle}</p>
        )}
        <div className="w-10 h-px bg-espresso/20 mt-3" />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pr-1">
        {page.content && <MenuItemList content={page.content} />}
      </div>
    </div>
  );
}
