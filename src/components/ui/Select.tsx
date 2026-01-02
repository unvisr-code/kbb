'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, placeholder, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(
              'flex h-12 w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-base transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100',
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-neutral-200 hover:border-neutral-300',
              className
            )}
            ref={ref}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
        </div>
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
        {hint && !error && <p className="mt-1.5 text-sm text-neutral-500">{hint}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
