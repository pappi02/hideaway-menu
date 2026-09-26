import type { ChapterPage as ChapterPageType } from '../../types/menu';
import { Rule } from '../Ornament';
import { PageFrame } from './PageFrame';

/**
 * A full-bleed divider introducing a chapter. Photography lives here rather
 * than on the listing pages, where it would compete with the type.
 */
export function ChapterPage({ page }: { page: ChapterPageType }) {
  return (
    <PageFrame page={page}>
      {page.image && (
        <div
          className="chapter-image"
          style={{
            backgroundImage: `url(${page.image})`,
            backgroundPosition: page.imagePosition ?? 'center',
          }}
          aria-hidden="true"
        />
      )}
      <div className="chapter-scrim" aria-hidden="true" />

      <div className="chapter-content">
        <p className="t-eyebrow chapter-eyebrow">{page.eyebrow}</p>
        <h2 className="t-engraved chapter-title">{page.title}</h2>
        {page.standfirst && <p className="chapter-standfirst">{page.standfirst}</p>}

        <div className="chapter-rule">
          <Rule width={132} />
        </div>

        {page.note && <p className="chapter-note">{page.note}</p>}
      </div>
    </PageFrame>
  );
}
