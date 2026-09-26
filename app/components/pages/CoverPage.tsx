import type { CoverPage as CoverPageType } from '../../types/menu';
import { venue } from '../../data/venue';
import { CornerBrackets, Rule } from '../Ornament';
import { PageFrame } from './PageFrame';

export function CoverPage({ page }: { page: CoverPageType }) {
  return (
    <PageFrame page={page} bare>
      {page.image && (
        <div
          className="cover-image"
          style={{ backgroundImage: `url(${page.image})` }}
          aria-hidden="true"
        />
      )}
      <div className="cover-scrim" aria-hidden="true" />
      <CornerBrackets />

      <div className="cover-content">
        <p className="t-eyebrow cover-place">
          {venue.city} · {venue.country}
        </p>

        <h1 className="t-engraved cover-title">{venue.name}</h1>
        <p className="cover-descriptor">{venue.descriptor}</p>

        <div className="cover-rule">
          <Rule width={150} />
        </div>

        <p className="t-engraved cover-kind">The Menu</p>

        <p className="cover-hint">
          <span className="cover-hint-arrow" aria-hidden="true">
            &#8592;
          </span>
          Turn the page
        </p>
      </div>
    </PageFrame>
  );
}
