import type { DishTag } from '../../types/menu';

export const TAG_LABEL: Record<DishTag, string> = {
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  spicy: 'Carries heat',
  signature: 'House signature',
  'gluten-free': 'Gluten free',
  'contains-nuts': 'Contains nuts',
};

export const TAG_GLYPH: Record<DishTag, string> = {
  vegetarian: 'V',
  vegan: 'VG',
  spicy: '●',
  signature: '◆',
  'gluten-free': 'GF',
  'contains-nuts': 'N',
};

export type InlineTag = Exclude<DishTag, 'signature'>;

/** Marks that appear next to a dish name, in a fixed order. */
export const INLINE_TAGS: InlineTag[] = [
  'vegetarian',
  'vegan',
  'gluten-free',
  'contains-nuts',
  'spicy',
];

/**
 * Dietary marks. The visible glyph is decorative and the accessible name
 * carries the meaning; the key is printed on the allergen page.
 *
 * `signature` is deliberately excluded — it is shown as a lozenge in the
 * margin by `.dish-row[data-signature]`, so repeating it inline would be
 * saying the same thing twice.
 */
export function DishTags({ tags }: { tags?: DishTag[] }) {
  if (!tags?.length) return null;
  const ordered = INLINE_TAGS.filter((tag) => tags.includes(tag));
  if (ordered.length === 0) return null;

  return (
    <span className="dish-tags">
      {ordered.map((tag) => (
        <span key={tag} className={`dish-tag dish-tag--${tag}`}>
          <span aria-hidden="true">{TAG_GLYPH[tag]}</span>
          <span className="sr-only">{TAG_LABEL[tag]}</span>
        </span>
      ))}
    </span>
  );
}
