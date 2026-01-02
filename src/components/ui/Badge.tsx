'use client';

import { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-neutral-100 text-neutral-700',
        primary: 'bg-primary-100 text-primary-700',
        secondary: 'bg-neutral-200 text-neutral-800',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-amber-100 text-amber-700',
        danger: 'bg-red-100 text-red-700',
        info: 'bg-blue-100 text-blue-700',
        accent: 'bg-accent-100 text-accent-700',
        outline: 'border border-neutral-300 text-neutral-700 bg-transparent',
        'outline-primary': 'border border-primary-300 text-primary-600 bg-transparent',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
