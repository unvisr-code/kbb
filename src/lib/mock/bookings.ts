import { Booking, TimeSlot, DEPOSIT_AMOUNT } from '@/types';

export const mockBookings: Booking[] = [
  {
    id: 'booking-001',
    salonId: 'salon-001',
    serviceId: 'service-002',
    customerId: null,
    customerInfo: {
      name: 'Emily Johnson',
      phone: '1234567890',
      email: 'emily@example.com',
      countryCode: '+1',
    },
    requestedDate: '2025-01-20',
    requestedTime: '14:00',
    status: 'waiting_confirmation',
    totalPrice: 85000,
    depositAmount: DEPOSIT_AMOUNT,
    remainingAmount: 65000,
    paymentId: 'pay-001',
    paymentStatus: 'paid',
    customerRequest: 'I would like a soft pink color with some sparkle if possible!',
    rejectionReason: null,
    createdAt: '2025-01-15T10:25:00Z',
    depositPaidAt: '2025-01-15T10:30:00Z',
  },
  {
    id: 'booking-002',
    salonId: 'salon-001',
    serviceId: 'service-001',
    customerId: null,
    customerInfo: {
      name: 'Sarah Williams',
      phone: '9876543210',
      email: 'sarah@example.com',
      countryCode: '+44',
    },
    requestedDate: '2025-01-21',
    requestedTime: '11:00',
    status: 'confirmed',
    totalPrice: 45000,
    depositAmount: DEPOSIT_AMOUNT,
    remainingAmount: 25000,
    paymentId: 'pay-002',
    paymentStatus: 'paid',
    customerRequest: null,
    rejectionReason: null,
    createdAt: '2025-01-14T15:00:00Z',
    depositPaidAt: '2025-01-14T15:05:00Z',
    confirmedAt: '2025-01-14T18:00:00Z',
  },
  {
    id: 'booking-003',
    salonId: 'salon-002',
    serviceId: 'service-006',
    customerId: null,
    customerInfo: {
      name: 'Yuki Tanaka',
      phone: '08012345678',
      email: 'yuki@example.jp',
      countryCode: '+81',
    },
    requestedDate: '2025-01-25',
    requestedTime: '13:00',
    status: 'waiting_confirmation',
    totalPrice: 120000,
    depositAmount: DEPOSIT_AMOUNT,
    remainingAmount: 100000,
    paymentId: 'pay-003',
    paymentStatus: 'paid',
    customerRequest: 'Getting married next month! Looking for elegant pearl designs.',
    rejectionReason: null,
    createdAt: '2025-01-15T09:00:00Z',
    depositPaidAt: '2025-01-15T09:10:00Z',
  },
  {
    id: 'booking-004',
    salonId: 'salon-003',
    serviceId: 'service-008',
    customerId: null,
    customerInfo: {
      name: 'Lisa Chen',
      phone: '13812345678',
      email: 'lisa@example.cn',
      countryCode: '+86',
    },
    requestedDate: '2025-01-10',
    requestedTime: '16:00',
    status: 'completed',
    totalPrice: 65000,
    depositAmount: DEPOSIT_AMOUNT,
    remainingAmount: 45000,
    paymentId: 'pay-004',
    paymentStatus: 'paid',
    customerRequest: 'BLACKPINK inspired design please!',
    rejectionReason: null,
    createdAt: '2025-01-05T12:00:00Z',
    depositPaidAt: '2025-01-05T12:05:00Z',
    confirmedAt: '2025-01-05T14:00:00Z',
    completedAt: '2025-01-10T17:30:00Z',
  },
  {
    id: 'booking-005',
    salonId: 'salon-001',
    serviceId: 'service-003',
    customerId: null,
    customerInfo: {
      name: 'Anna Schmidt',
      phone: '15112345678',
      email: 'anna@example.de',
      countryCode: '+49',
    },
    requestedDate: '2025-01-12',
    requestedTime: '10:00',
    status: 'rejected',
    totalPrice: 55000,
    depositAmount: DEPOSIT_AMOUNT,
    remainingAmount: 35000,
    paymentId: 'pay-005',
    paymentStatus: 'refunded',
    customerRequest: null,
    rejectionReason: 'Fully booked at this time',
    createdAt: '2025-01-08T08:00:00Z',
    depositPaidAt: '2025-01-08T08:10:00Z',
    rejectedAt: '2025-01-08T10:00:00Z',
  },
  {
    id: 'booking-006',
    salonId: 'salon-007',
    serviceId: 'service-016',
    customerId: null,
    customerInfo: {
      name: 'Jessica Park',
      phone: '0212345678',
      email: 'jessica.park@example.com',
      countryCode: '+64',
    },
    requestedDate: '2025-01-22',
    requestedTime: '15:00',
    status: 'waiting_confirmation',
    totalPrice: 35000,
    depositAmount: DEPOSIT_AMOUNT,
    remainingAmount: 15000,
    paymentId: 'pay-006',
    paymentStatus: 'paid',
    customerRequest: 'First time in Korea! Would love a trendy design.',
    rejectionReason: null,
    createdAt: '2025-01-18T14:00:00Z',
    depositPaidAt: '2025-01-18T14:05:00Z',
  },
  {
    id: 'booking-007',
    salonId: 'salon-004',
    serviceId: 'service-011',
    customerId: null,
    customerInfo: {
      name: 'Marie Dubois',
      phone: '0612345678',
      email: 'marie.dubois@example.fr',
      countryCode: '+33',
    },
    requestedDate: '2025-01-28',
    requestedTime: '11:00',
    status: 'confirmed',
    totalPrice: 180000,
    depositAmount: DEPOSIT_AMOUNT,
    remainingAmount: 160000,
    paymentId: 'pay-007',
    paymentStatus: 'paid',
    customerRequest: 'Special anniversary dinner. Gold and diamond theme please!',
    rejectionReason: null,
    createdAt: '2025-01-16T09:30:00Z',
    depositPaidAt: '2025-01-16T09:35:00Z',
    confirmedAt: '2025-01-16T11:00:00Z',
  },
  {
    id: 'booking-008',
    salonId: 'salon-008',
    serviceId: 'service-019',
    customerId: null,
    customerInfo: {
      name: 'Olivia Brown',
      phone: '0412345678',
      email: 'olivia.b@example.au',
      countryCode: '+61',
    },
    requestedDate: '2025-01-24',
    requestedTime: '14:30',
    status: 'confirmed',
    totalPrice: 60000,
    depositAmount: DEPOSIT_AMOUNT,
    remainingAmount: 40000,
    paymentId: 'pay-008',
    paymentStatus: 'paid',
    customerRequest: 'Nude/natural look for work meetings.',
    rejectionReason: null,
    createdAt: '2025-01-17T16:00:00Z',
    depositPaidAt: '2025-01-17T16:05:00Z',
    confirmedAt: '2025-01-17T18:30:00Z',
  },
  {
    id: 'booking-009',
    salonId: 'salon-005',
    serviceId: 'service-012',
    customerId: null,
    customerInfo: {
      name: 'Sophia Martinez',
      phone: '5551234567',
      email: 'sophia.m@example.mx',
      countryCode: '+52',
    },
    requestedDate: '2025-01-08',
    requestedTime: '13:00',
    status: 'completed',
    totalPrice: 90000,
    depositAmount: DEPOSIT_AMOUNT,
    remainingAmount: 70000,
    paymentId: 'pay-009',
    paymentStatus: 'paid',
    customerRequest: 'Love unique art! Surprise me with something creative.',
    rejectionReason: null,
    createdAt: '2025-01-03T10:00:00Z',
    depositPaidAt: '2025-01-03T10:10:00Z',
    confirmedAt: '2025-01-03T12:00:00Z',
    completedAt: '2025-01-08T15:00:00Z',
  },
  {
    id: 'booking-010',
    salonId: 'salon-006',
    serviceId: 'service-014',
    customerId: null,
    customerInfo: {
      name: 'Mia Thompson',
      phone: '2012345678',
      email: 'mia.thompson@example.com',
      countryCode: '+1',
    },
    requestedDate: '2025-01-26',
    requestedTime: '17:00',
    status: 'waiting_confirmation',
    totalPrice: 48000,
    depositAmount: DEPOSIT_AMOUNT,
    remainingAmount: 28000,
    paymentId: 'pay-010',
    paymentStatus: 'paid',
    customerRequest: 'Something that matches my new dress - burgundy!',
    rejectionReason: null,
    createdAt: '2025-01-19T11:00:00Z',
    depositPaidAt: '2025-01-19T11:10:00Z',
  },
];

export const getBookings = (): Booking[] => {
  return mockBookings;
};

export const getBookingById = (id: string): Booking | undefined => {
  return mockBookings.find((booking) => booking.id === id);
};

export const getBookingsBySalonId = (salonId: string): Booking[] => {
  return mockBookings.filter((booking) => booking.salonId === salonId);
};

export const getPendingBookings = (salonId: string): Booking[] => {
  return mockBookings.filter(
    (booking) => booking.salonId === salonId && booking.status === 'waiting_confirmation'
  );
};

export const getConfirmedBookings = (salonId: string): Booking[] => {
  return mockBookings.filter(
    (booking) => booking.salonId === salonId && booking.status === 'confirmed'
  );
};

export const generateTimeSlots = (
  date: string,
  salonId: string,
  duration: number = 60
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 10;
  const endHour = 20;

  // Simulate some booked slots
  const bookedSlots = ['11:00', '14:00', '15:30'];

  for (let hour = startHour; hour < endHour; hour++) {
    for (const minute of [0, 30]) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      // Check if slot is booked or randomly unavailable
      const isBooked = bookedSlots.includes(time);
      const isRandomlyUnavailable = Math.random() < 0.2;

      slots.push({
        time,
        isAvailable: !isBooked && !isRandomlyUnavailable,
      });
    }
  }

  return slots;
};
