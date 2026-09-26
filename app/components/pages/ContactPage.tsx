import type { ContactPage as ContactPageType } from '../../types/menu';
import { venue, whatsappLink } from '../../data/venue';
import { Monogram, Rule } from '../Ornament';
import { PageFrame } from './PageFrame';

export function ContactPage({ page }: { page: ContactPageType }) {
  return (
    <PageFrame page={page}>
      {/* The hotel's own shot of the property, kept as the closing image. */}
      <div
        className="page-wash page-wash--strong"
        style={{ backgroundImage: 'url(/images/menu/resort.jpg)' }}
        aria-hidden="true"
      />

      <div className="contact">
        <Monogram size={58} />

        <p className="t-eyebrow contact-eyebrow">Reservations</p>
        <h2 className="t-engraved contact-title">Until Next Time</h2>

        <div className="contact-rule">
          <Rule width={128} />
        </div>

        <dl className="contact-details">
          <div className="contact-row">
            <dt className="t-eyebrow">Address</dt>
            <dd>{venue.address}</dd>
          </div>
          <div className="contact-row">
            <dt className="t-eyebrow">Telephone</dt>
            <dd>{venue.phoneDisplay}</dd>
          </div>
          <div className="contact-row">
            <dt className="t-eyebrow">Email</dt>
            <dd className="contact-email">{venue.email}</dd>
          </div>
        </dl>

        <div className="contact-actions">
          <a className="btn btn--solid" href={`tel:${venue.phone}`}>
            Call the desk
          </a>
          <a className="btn" href={whatsappLink} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a className="btn" href={`mailto:${venue.email}`}>
            Email
          </a>
        </div>

        <p className="contact-sign">
          {venue.name}
          <span className="contact-sign-sub">{venue.descriptor}</span>
        </p>
      </div>
    </PageFrame>
  );
}
