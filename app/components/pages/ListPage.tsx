import type { ListPage as ListPageType } from '../../types/menu';
import { SectionBlock } from '../menu/SectionBlock';
import { PageFrame } from './PageFrame';

/**
 * A page of the menu proper.
 *
 * There is no overflow container anywhere in this component: the paginator has
 * already decided exactly what fits, so the page renders its content at full
 * height and stops.
 */
export function ListPage({ page }: { page: ListPageType }) {
  return (
    <PageFrame page={page}>
      {page.image && (
        <div
          className="page-wash"
          style={{
            backgroundImage: `url(${page.image})`,
            backgroundPosition: page.imagePosition ?? 'center',
          }}
          aria-hidden="true"
        />
      )}

      <header className="page-head">
        <p className="t-eyebrow page-head-eyebrow">
          {page.eyebrow}
          {page.continued && <span className="page-head-cont"> · continued</span>}
        </p>
        <h2 className="t-engraved page-head-title">{page.title}</h2>
        <span className="page-head-rule" aria-hidden="true" />
      </header>

      <div
        className={`page-body page-body--cols-${page.columns}`}
        style={page.bodyOffset ? { paddingTop: page.bodyOffset } : undefined}
      >
        <div className="page-column">
          {page.columnA.map((section, i) => (
            <SectionBlock key={`a-${section.id}-${i}`} section={section} />
          ))}
        </div>
        {page.columns === 2 && (
          <div className="page-column">
            {page.columnB.map((section, i) => (
              <SectionBlock key={`b-${section.id}-${i}`} section={section} />
            ))}
          </div>
        )}
      </div>

      {page.footnote && <p className="page-footnote">{page.footnote}</p>}
    </PageFrame>
  );
}
