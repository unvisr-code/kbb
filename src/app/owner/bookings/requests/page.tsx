'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Calendar,
  User,
  Mail,
  ChevronRight,
  AlertCircle,
  Bell,
} from 'lucide-react';
import { getBookings, getServiceById } from '@/lib/mock';
import { Booking, BOOKING_STATUS_LABELS } from '@/types';
import { formatPrice, cn } from '@/lib/utils';

// Get pending bookings
const getPendingBookings = () => getBookings().filter((b) => b.status === 'waiting_confirmation');

// Countdown timer component
function CountdownTimer({ createdAt }: { createdAt: string }) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const deadline = new Date(createdAt);
    deadline.setHours(deadline.getHours() + 24);
    return Math.max(0, Math.floor((deadline.getTime() - Date.now()) / 1000));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const isUrgent = timeLeft < 3600; // Less than 1 hour

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-mono',
        isUrgent
          ? 'bg-red-50 text-red-600'
          : 'bg-amber-50 text-amber-600'
      )}
    >
      <Clock className="w-4 h-4" />
      <span>
        {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}

export default function BookingRequestsPage() {
  const [filter, setFilter] = useState<'all' | 'today' | 'urgent'>('all');
  const pendingBookings = getPendingBookings();

  const formatBookingDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">예약 요청</h1>
          <p className="text-neutral-500 mt-1">
            새로운 예약 요청을 확인하고 승인해주세요
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <span className="font-semibold text-amber-700">
              {pendingBookings.length}건 대기 중
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { key: 'all', label: '전체' },
          { key: 'today', label: '오늘 예약' },
          { key: 'urgent', label: '긴급 (1시간 이내)' },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key as typeof filter)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors',
              filter === item.key
                ? 'bg-primary-500 text-white'
                : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Booking Cards */}
      {pendingBookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-neutral-100 p-12 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="font-semibold text-neutral-900 mb-2">
            새로운 예약 요청이 없습니다
          </h3>
          <p className="text-neutral-500">
            새 예약 요청이 들어오면 알림을 보내드립니다
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {pendingBookings.map((booking, index) => {
              const service = getServiceById(booking.serviceId);

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/owner/bookings/${booking.id}`}>
                    <div className="bg-white rounded-2xl border border-neutral-100 p-5 hover:shadow-lg hover:border-primary-100 transition-all">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Left: Customer & Service Info */}
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            {/* Service placeholder */}
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-primary-100 flex items-center justify-center">
                              <span className="text-2xl">💅</span>
                            </div>

                            <div className="flex-1 min-w-0">
                              {/* Service */}
                              <h3 className="font-semibold text-neutral-900 mb-1">
                                {service?.name || '시술'}
                              </h3>

                              {/* Customer */}
                              <div className="flex items-center gap-4 text-sm text-neutral-500">
                                <div className="flex items-center gap-1.5">
                                  <User className="w-4 h-4" />
                                  <span>{booking.customerInfo.name}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Mail className="w-4 h-4" />
                                  <span className="truncate max-w-[150px]">
                                    {booking.customerInfo.email}
                                  </span>
                                </div>
                              </div>

                              {/* Date & Time */}
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <div className="flex items-center gap-1.5 text-neutral-700">
                                  <Calendar className="w-4 h-4 text-primary-500" />
                                  <span className="font-medium">
                                    {formatBookingDate(booking.requestedDate)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 text-neutral-700">
                                  <Clock className="w-4 h-4 text-primary-500" />
                                  <span className="font-medium">{booking.requestedTime}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Timer & Actions */}
                        <div className="flex items-center gap-4 lg:border-l lg:border-neutral-100 lg:pl-4">
                          <div className="flex flex-col items-end gap-2">
                            <CountdownTimer createdAt={booking.createdAt} />
                            <span className="text-lg font-bold text-neutral-900">
                              {formatPrice(booking.depositAmount)}
                            </span>
                            <span className="text-xs text-neutral-400">예약금 결제 완료</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-neutral-300" />
                        </div>
                      </div>

                      {/* Special Request */}
                      {booking.customerRequest && (
                        <div className="mt-4 p-3 bg-amber-50 rounded-xl text-sm text-amber-700">
                          <strong>고객 요청사항:</strong> {booking.customerRequest}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
