/** Single source of truth for everything about the venue itself. */
export const venue = {
  name: 'Executive Hideaway',
  descriptor: 'Resort & Spa',
  monogram: 'EH',
  city: 'Nairobi',
  country: 'Kenya',
  address: '275 Nyeri Close, Kileleshwa, Nairobi',
  phone: '+254759944566',
  phoneDisplay: '+254 759 944 566',
  email: 'reservations@executivehideaway.com',
  currency: 'KSh',
  established: 'Est. Nairobi',
  hours: [
    { label: 'Breakfast', value: '07:00 — 11:00' },
    { label: 'Kitchen', value: '11:00 — 22:30' },
    { label: 'The Bar', value: '11:00 — late' },
    { label: 'Spa & Barber', value: '09:00 — 20:00, by appointment' },
  ],
} as const;

export const whatsappLink = `https://wa.me/${venue.phone.replace(/[^0-9]/g, '')}`;
