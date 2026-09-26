import type { PageSection } from '../../types/menu';
import { DishTags } from './DishTags';

function formatPrice(value: number): string {
  return value.toLocaleString('en-KE');
}

/**
 * One section of a chapter as it appears on a single page.
 *
 * The paginator has already guaranteed this fits, so nothing here scrolls,
 * truncates or clips. A section split across pages reprints its heading with
 * a "continued" mark rather than silently starting mid-list.
 */
export function SectionBlock({ section }: { section: PageSection }) {
  return (
    <section className="menu-section">
      <header className="menu-section-head">
        <h3 className="t-engraved menu-section-title">{section.title}</h3>
        {section.continued && <span className="menu-section-continued">continued</span>}
        <span className="menu-section-rule" aria-hidden="true" />
        {section.note && !section.continued && <p className="menu-section-note">{section.note}</p>}
      </header>

      <ul className="menu-list">
        {section.dishes.map((dish) => {
          const priceText =
            dish.priceNote ?? (dish.price !== undefined ? formatPrice(dish.price) : undefined);

          return (
            <li
              key={dish.id}
              className={`dish-row${dish.unavailable ? ' dish-row--out' : ''}`}
              data-signature={dish.tags?.includes('signature') || undefined}
            >
              <p className="dish-line">
                <span className="t-dish dish-name">
                  {dish.name}
                  <DishTags tags={dish.tags} />
                </span>
                {priceText && <span className="leader" aria-hidden="true" />}
                {priceText && (
                  <span className="t-price dish-price">
                    {dish.unavailable ? '—' : priceText}
                  </span>
                )}
              </p>
              {dish.unavailable ? (
                <p className="t-note dish-note dish-note--out">Off the menu today</p>
              ) : (
                dish.description && <p className="t-note dish-note">{dish.description}</p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
