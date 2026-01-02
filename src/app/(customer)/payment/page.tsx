'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lock, Loader2 } from 'lucide-react';
import { DEPOSIT_AMOUNT } from '@/types';
import { formatPrice, cn } from '@/lib/utils';
import { useBookingStore } from '@/stores/bookingStore';
import {
  OrderSummary,
  PaymentMethodSelector,
  ProcessingOverlay,
  SecurityBadges,
  type PaymentMethod,
} from './_components';
import { useMockPayment } from './_hooks/useMockPayment';

export default function PaymentPage() {
  const router = useRouter();
  const { selectedSalon, selectedService, selectedDate, selectedTime, customerInfo } =
    useBookingStore();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('apple');
  const { isProcessing, processPayment } = useMockPayment();

  // Redirect if no booking data
  useEffect(() => {
    if (!selectedSalon || !selectedService || !selectedDate || !selectedTime) {
      router.push('/');
    }
  }, [selectedSalon, selectedService, selectedDate, selectedTime, router]);

  if (!selectedSalon || !selectedService) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-rose-50/30 pb-36">
      {/* Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-72 h-72 bg-primary-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-20 w-60 h-60 bg-accent-100/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/checkout"
              className="w-10 h-10 rounded-full bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </Link>

            <div className="flex-1">
              <h1 className="font-display text-lg font-semibold text-neutral-900">
                Complete Payment
              </h1>
              <p className="text-xs text-neutral-500">Step 3 of 3</p>
            </div>

            <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
              <Lock className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Secure</span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1">
                <div className="h-1 rounded-full bg-primary-500 transition-all duration-500" />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-primary-400">Date & Time</span>
            <span className="text-xs text-primary-400">Your Info</span>
            <span className="text-xs font-medium text-primary-600">Payment</span>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <OrderSummary
            salon={selectedSalon}
            service={selectedService}
            date={selectedDate}
            time={selectedTime}
            customerInfo={customerInfo}
          />
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <PaymentMethodSelector
            selected={selectedPaymentMethod}
            onSelect={setSelectedPaymentMethod}
          />
        </motion.div>

        {/* Demo Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6"
        >
          <p className="text-sm text-amber-700">
            <strong>Demo Mode:</strong> This is a demo payment. No real transaction will be processed.
            Click the button below to simulate a successful payment.
          </p>
        </motion.div>

        {/* Security Badges */}
        <SecurityBadges />
      </main>

      {/* Sticky Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-neutral-100 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 pb-safe-bottom">
          <motion.button
            onClick={processPayment}
            disabled={isProcessing}
            whileHover={!isProcessing ? { scale: 1.02 } : {}}
            whileTap={!isProcessing ? { scale: 0.98 } : {}}
            className={cn(
              'w-full py-4 rounded-2xl font-semibold text-white transition-all flex items-center justify-center gap-2',
              !isProcessing
                ? 'bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/30'
                : 'bg-neutral-300 cursor-not-allowed'
            )}
          >
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Payment...
                </motion.div>
              ) : (
                <motion.div
                  key="pay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Pay {formatPrice(DEPOSIT_AMOUNT)} Deposit
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <p className="text-xs text-neutral-400 text-center mt-3">
            By paying, you agree to our Terms of Service and Cancellation Policy
          </p>
        </div>
      </div>

      {/* Processing Overlay */}
      <ProcessingOverlay isVisible={isProcessing} />
    </div>
  );
}
