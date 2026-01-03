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
  const [statusFilter, setStatusFilter] = useState<'waiting' | 'confirmed' | 'completed'>('waiting');
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'urgent'>('all');

  // Get bookings based on status filter
  const getFilteredBookings = () => {
    const allBookings = getBookings();
    let filtered: Booking[] = [];

    if (statusFilter === 'waiting') {
      filtered = allBookings.filter((b) => b.status === 'waiting_confirmation');
    } else if (statusFilter === 'confirmed') {
      filtered = allBookings.filter((b) => b.status === 'confirmed');
    } else {
      filtered = allBookings.filter((b) => b.status === 'completed' || b.status === 'no_show');
    }

    return filtered;
  };

  const filteredBookings = getFilteredBookings();

  const formatBookingDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4 mb-5 sm:mb-6 lg:mb-8">
        <div className="flex items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">예약 요청</h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 sm:mt-1">
              새로운 예약 요청을 확인하고 승인해주세요
            </p>
          </div>

          {/* Stats */}
          <div className={cn(
            'flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl flex-shrink-0',
            statusFilter === 'waiting' && 'bg-amber-50',
            statusFilter === 'confirmed' && 'bg-green-50',
            statusFilter === 'completed' && 'bg-blue-50'
          )}>
            <AlertCircle className={cn(
              'w-4 h-4 sm:w-5 sm:h-5',
              statusFilter === 'waiting' && 'text-amber-500',
              statusFilter === 'confirmed' && 'text-green-500',
              statusFilter === 'completed' && 'text-blue-500'
            )} />
            <span className={cn(
              'font-semibold text-sm sm:text-base',
              statusFilter === 'waiting' && 'text-amber-700',
              statusFilter === 'confirmed' && 'text-green-700',
              statusFilter === 'completed' && 'text-blue-700'
            )}>
              {filteredBookings.length}건
              <span className="hidden sm:inline">
                {statusFilter === 'waiting' ? ' 대기 중' :
                 statusFilter === 'confirmed' ? ' 예정' : ' 완료'}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        {[
          { key: 'waiting', label: '대기 중', count: getBookings().filter(b => b.status === 'waiting_confirmation').length },
          { key: 'confirmed', label: '확정', count: getBookings().filter(b => b.status === 'confirmed').length },
          { key: 'completed', label: '완료', count: getBookings().filter(b => b.status === 'completed' || b.status === 'no_show').length },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setStatusFilter(item.key as typeof statusFilter)}
            className={cn(
              'px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 sm:gap-2',
              statusFilter === item.key
                ? 'bg-primary-500 text-white'
                : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
            )}
          >
            {item.label}
            <span className={cn(
              'text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded-full',
              statusFilter === item.key
                ? 'bg-white/20'
                : 'bg-neutral-100'
            )}>
              {item.count}
            </span>
          </button>
        ))}
      </div>

      {/* Time Filters (for waiting status) */}
      {statusFilter === 'waiting' && (
        <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          {[
            { key: 'all', label: '전체' },
            { key: 'today', label: '오늘 예약' },
            { key: 'urgent', label: '긴급' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setTimeFilter(item.key as typeof timeFilter)}
              className={cn(
                'px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap transition-colors',
                timeFilter === item.key
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Booking Cards */}
      {filteredBookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ willChange: 'transform, opacity' }}
          className="bg-white rounded-xl sm:rounded-2xl border border-neutral-100 p-8 sm:p-12 text-center"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-400" />
          </div>
          <h3 className="font-semibold text-neutral-900 mb-1.5 sm:mb-2 text-sm sm:text-base">
            {statusFilter === 'waiting' ? '새로운 예약 요청이 없습니다' :
             statusFilter === 'confirmed' ? '확정된 예약이 없습니다' : '완료된 예약이 없습니다'}
          </h3>
          <p className="text-neutral-500 text-xs sm:text-sm">
            {statusFilter === 'waiting' ? '새 예약 요청이 들어오면 알림을 보내드립니다' :
             statusFilter === 'confirmed' ? '예약이 승인되면 여기에 표시됩니다' : '시술이 완료되면 여기에 표시됩니다'}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          <AnimatePresence>
            {filteredBookings.map((booking, index) => {
              const service = getServiceById(booking.serviceId);

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.03 }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <Link href={`/owner/bookings/${booking.id}`}>
                    <div className="bg-white rounded-xl sm:rounded-2xl border border-neutral-100 p-3.5 sm:p-4 lg:p-5 hover:shadow-lg hover:border-primary-100 transition-all active:scale-[0.99]">
                      <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center">
                        {/* Left: Customer & Service Info */}
                        <div className="flex-1">
                          <div className="flex items-start gap-3 sm:gap-4">
                            {/* Service placeholder */}
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 bg-primary-100 flex items-center justify-center">
                              <span className="text-xl sm:text-2xl">💅</span>
                            </div>

                            <div className="flex-1 min-w-0">
                              {/* Service */}
                              <h3 className="font-semibold text-neutral-900 text-sm sm:text-base mb-0.5 sm:mb-1">
                                {service?.name || '시술'}
                              </h3>

                              {/* Customer */}
                              <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-neutral-500">
                                <div className="flex items-center gap-1 sm:gap-1.5">
                                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                  <span>{booking.customerInfo.name}</span>
                                </div>
                                <div className="hidden sm:flex items-center gap-1.5">
                                  <Mail className="w-4 h-4" />
                                  <span className="truncate max-w-[150px]">
                                    {booking.customerInfo.email}
                                  </span>
                                </div>
                              </div>

                              {/* Date & Time */}
                              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mt-1.5 sm:mt-2 text-xs sm:text-sm">
                                <div className="flex items-center gap-1 sm:gap-1.5 text-neutral-700">
                                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-500" />
                                  <span className="font-medium">
                                    {formatBookingDate(booking.requestedDate)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-1.5 text-neutral-700">
                                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-500" />
                                  <span className="font-medium">{booking.requestedTime}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Timer & Actions */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 lg:border-l lg:border-neutral-100 lg:pl-4 border-neutral-100">
                          <div className="flex flex-col items-start sm:items-end gap-1 sm:gap-2">
                            <CountdownTimer createdAt={booking.createdAt} />
                            <div className="flex items-baseline gap-1.5 sm:gap-2">
                              <span className="text-base sm:text-lg font-bold text-neutral-900">
                                {formatPrice(booking.depositAmount)}
                              </span>
                              <span className="text-[10px] sm:text-xs text-neutral-400">예약금</span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-neutral-300" />
                        </div>
                      </div>

                      {/* Special Request */}
                      {booking.customerRequest && (
                        <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-amber-50 rounded-lg sm:rounded-xl text-xs sm:text-sm text-amber-700">
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
