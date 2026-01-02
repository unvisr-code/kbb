'use client';

import { motion } from 'framer-motion';
import { DEPOSIT_AMOUNT } from '@/types';
import { formatPrice, cn } from '@/lib/utils';

interface CheckoutFooterProps {
  servicePrice: number;
  isValid: boolean;
  onSubmit: () => void;
}

export function CheckoutFooter({ servicePrice, isValid, onSubmit }: CheckoutFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-neutral-100 z-40">
      <div className="max-w-lg mx-auto px-4 py-4 pb-safe-bottom">
        {/* Summary */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-neutral-500">Deposit amount</p>
            <p className="text-xs text-neutral-400">
              Remaining {formatPrice(servicePrice - DEPOSIT_AMOUNT)} at salon
            </p>
          </div>
          <p className="text-2xl font-bold text-primary-600">{formatPrice(DEPOSIT_AMOUNT)}</p>
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={onSubmit}
          disabled={!isValid}
          whileHover={isValid ? { scale: 1.02 } : {}}
          whileTap={isValid ? { scale: 0.98 } : {}}
          className={cn(
            'w-full py-4 rounded-2xl font-semibold text-white transition-all flex items-center justify-center gap-2',
            isValid
              ? 'bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/30'
              : 'bg-neutral-300 cursor-not-allowed'
          )}
        >
          {isValid ? (
            <>
              Proceed to Payment
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </>
          ) : (
            'Fill in all required fields'
          )}
        </motion.button>
      </div>
    </div>
  );
}
