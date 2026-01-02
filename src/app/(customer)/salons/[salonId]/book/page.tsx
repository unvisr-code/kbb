'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Calendar as CalendarIcon,
  Sparkles,
  Check,
  ChevronRight,
} from 'lucide-react';
import { getSalonById, getServicesBySalonId } from '@/lib/mock';
import { Service, DEPOSIT_AMOUNT } from '@/types';
import { formatPrice, formatDuration, cn } from '@/lib/utils';
import { Calendar } from '@/components/customer/Calendar';
import { TimeSlotPicker } from '@/components/customer/TimeSlotPicker';
import { useBookingStore } from '@/stores/bookingStore';

const formatDateDisplay = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatShortDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export default function BookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const salonId = params.salonId as string;
  const preSelectedServiceId = searchParams.get('serviceId');

  const salon = getSalonById(salonId);
  const services = getServicesBySalonId(salonId);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { setBookingDetails } = useBookingStore();

  // Pre-select service from URL params
  useEffect(() => {
    if (preSelectedServiceId && services.length > 0) {
      const service = services.find((s) => s.id === preSelectedServiceId);
      if (service) {
        setSelectedService(service);
      }
    }
  }, [preSelectedServiceId, services]);

  const canContinue = selectedService && selectedDate && selectedTime;

  const handleContinue = () => {
    if (canContinue && salon) {
      setBookingDetails({
        salon,
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
      });
      router.push('/checkout');
    }
  };

  if (!salon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-500">Salon not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white pb-32">
      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/salons/${salonId}`}
              className="w-10 h-10 rounded-full bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </Link>

            <div className="flex-1">
              <h1 className="font-display text-lg font-semibold text-neutral-900">
                Book Appointment
              </h1>
              <p className="text-xs text-neutral-500">{salon.name}</p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 flex items-center gap-2">
                <div
                  className={cn(
                    'w-full h-1 rounded-full transition-all duration-500',
                    step === 1
                      ? 'bg-primary-500'
                      : 'bg-neutral-200'
                  )}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs font-medium text-primary-600">Date & Time</span>
            <span className="text-xs text-neutral-400">Your Info</span>
            <span className="text-xs text-neutral-400">Payment</span>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Service Selection (if not pre-selected) */}
        <AnimatePresence mode="wait">
          {!selectedService ? (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <h2 className="font-display text-xl font-semibold text-neutral-900 mb-4">
                Select a Service
              </h2>
              <div className="space-y-3">
                {services.map((service, index) => (
                  <motion.button
                    key={service.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedService(service)}
                    className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-neutral-100 hover:border-primary-200 hover:shadow-lg transition-all text-left group"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={service.images[0]}
                        alt={service.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-neutral-500">
                          {formatDuration(service.duration)}
                        </span>
                        <span className="text-sm font-medium text-primary-600">
                          {formatPrice(service.price)}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-primary-400 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </motion.section>
          ) : (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              {/* Selected Service Card */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-semibold text-neutral-900">
                  Selected Service
                </h2>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    setSelectedDate(null);
                    setSelectedTime(null);
                  }}
                  className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                >
                  Change
                </button>
              </div>

              <motion.div
                layoutId="selectedServiceCard"
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-primary-100 shadow-sm"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={selectedService.images[0]}
                    alt={selectedService.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="flex-1 min-w-0">
                  {selectedService.isFeatured && (
                    <div className="inline-flex items-center gap-1 bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full text-[10px] font-semibold mb-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Popular Choice
                    </div>
                  )}
                  <h3 className="font-semibold text-neutral-900">
                    {selectedService.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-neutral-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-sm">
                        {formatDuration(selectedService.duration)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-semibold text-neutral-900">
                    {formatPrice(selectedService.price)}
                  </div>
                  <div className="text-xs text-neutral-400">total</div>
                </div>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Calendar Section */}
        {selectedService && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <CalendarIcon className="w-4 h-4 text-primary-600" />
              </div>
              <h2 className="font-display text-lg font-semibold text-neutral-900">
                Choose a Date
              </h2>
            </div>

            <Calendar
              selectedDate={selectedDate}
              onSelectDate={(date) => {
                setSelectedDate(date);
                setSelectedTime(null); // Reset time when date changes
              }}
            />
          </motion.section>
        )}

        {/* Time Slots Section */}
        {selectedService && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center">
                <Clock className="w-4 h-4 text-accent-600" />
              </div>
              <h2 className="font-display text-lg font-semibold text-neutral-900">
                Select a Time
              </h2>
            </div>

            <TimeSlotPicker
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
              serviceDuration={selectedService.duration}
            />
          </motion.section>
        )}

        {/* Booking Summary */}
        <AnimatePresence>
          {selectedService && selectedDate && selectedTime && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-6"
            >
              <h2 className="font-display text-lg font-semibold text-neutral-900 mb-4">
                Booking Summary
              </h2>

              <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-5">
                <div className="space-y-4">
                  {/* Date & Time */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <CalendarIcon className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Date & Time</p>
                      <p className="font-medium text-neutral-900">
                        {formatDateDisplay(selectedDate)}
                      </p>
                      <p className="text-primary-600 font-semibold">
                        {selectedTime}
                      </p>
                    </div>
                  </div>

                  {/* Service */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Sparkles className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Service</p>
                      <p className="font-medium text-neutral-900">
                        {selectedService.name}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {formatDuration(selectedService.duration)}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-primary-100 pt-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-500">Deposit to pay now</p>
                        <p className="text-xs text-neutral-400">
                          Remaining {formatPrice(selectedService.price - DEPOSIT_AMOUNT)} at salon
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-600">
                          {formatPrice(DEPOSIT_AMOUNT)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-100 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 pb-safe-bottom">
          <AnimatePresence mode="wait">
            {!canContinue ? (
              <motion.div
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-2"
              >
                <p className="text-neutral-500">
                  {!selectedService
                    ? 'Select a service to continue'
                    : !selectedDate
                    ? 'Select a date to continue'
                    : 'Select a time to continue'}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-3"
              >
                {/* Summary Line */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-600" />
                    </div>
                    <span className="text-neutral-600">
                      {formatShortDate(selectedDate!)} at {selectedTime}
                    </span>
                  </div>
                  <span className="font-semibold text-primary-600">
                    {formatPrice(DEPOSIT_AMOUNT)} deposit
                  </span>
                </div>

                {/* Continue Button */}
                <motion.button
                  onClick={handleContinue}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  Continue to Checkout
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
