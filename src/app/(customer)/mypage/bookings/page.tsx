'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { mockBookings } from '@/lib/mock/bookings';
import { mockSalons } from '@/lib/mock/salons';
import { mockServices } from '@/lib/mock/services';
import { BOOKING_STATUS_LABELS, BookingStatus } from '@/types/booking';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

type TabType = 'upcoming' | 'completed' | 'cancelled';

const TABS: { id: TabType; label: string }[] = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

const getStatusColor = (status: BookingStatus) => {
  const colorMap: Record<string, string> = {
    green: 'bg-green-100 text-green-700',
    yellow: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
    blue: 'bg-blue-100 text-blue-700',
    orange: 'bg-orange-100 text-orange-700',
    neutral: 'bg-neutral-100 text-neutral-700',
  };
  const color = BOOKING_STATUS_LABELS[status]?.color || 'neutral';
  return colorMap[color] || colorMap.neutral;
};

export default function BookingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');

  const upcomingStatuses: BookingStatus[] = ['waiting_confirmation', 'confirmed', 'deposit_paid', 'requested'];
  const completedStatuses: BookingStatus[] = ['completed'];
  const cancelledStatuses: BookingStatus[] = ['rejected', 'cancelled_by_customer', 'refunded', 'no_show'];

  const filteredBookings = mockBookings.filter((booking) => {
    if (activeTab === 'upcoming') return upcomingStatuses.includes(booking.status);
    if (activeTab === 'completed') return completedStatuses.includes(booking.status);
    if (activeTab === 'cancelled') return cancelledStatuses.includes(booking.status);
    return false;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </button>
            <h1 className="font-display text-lg font-semibold text-neutral-900">
              Booking History
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-lg mx-auto px-4">
          <div className="flex gap-2 pb-3">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all',
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {filteredBookings.length > 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {filteredBookings.map((booking, index) => {
                const salon = mockSalons.find((s) => s.id === booking.salonId);
                const service = mockServices.find((s) => s.id === booking.serviceId);
                const statusLabel = BOOKING_STATUS_LABELS[booking.status];

                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`/booking/${booking.id}/result?status=${booking.status === 'confirmed' || booking.status === 'completed' ? 'confirmed' : 'declined'}`}
                      className="block bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {/* Status Banner */}
                      <div className={cn(
                        'px-4 py-2 flex items-center justify-between',
                        getStatusColor(booking.status)
                      )}>
                        <span className="text-xs font-medium">{statusLabel?.en}</span>
                        <span className="text-xs">{booking.id}</span>
                      </div>

                      <div className="p-4">
                        {/* Salon Info */}
                        <div className="flex items-center gap-3 mb-4">
                          {salon && (
                            <>
                              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                                <img
                                  src={salon.thumbnail}
                                  alt={salon.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-neutral-900 truncate">
                                  {salon.name}
                                </h3>
                                <p className="text-xs text-neutral-500 truncate">
                                  {service?.name}
                                </p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-neutral-300 flex-shrink-0" />
                            </>
                          )}
                        </div>

                        {/* Date & Time */}
                        <div className="flex items-center gap-4 text-sm text-neutral-600">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-neutral-400" />
                            <span>
                              {new Date(booking.requestedDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-neutral-400" />
                            <span>{booking.requestedTime}</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
                          <span className="text-sm text-neutral-500">Total</span>
                          <span className="font-semibold text-neutral-900">
                            {formatPrice(booking.totalPrice)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                No {activeTab} bookings
              </h3>
              <p className="text-neutral-500 mb-6">
                {activeTab === 'upcoming'
                  ? 'Book your first appointment!'
                  : activeTab === 'completed'
                  ? "You haven't completed any bookings yet"
                  : 'No cancelled bookings'}
              </p>
              {activeTab === 'upcoming' && (
                <Link
                  href="/"
                  className="inline-flex px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                >
                  Browse Salons
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
