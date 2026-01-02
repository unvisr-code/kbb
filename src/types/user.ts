// Provider types - separated for clarity
export type OwnerProvider = 'kakao' | 'google';
export type CustomerProvider = 'google' | 'guest';

export interface Owner {
  id: string;
  email: string;
  name: string;
  phone: string;
  salonId: string | null;
  provider: OwnerProvider;
  providerId: string;
  isOnboarded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone: string;
  countryCode: string;
  provider: CustomerProvider;
  providerId: string | null;
  bookingIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GuestCustomer {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
}

export const COUNTRY_CODES = [
  { code: '+1', country: 'US/Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+82', country: 'Korea', flag: '🇰🇷' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
  { code: '+886', country: 'Taiwan', flag: '🇹🇼' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
];
