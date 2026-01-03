'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  ChevronDown,
  Search,
  UserX,
  Loader2,
} from 'lucide-react';
import { getBookings, getServiceById } from '@/lib/mock';
import { Booking } from '@/types';
import { formatPrice, formatDuration, cn } from '@/lib/utils';

// Get confirmed bookings
const getConfirmedBookings = () => getBookings().filter((b) => b.status === 'confirmed');

// Group bookings by date
const groupByDate = (bookings: Booking[]) => {
  const groups: Record<string, Booking[]> = {};

  bookings.forEach((booking) => {
    const dateKey = new Date(booking.requestedDate).toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(booking);
  });

  return Object.entries(groups)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, bookings]) => ({
      date: new Date(date),
      bookings: bookings.sort((a, b) => a.requestedTime.localeCompare(b.requestedTime)),
    }));
};

export default function ConfirmedBookingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDates, setExpandedDates] = useState<string[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [processingAction, setProcessingAction] = useState<'complete' | 'no_show' | null>(null);
  const confirmedBookings = getConfirmedBookings();

  const handleComplete = async (bookingId: string) => {
    setProcessingId(bookingId);
    setProcessingAction('complete');
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProcessingId(null);
    setProcessingAction(null);
    // In real implementation, refresh the list
  };

  const handleNoShow = async (bookingId: string) => {
    setProcessingId(bookingId);
    setProcessingAction('no_show');
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProcessingId(null);
    setProcessingAction(null);
    // In real implementation, refresh the list
  };

  const groupedBookings = groupByDate(confirmedBookings);

  const formatDateHeader = (date: Date): string => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return '오늘';
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return '내일';
    }
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  const toggleDate = (dateStr: string) => {
    setExpandedDates((prev) =>
      prev.includes(dateStr)
        ? prev.filter((d) => d !== dateStr)
        : [...prev, dateStr]
    );
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">확정된 예약</h1>
          <p className="text-neutral-500 mt-1">
            승인 완료된 예약 일정을 확인하세요
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-green-700">
              {confirmedBookings.length}건 예정
            </span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="고객명 또는 서비스 검색..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
        />
      </div>

      {/* Bookings by Date */}
      {groupedBookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-neutral-100 p-12 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="font-semibold text-neutral-900 mb-2">
            확정된 예약이 없습니다
          </h3>
          <p className="text-neutral-500">
            새로운 예약이 승인되면 여기에 표시됩니다
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {groupedBookings.map((group, groupIndex) => {
            const dateKey = group.date.toDateString();
            const isExpanded = expandedDates.includes(dateKey);

            return (
              <motion.div
                key={dateKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: groupIndex * 0.05 }}
                className="bg-white rounded-2xl border border-neutral-100 overflow-hidden"
              >
                {/* Date Header */}
                <button
                  onClick={() => toggleDate(dateKey)}
                  className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-neutral-900">
                        {formatDateHeader(group.date)}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {group.bookings.length}건의 예약
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-neutral-400 transition-transform',
                      isExpanded && 'rotate-180'
                    )}
                  />
                </button>

                {/* Booking List */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="border-t border-neutral-100"
                  >
                    {group.bookings.map((booking, index) => {
                      const service = getServiceById(booking.serviceId);

                      return (
                        <div
                          key={booking.id}
                          className={cn(
                            'flex items-center gap-4 p-4',
                            index !== group.bookings.length - 1 &&
                              'border-b border-neutral-50'
                          )}
                        >
                          {/* Time */}
                          <div className="w-16 text-center">
                            <p className="text-lg font-bold text-primary-600">
                              {booking.requestedTime}
                            </p>
                          </div>

                          {/* Service placeholder */}
                          <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-primary-100 flex items-center justify-center">
                            <span className="text-xl">💅</span>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-neutral-900 truncate">
                              {service?.name || '시술'}
                            </h4>
                            <div className="flex items-center gap-3 text-sm text-neutral-500">
                              <div className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                <span>{booking.customerInfo.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{service ? formatDuration(service.duration) : '-'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="font-semibold text-neutral-900">
                              {formatPrice(booking.totalPrice)}
                            </p>
                            <p className="text-xs text-green-600">
                              예약금 {formatPrice(booking.depositAmount)}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            {/* Call Button */}
                            <a
                              href={`tel:${booking.customerInfo.phone}`}
                              className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-primary-100 flex items-center justify-center transition-colors"
                            >
                              <Phone className="w-4 h-4 text-neutral-600" />
                            </a>

                            {/* Complete Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleComplete(booking.id);
                              }}
                              disabled={processingId === booking.id}
                              className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1"
                            >
                              {processingId === booking.id && processingAction === 'complete' ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              )}
                              완료
                            </button>

                            {/* No Show Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNoShow(booking.id);
                              }}
                              disabled={processingId === booking.id}
                              className="px-3 py-2 bg-neutral-200 hover:bg-red-100 hover:text-red-600 text-neutral-600 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1"
                            >
                              {processingId === booking.id && processingAction === 'no_show' ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <UserX className="w-3.5 h-3.5" />
                              )}
                              노쇼
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
