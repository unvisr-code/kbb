'use client';

import { Calendar, Clock, User, Mail } from 'lucide-react';
import { DEPOSIT_AMOUNT } from '@/types';
import { formatPrice } from '@/lib/utils';
import type { Salon, Service, CustomerInfo } from '@/types';

interface OrderSummaryProps {
  salon: Salon;
  service: Service;
  date: string | null;
  time: string | null;
  customerInfo: CustomerInfo | null;
}

const formatBookingDate = (dateString: string | null): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

export function OrderSummary({ salon, service, date, time, customerInfo }: OrderSummaryProps) {
  return (
    <section className="mb-6">
      <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">
        Order Summary
      </h2>

      <div className="bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-sm">
        {/* Booking Details */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={salon.images[0]}
                alt={salon.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">{salon.name}</h3>
              <p className="text-sm text-primary-600">{service.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatBookingDate(date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
          </div>

          {customerInfo && (
            <div className="flex items-center gap-4 text-sm text-neutral-500 pt-2 border-t border-neutral-100">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{customerInfo.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                <span className="truncate">{customerInfo.email}</span>
              </div>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="bg-neutral-50 p-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">Service Total</span>
            <span className="text-neutral-700">{formatPrice(service.price)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">Pay at Salon</span>
            <span className="text-neutral-700">
              {formatPrice(service.price - DEPOSIT_AMOUNT)}
            </span>
          </div>
          <div className="border-t border-neutral-200 pt-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-900">Deposit Due Now</span>
              <span className="text-xl font-bold text-primary-600">
                {formatPrice(DEPOSIT_AMOUNT)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
