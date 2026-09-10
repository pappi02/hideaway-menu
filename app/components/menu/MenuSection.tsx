'use client';

import { MenuCategory } from '../../types/menu';
import { MenuItem } from './MenuItem';

interface MenuSectionProps {
  category: MenuCategory;
  variant?: 'default' | 'compact';
  dark?: boolean;
}

export function MenuSection({ category, variant = 'default', dark = false }: MenuSectionProps) {
  const accentText = dark ? 'text-champagne' : 'text-espresso';

  return (
    <div className={variant === 'compact' ? '' : 'mb-6'}>
      {variant !== 'compact' && (
        <h3 className={`text-display text-lg ${accentText} mb-3 pb-2 border-b border-espresso/10`}>
          {category.title}
        </h3>
      )}
      <div className="space-y-0.5">
        {category.items.map(item => (
          <MenuItem key={item.id} item={item} dark={dark} />
        ))}
      </div>
    </div>
  );
}
