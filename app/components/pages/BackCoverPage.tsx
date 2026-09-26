import type { BackCoverPage as BackCoverPageType, PlatePage as PlatePageType } from '../../types/menu';
import { venue } from '../../data/venue';
import { CornerBrackets, Monogram } from '../Ornament';
import { PageFrame } from './PageFrame';

export function BackCoverPage({ page }: { page: BackCoverPageType }) {
  return (
    <PageFrame page={page} bare>
      <div className="back-cover-scrim" aria-hidden="true" />
      <CornerBrackets inset={30} length={40} />
      <div className="back-cover">
        <Monogram size={72} />
        <p className="t-engraved back-cover-name">{venue.name}</p>
        <p className="back-cover-sub">
          {venue.address} · {venue.phoneDisplay}
        </p>
      </div>
    </PageFrame>
  );
}

/**
 * A full-bleed photographic plate.
 *
 * It also does the arithmetic work of the old blank leaf: a book needs an even
 * page count, and the back matter has to fall so that the last content spread
 * is the allergen note beside the reservations page. A plate is a better way
 * to spend that leaf than a blank one.
 */
export function PlateLeaf({ page }: { page: PlatePageType }) {
  return (
    <PageFrame page={page} bare>
      <div
        className="chapter-image"
        style={{
          backgroundImage: `url(${page.image})`,
          backgroundPosition: page.imagePosition ?? 'center',
        }}
        aria-hidden="true"
      />
      <div className="plate-scrim" aria-hidden="true" />
      <div className="plate-caption">
        <Monogram size={40} />
        {page.caption && <p>{page.caption}</p>}
      </div>
    </PageFrame>
  );
}
