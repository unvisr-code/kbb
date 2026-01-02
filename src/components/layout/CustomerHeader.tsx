'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CustomerHeaderProps {
  variant?: 'default' | 'transparent';
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
  rightAction?: React.ReactNode;
}

export function CustomerHeader({
  variant = 'default',
  showBackButton = false,
  onBack,
  title,
  rightAction,
}: CustomerHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full',
        variant === 'default'
          ? 'bg-white/80 backdrop-blur-lg border-b border-neutral-100'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left */}
          <div className="flex items-center gap-3">
            {showBackButton && (
              <button
                onClick={onBack}
                className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-neutral-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            {title ? (
              <h1 className="text-lg font-semibold text-neutral-900">{title}</h1>
            ) : (
              <Link href="/" className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">K</span>
                  </div>
                </div>
                <span className="font-display font-semibold text-xl text-neutral-900">
                  K-Booking
                </span>
              </Link>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {rightAction}
          </div>
        </div>
      </div>
    </header>
  );
}
