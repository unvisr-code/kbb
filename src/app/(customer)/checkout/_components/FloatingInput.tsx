'use client';

import { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ElementType;
  error?: string;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  function FloatingInput({ label, icon: Icon, error, className, ...props }, ref) {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value && String(props.value).length > 0;

    return (
      <div className={className}>
        <div
          className={cn(
            'relative flex items-center gap-3 px-4 py-4 bg-white rounded-2xl border-2 transition-all duration-300',
            isFocused
              ? 'border-primary-400 shadow-lg shadow-primary-500/10'
              : error
              ? 'border-red-300'
              : 'border-neutral-100 hover:border-neutral-200'
          )}
        >
          <Icon
            className={cn(
              'w-5 h-5 transition-colors duration-300 flex-shrink-0',
              isFocused ? 'text-primary-500' : 'text-neutral-400'
            )}
          />
          <div className="flex-1 relative">
            <motion.label
              initial={false}
              animate={{
                y: isFocused || hasValue ? -20 : 0,
                scale: isFocused || hasValue ? 0.75 : 1,
                color: isFocused ? '#e04d75' : '#9ca3af',
              }}
              className="absolute left-0 origin-left pointer-events-none font-medium"
            >
              {label}
            </motion.label>
            <input
              ref={ref}
              {...props}
              onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                props.onBlur?.(e);
              }}
              className="w-full bg-transparent outline-none text-neutral-900 pt-2"
            />
          </div>
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 text-xs mt-2 ml-4"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
