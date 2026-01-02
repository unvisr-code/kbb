export type Region =
  | 'gangnam'
  | 'hongdae'
  | 'seongsu'
  | 'itaewon'
  | 'myeongdong'
  | 'sinsa'
  | 'apgujeong';

export type Amenity =
  | 'wifi'
  | 'parking'
  | 'card_payment'
  | 'english_menu'
  | 'japanese_menu'
  | 'chinese_menu'
  | 'reservation_only'
  | 'wheelchair_accessible'
  | 'child_friendly';

export interface BusinessHours {
  dayOfWeek: number; // 0-6 (Sun-Sat)
  openTime: string;  // "10:00"
  closeTime: string; // "20:00"
  isClosed: boolean;
}

export interface Salon {
  id: string;
  name: string;
  nameKr: string;
  description: string;
  descriptionKr: string;
  address: string;
  addressKr: string;
  region: Region;
  phone: string;
  images: string[];
  thumbnail: string;
  rating: number;
  reviewCount: number;
  isForeignerFriendly: boolean;
  amenities: Amenity[];
  businessHours: BusinessHours[];
  startingPrice: number;
  ownerId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SalonFilters {
  region?: Region;
  sortBy?: 'recommended' | 'price_low' | 'price_high' | 'rating';
  foreignerFriendlyOnly?: boolean;
}

export const REGION_LABELS: Record<Region, { en: string; kr: string }> = {
  gangnam: { en: 'Gangnam', kr: '강남' },
  hongdae: { en: 'Hongdae', kr: '홍대' },
  seongsu: { en: 'Seongsu', kr: '성수' },
  itaewon: { en: 'Itaewon', kr: '이태원' },
  myeongdong: { en: 'Myeongdong', kr: '명동' },
  sinsa: { en: 'Sinsa', kr: '신사' },
  apgujeong: { en: 'Apgujeong', kr: '압구정' },
};

export const AMENITY_LABELS: Record<Amenity, { en: string; kr: string; icon: string }> = {
  wifi: { en: 'Free WiFi', kr: '무료 와이파이', icon: 'wifi' },
  parking: { en: 'Parking', kr: '주차 가능', icon: 'car' },
  card_payment: { en: 'Card Payment', kr: '카드 결제', icon: 'credit-card' },
  english_menu: { en: 'English Menu', kr: '영문 메뉴', icon: 'globe' },
  japanese_menu: { en: 'Japanese Menu', kr: '일문 메뉴', icon: 'globe' },
  chinese_menu: { en: 'Chinese Menu', kr: '중문 메뉴', icon: 'globe' },
  reservation_only: { en: 'Reservation Only', kr: '예약제', icon: 'calendar-check' },
  wheelchair_accessible: { en: 'Wheelchair Accessible', kr: '휠체어 이용 가능', icon: 'accessibility' },
  child_friendly: { en: 'Child Friendly', kr: '어린이 동반 가능', icon: 'baby' },
};

export const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const DAY_LABELS_KR = ['일', '월', '화', '수', '목', '금', '토'];
