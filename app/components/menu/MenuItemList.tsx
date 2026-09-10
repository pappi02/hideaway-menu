'use client';

import { MenuCategory } from '../../types/menu';
import { MenuSection } from './MenuSection';

interface MenuItemListProps {
  content: MenuCategory | MenuCategory[];
  dark?: boolean;
}

export function MenuItemList({ content, dark = false }: MenuItemListProps) {
  const categories = Array.isArray(content) ? content : [content];

  return (
    <div className="space-y-6">
      {categories.map(category => (
        <MenuSection key={category.id} category={category} dark={dark} />
      ))}
    </div>
  );
}
