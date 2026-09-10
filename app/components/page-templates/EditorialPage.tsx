'use client';

import { BookPage } from '../../types/menu';
import { MenuItemList } from '../menu/MenuItemList';

export function EditorialPage({ page }: { page: BookPage }) {
  const hasImage = !!page.backgroundImage;
  const overlayClass = page.overlay === 'dark' ? 'bg-charcoal/80' :
                       page.overlay === 'light' ? 'bg-ivory/90' :
                       page.overlay === 'cream' ? 'bg-cream/90' : '';

  return (
    <div className="relative w-full h-full overflow-hidden">
      {hasImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${page.backgroundImage})` }}
        />
      )}
      {overlayClass && <div className={`absolute inset-0 ${overlayClass}`} />}

      <div className={`relative z-10 h-full flex flex-col ${hasImage ? 'text-ivory' : 'text-charcoal'} px-6 py-8 sm:px-8`}>
        <div className="mb-6 shrink-0">
          <p className={`text-meta ${hasImage ? 'text-champagne' : 'text-gold-deep'} mb-2`}>{page.section}</p>
          <h2 className="text-display text-3xl sm:text-4xl mb-1">{page.title}</h2>
          {page.subtitle && (
            <p className="text-body text-sm opacity-80">{page.subtitle}</p>
          )}
          <div className="w-12 h-px bg-champagne mt-4" />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {page.content && <MenuItemList content={page.content} dark={hasImage} />}
        </div>
      </div>
    </div>
  );
}
