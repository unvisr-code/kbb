'use client';

import { Calendar, Clock } from 'lucide-react';
import { DEPOSIT_AMOUNT } from '@/types';
import { formatPrice } from '@/lib/utils';
import type { Salon, Service } from '@/types';

interface BookingSummaryCardProps {
  salon: Salon;
  service: Service;
  date: string | null;
  time: string | null;
}

const formatBookingDate = (dateString: string | null): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export function BookingSummaryCard({ salon, service, date, time }: BookingSummaryCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-sm">
      <div className="flex gap-4 p-4">
        {/* Salon Image */}
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
          <img
            src={salon.images[0]}
            alt={salon.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Booking Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-neutral-900 truncate">{salon.name}</h3>
          <p className="text-sm text-primary-600 font-medium mt-0.5">{service.name}</p>

          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-neutral-500">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-xs">{formatBookingDate(date)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-500">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-gradient-to-r from-primary-50 to-rose-50 px-4 py-3 border-t border-primary-100/50">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Deposit to pay</span>
          <span className="text-lg font-bold text-primary-600">
            {formatPrice(DEPOSIT_AMOUNT)}
          </span>
        </div>
      </div>
    </div>
  );
}
