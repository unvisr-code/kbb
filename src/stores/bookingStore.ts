import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Service, Salon, CustomerInfo, Booking } from '@/types';

interface BookingDetails {
  salon: Salon;
  service: Service;
  date: Date | string;
  time: string;
}

// Helper to convert Date to ISO string
function toISOString(date: Date | string): string {
  if (date instanceof Date) {
    return date.toISOString();
  }
  return date;
}

interface BookingState {
  // Selected items
  selectedSalon: Salon | null;
  selectedService: Service | null;
  selectedDate: string | null;
  selectedTime: string | null;

  // Customer info
  customerInfo: CustomerInfo | null;
  customerRequest: string;

  // Current booking
  currentBooking: Booking | null;

  // Actions
  setSelectedSalon: (salon: Salon | null) => void;
  setSelectedService: (service: Service | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
  setCustomerInfo: (info: CustomerInfo | null) => void;
  setCustomerRequest: (request: string) => void;
  setCurrentBooking: (booking: Booking | null) => void;
  setBookingDetails: (details: BookingDetails) => void;
  resetBooking: () => void;
  clearAll: () => void;
}

const initialState = {
  selectedSalon: null,
  selectedService: null,
  selectedDate: null,
  selectedTime: null,
  customerInfo: null,
  customerRequest: '',
  currentBooking: null,
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      ...initialState,

      setSelectedSalon: (salon) => set({ selectedSalon: salon }),
      setSelectedService: (service) => set({ selectedService: service }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setSelectedTime: (time) => set({ selectedTime: time }),
      setCustomerInfo: (info) => set({ customerInfo: info }),
      setCustomerRequest: (request) => set({ customerRequest: request }),
      setCurrentBooking: (booking) => set({ currentBooking: booking }),

      setBookingDetails: (details) =>
        set({
          selectedSalon: details.salon,
          selectedService: details.service,
          selectedDate: toISOString(details.date),
          selectedTime: details.time,
        }),

      resetBooking: () =>
        set({
          selectedDate: null,
          selectedTime: null,
          customerInfo: null,
          customerRequest: '',
          currentBooking: null,
        }),

      clearAll: () => set(initialState),
    }),
    {
      name: 'booking-storage',
      partialize: (state) => ({
        selectedSalon: state.selectedSalon,
        selectedService: state.selectedService,
        selectedDate: state.selectedDate,
        selectedTime: state.selectedTime,
        customerInfo: state.customerInfo,
        customerRequest: state.customerRequest,
      }),
    }
  )
);
