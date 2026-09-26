import type { StatementPage as StatementPageType } from '../../types/menu';
import { Monogram, Rule } from '../Ornament';
import { INLINE_TAGS, TAG_GLYPH, TAG_LABEL } from '../menu/DishTags';
import { PageFrame } from './PageFrame';

/** A single paragraph given a whole page — the welcome and the allergen note. */
export function StatementPage({ page }: { page: StatementPageType }) {
  const tone = page.stock === 'bone' ? 'ink' : 'brass';

  return (
    <PageFrame page={page}>
      {page.image && (
        <div
          className="page-wash page-wash--strong"
          style={{
            backgroundImage: `url(${page.image})`,
            backgroundPosition: page.imagePosition ?? 'center',
          }}
          aria-hidden="true"
        />
      )}

      <div className="statement">
        <Monogram size={54} tone={tone} />
        <p className="t-eyebrow statement-eyebrow">{page.eyebrow}</p>
        <h2 className="t-engraved statement-title">{page.title}</h2>
        <div className="statement-rule">
          <Rule width={118} tone={tone} />
        </div>
        <p className="t-prose statement-body">{page.body}</p>

        {page.legend && (
          <dl className="legend">
            <div className="legend-row">
              <dt className="legend-glyph legend-glyph--signature">{TAG_GLYPH.signature}</dt>
              <dd>{TAG_LABEL.signature}</dd>
            </div>
            {INLINE_TAGS.map((tag) => (
              <div key={tag} className="legend-row">
                <dt className={`legend-glyph dish-tag--${tag}`}>{TAG_GLYPH[tag]}</dt>
                <dd>{TAG_LABEL[tag]}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </PageFrame>
  );
}
