export interface Review {
  id: string;
  bookingId: string;
  salonId: string;
  salonName: string;
  serviceName: string;
  rating: number;
  comment: string;
  images: string[];
  createdAt: string;
}

export const mockReviews: Review[] = [
  {
    id: 'review-001',
    bookingId: 'booking-004',
    salonId: 'salon-003',
    salonName: 'Nail Bar Hongdae',
    serviceName: 'K-pop Style Nail Art',
    rating: 5,
    comment: 'Amazing BLACKPINK inspired design! The artist was so talented and understood exactly what I wanted. Will definitely come back!',
    images: [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
      'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400',
    ],
    createdAt: '2025-01-10T18:00:00Z',
  },
  {
    id: 'review-002',
    bookingId: 'booking-009',
    salonId: 'salon-005',
    salonName: 'Seongsu Nail Lab',
    serviceName: 'Art Lab Design',
    rating: 5,
    comment: 'The most unique nail art I\'ve ever had! The industrial vibe of the studio was so cool, and the artist created something truly one-of-a-kind for me.',
    images: [
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400',
    ],
    createdAt: '2025-01-08T16:00:00Z',
  },
  {
    id: 'review-003',
    bookingId: 'booking-002',
    salonId: 'salon-001',
    salonName: 'Bloom Nail Studio',
    serviceName: 'Basic Gel Manicure',
    rating: 4,
    comment: 'Great service and friendly staff. The gel lasted for almost 3 weeks without any chips. Location is easy to find too.',
    images: [],
    createdAt: '2025-01-21T12:00:00Z',
  },
];

export const getReviews = (): Review[] => {
  return mockReviews;
};

export const getReviewById = (id: string): Review | undefined => {
  return mockReviews.find((review) => review.id === id);
};

export const getReviewsBySalonId = (salonId: string): Review[] => {
  return mockReviews.filter((review) => review.salonId === salonId);
};
