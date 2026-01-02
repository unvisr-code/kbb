export type ServiceCategory =
  | 'gel_nail'
  | 'nail_art'
  | 'pedicure'
  | 'nail_care'
  | 'removal'
  | 'extension'
  | 'hand_care';

export interface Service {
  id: string;
  salonId: string;
  name: string;
  nameKr: string;
  description: string;
  descriptionKr: string;
  category: ServiceCategory;
  duration: number; // minutes
  price: number;
  depositAmount: number; // always 20000
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, { en: string; kr: string }> = {
  gel_nail: { en: 'Gel Nail', kr: '젤 네일' },
  nail_art: { en: 'Nail Art', kr: '네일 아트' },
  pedicure: { en: 'Pedicure', kr: '페디큐어' },
  nail_care: { en: 'Nail Care', kr: '네일 케어' },
  removal: { en: 'Removal', kr: '제거' },
  extension: { en: 'Extension', kr: '연장' },
  hand_care: { en: 'Hand Care', kr: '핸드 케어' },
};

export const DEPOSIT_AMOUNT = 20000; // Fixed deposit amount in KRW
export const PLATFORM_FEE = 5000; // Platform fee from deposit
export const SALON_PAYOUT = 15000; // Salon payout from deposit
