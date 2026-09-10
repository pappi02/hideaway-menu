'use client';

import { MenuItem as MenuItemType } from '../../types/menu';

interface MenuItemProps {
  item: MenuItemType;
  dark?: boolean;
}

export function MenuItem({ item, dark = false }: MenuItemProps) {
  const mutedText = dark ? 'text-warm-gray-light' : 'text-warm-gray-dark';
  const accentText = dark ? 'text-champagne' : 'text-espresso';

  if (!item.available) {
    return (
      <div className="opacity-50 py-2">
        <div className="flex justify-between items-baseline gap-4">
          <span className="menu-item-name line-through">{item.name}</span>
          {item.price !== undefined && (
            <span className={`price ${mutedText} text-sm`}>—</span>
          )}
        </div>
        <span className={`text-xs ${mutedText} uppercase tracking-wider`}>
          Currently unavailable
        </span>
      </div>
    );
  }

  const isFeatured = item.featured;

  return (
    <div className={`py-2.5 ${isFeatured ? 'border-l-2 border-champagne pl-3 -ml-3' : ''}`}>
      <div className="flex justify-between items-baseline gap-3">
        <div className="flex-1 min-w-0">
          <span className={`menu-item-name ${isFeatured ? accentText : ''} block truncate`}>
            {item.name}
          </span>
        </div>
        {item.price !== undefined && (
          <span className={`price ${accentText} shrink-0`}>
            KSh {item.price.toLocaleString()}
          </span>
        )}
      </div>
      {item.description && (
        <p className={`menu-item-desc ${mutedText} mt-0.5`}>{item.description}</p>
      )}
    </div>
  );
}
