'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { countryCodes, type CountryCode } from '../_schemas/customerInfoSchema';

interface CountryCodePickerProps {
  value: string;
  phoneValue: string;
  onChange: (code: string) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function CountryCodePicker({
  value,
  phoneValue,
  onChange,
  onPhoneChange,
  error,
}: CountryCodePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const selectedCountry = countryCodes.find((c) => c.code === value) || countryCodes[0];

  return (
    <div className="relative">
      <div
        className={cn(
          'relative flex items-center gap-2 px-4 py-4 bg-white rounded-2xl border-2 transition-all duration-300',
          error
            ? 'border-red-300'
            : 'border-neutral-100 hover:border-neutral-200 focus-within:border-primary-400 focus-within:shadow-lg focus-within:shadow-primary-500/10'
        )}
      >
        <Phone className="w-5 h-5 text-neutral-400 flex-shrink-0" />

        {/* Country Code Selector */}
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="flex items-center gap-1 px-2 py-1 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
        >
          <span>{selectedCountry.flag}</span>
          <span className="text-sm font-medium text-neutral-700">{selectedCountry.code}</span>
          <ChevronDown className="w-3 h-3 text-neutral-400" />
        </button>

        <input
          type="tel"
          placeholder="Phone number"
          value={phoneValue}
          onChange={onPhoneChange}
          className="flex-1 bg-transparent outline-none text-neutral-900 placeholder:text-neutral-400"
        />
      </div>

      {/* Country Code Dropdown */}
      <AnimatePresence>
        {showPicker && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowPicker(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-neutral-100 shadow-xl z-20 overflow-hidden"
            >
              {countryCodes.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    onChange(country.code);
                    setShowPicker(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors',
                    value === country.code && 'bg-primary-50'
                  )}
                >
                  <span className="text-xl">{country.flag}</span>
                  <span className="font-medium text-neutral-700">{country.code}</span>
                  <span className="text-sm text-neutral-400">{country.country}</span>
                  {value === country.code && (
                    <Check className="w-4 h-4 text-primary-500 ml-auto" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs mt-2 ml-4"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
