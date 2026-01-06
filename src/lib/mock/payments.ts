export interface Payment {
  id: string;
  bookingId: string;
  salonId: string;
  salonName: string;
  serviceName: string;
  amount: number;
  depositAmount: number;
  status: 'paid' | 'refunded' | 'pending';
  paymentMethod: 'card' | 'kakao_pay' | 'naver_pay';
  paidAt: string;
  refundedAt?: string;
}

export const mockPayments: Payment[] = [
  {
    id: 'pay-001',
    bookingId: 'booking-001',
    salonId: 'salon-001',
    salonName: 'Bloom Nail Studio',
    serviceName: 'Korean Nail Art - Premium',
    amount: 85000,
    depositAmount: 20000,
    status: 'paid',
    paymentMethod: 'card',
    paidAt: '2025-01-05T14:30:00Z',
  },
  {
    id: 'pay-002',
    bookingId: 'booking-002',
    salonId: 'salon-001',
    salonName: 'Bloom Nail Studio',
    serviceName: 'Basic Gel Manicure',
    amount: 45000,
    depositAmount: 20000,
    status: 'paid',
    paymentMethod: 'kakao_pay',
    paidAt: '2025-01-14T15:05:00Z',
  },
  {
    id: 'pay-003',
    bookingId: 'booking-003',
    salonId: 'salon-002',
    salonName: 'Rose Petal Nails',
    serviceName: 'Bridal Nail Art',
    amount: 120000,
    depositAmount: 20000,
    status: 'paid',
    paymentMethod: 'naver_pay',
    paidAt: '2025-01-02T10:15:00Z',
  },
  {
    id: 'pay-004',
    bookingId: 'booking-004',
    salonId: 'salon-003',
    salonName: 'Nail Bar Hongdae',
    serviceName: 'K-pop Style Nail Art',
    amount: 65000,
    depositAmount: 20000,
    status: 'paid',
    paymentMethod: 'card',
    paidAt: '2025-01-05T12:05:00Z',
  },
  {
    id: 'pay-005',
    bookingId: 'booking-005',
    salonId: 'salon-001',
    salonName: 'Bloom Nail Studio',
    serviceName: 'Gel Pedicure',
    amount: 55000,
    depositAmount: 20000,
    status: 'refunded',
    paymentMethod: 'card',
    paidAt: '2025-01-08T08:10:00Z',
    refundedAt: '2025-01-08T14:00:00Z',
  },
];

export const getPayments = (): Payment[] => {
  return mockPayments;
};

export const getPaymentById = (id: string): Payment | undefined => {
  return mockPayments.find((payment) => payment.id === id);
};

export const getPaymentsByStatus = (status: Payment['status']): Payment[] => {
  return mockPayments.filter((payment) => payment.status === status);
};
