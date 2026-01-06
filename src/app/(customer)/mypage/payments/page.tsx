'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CreditCard,
  CheckCircle2,
  RefreshCw,
  Receipt,
} from 'lucide-react';
import { mockPayments, Payment } from '@/lib/mock/payments';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

const getStatusConfig = (status: Payment['status']) => {
  switch (status) {
    case 'paid':
      return {
        icon: CheckCircle2,
        label: 'Paid',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
      };
    case 'refunded':
      return {
        icon: RefreshCw,
        label: 'Refunded',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
      };
    case 'pending':
      return {
        icon: CreditCard,
        label: 'Pending',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
      };
  }
};

const getPaymentMethodLabel = (method: Payment['paymentMethod']) => {
  switch (method) {
    case 'card':
      return 'Credit Card';
    case 'kakao_pay':
      return 'Kakao Pay';
    case 'naver_pay':
      return 'Naver Pay';
  }
};

export default function PaymentsPage() {
  const router = useRouter();

  // Calculate totals
  const totalPaid = mockPayments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.depositAmount, 0);
  const totalRefunded = mockPayments
    .filter((p) => p.status === 'refunded')
    .reduce((sum, p) => sum + p.depositAmount, 0);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </button>
            <h1 className="font-display text-lg font-semibold text-neutral-900">
              Payment History
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <div className="bg-white rounded-2xl border border-neutral-100 p-4">
            <p className="text-sm text-neutral-500 mb-1">Total Deposits Paid</p>
            <p className="text-xl font-bold text-green-600">{formatPrice(totalPaid)}</p>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-100 p-4">
            <p className="text-sm text-neutral-500 mb-1">Total Refunded</p>
            <p className="text-xl font-bold text-amber-600">{formatPrice(totalRefunded)}</p>
          </div>
        </motion.div>

        {/* Payment List */}
        {mockPayments.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            {mockPayments.map((payment, index) => {
              const statusConfig = getStatusConfig(payment.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="bg-white rounded-2xl border border-neutral-100 overflow-hidden"
                >
                  <div className="p-4">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-neutral-900">
                          {payment.salonName}
                        </h3>
                        <p className="text-sm text-neutral-500">{payment.serviceName}</p>
                      </div>
                      <div className={cn(
                        'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                        statusConfig.bgColor,
                        statusConfig.color
                      )}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusConfig.label}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-500">Deposit Amount</span>
                        <span className="font-medium text-neutral-900">
                          {formatPrice(payment.depositAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-500">Service Total</span>
                        <span className="text-neutral-600">
                          {formatPrice(payment.amount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-500">Payment Method</span>
                        <span className="text-neutral-600">
                          {getPaymentMethodLabel(payment.paymentMethod)}
                        </span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                      <span>{payment.id}</span>
                      <span>
                        {new Date(payment.paidAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-10 h-10 text-green-300" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              No payment history
            </h3>
            <p className="text-neutral-500">
              Your payment records will appear here
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
