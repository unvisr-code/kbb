export type BookingStatus =
  | 'draft'
  | 'requested'
  | 'deposit_paid'
  | 'waiting_confirmation'
  | 'confirmed'
  | 'rejected'
  | 'refund_pending'
  | 'refunded'
  | 'completed'
  | 'no_show'
  | 'cancelled_by_customer';

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  countryCode: string;
}

export interface Booking {
  // Required identifiers
  id: string;
  salonId: string;
  serviceId: string;
  customerInfo: CustomerInfo;

  // Booking details
  requestedDate: string; // ISO date string "2024-01-15"
  requestedTime: string; // 24-hour format "14:00"
  status: BookingStatus;

  // Pricing
  totalPrice: number;
  depositAmount: number;
  remainingAmount: number;

  // Nullable fields (explicitly null when not set)
  customerId: string | null;
  paymentId: string | null;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded' | null;
  customerRequest: string | null;
  rejectionReason: string | null;

  // Timestamps - required creation time
  createdAt: string;

  // Event timestamps - optional until event occurs
  depositPaidAt?: string;
  confirmedAt?: string;
  rejectedAt?: string;
  completedAt?: string;
}

export interface TimeSlot {
  time: string; // "10:00"
  isAvailable: boolean;
}

export const BOOKING_STATUS_LABELS: Record<BookingStatus, { en: string; kr: string; color: string }> = {
  draft: { en: 'Draft', kr: '임시저장', color: 'neutral' },
  requested: { en: 'Requested', kr: '요청됨', color: 'blue' },
  deposit_paid: { en: 'Deposit Paid', kr: '예약금 결제완료', color: 'blue' },
  waiting_confirmation: { en: 'Waiting for Confirmation', kr: '승인 대기중', color: 'yellow' },
  confirmed: { en: 'Confirmed', kr: '확정', color: 'green' },
  rejected: { en: 'Rejected', kr: '거절됨', color: 'red' },
  refund_pending: { en: 'Refund Processing', kr: '환불 처리중', color: 'orange' },
  refunded: { en: 'Refunded', kr: '환불 완료', color: 'neutral' },
  completed: { en: 'Completed', kr: '완료', color: 'green' },
  no_show: { en: 'No Show', kr: '노쇼', color: 'red' },
  cancelled_by_customer: { en: 'Cancelled', kr: '고객 취소', color: 'neutral' },
};

export const REJECTION_REASONS = [
  { id: 'fully_booked', en: 'Fully booked at this time', kr: '해당 시간 예약 마감' },
  { id: 'service_unavailable', en: 'Service temporarily unavailable', kr: '해당 시술 임시 중단' },
  { id: 'shop_closed', en: 'Shop closed on this date', kr: '해당 날짜 휴무' },
  { id: 'other', en: 'Other reason', kr: '기타 사유' },
];
