'use client';

import { BookPage } from '../../types/menu';

export function ContactPage({ page }: { page: BookPage }) {
  const phone = '+254759944566';
  const formattedPhone = `+${phone.slice(1, 4)} ${phone.slice(4, 7)} ${phone.slice(7, 10)} ${phone.slice(10)}`;
  const email = 'info@executivehideaway.com';
  const address = '275 Nyeri Close, Kileleshwa, Nairobi, Kenya';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 py-10 bg-gradient-to-br from-charcoal to-charcoal-light text-ivory">
      <div className="text-center max-w-sm w-full">
        <div className="mb-8">
          <div className="w-12 h-px bg-champagne mx-auto mb-6" />
          <p className="text-meta text-champagne-muted mb-4">Thank you for dining with us</p>
        </div>

        <h2 className="text-display text-2xl sm:text-3xl mb-1">{page.title}</h2>
        <p className="text-body text-sm text-warm-gray-light mb-8">{page.subtitle}</p>

        <div className="space-y-4 mb-10">
          <div>
            <p className="text-meta text-warm-gray-light mb-1">Address</p>
            <p className="text-body text-sm">{address}</p>
          </div>

          <div>
            <p className="text-meta text-warm-gray-light mb-1">Phone</p>
            <p className="text-body text-sm">{formattedPhone}</p>
          </div>

          <div>
            <p className="text-meta text-warm-gray-light mb-1">Email</p>
            <p className="text-body text-sm break-all">{email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href={`tel:${phone}`}
            className="block w-full py-3 px-6 bg-champagne text-charcoal font-medium text-sm tracking-wide rounded-sm text-center
                       hover:bg-champagne-muted transition-colors duration-200 active:scale-[0.98]"
          >
            Call
          </a>

          <a
            href={`https://wa.me/${phone}`}
            className="block w-full py-3 px-6 border border-champagne/40 text-champagne font-medium text-sm tracking-wide rounded-sm text-center
                       hover:bg-champagne/10 transition-colors duration-200 active:scale-[0.98]"
          >
            WhatsApp
          </a>

          <a
            href={`mailto:${email}`}
            className="block w-full py-3 px-6 border border-champagne/40 text-champagne font-medium text-sm tracking-wide rounded-sm text-center
                       hover:bg-champagne/10 transition-colors duration-200 active:scale-[0.98]"
          >
            Email
          </a>
        </div>

        <div className="mt-10">
          <p className="text-display text-lg text-champagne">Executive Hideaway</p>
          <p className="text-meta text-warm-gray-light mt-1">Resort & Spa</p>
        </div>
      </div>
    </div>
  );
}
