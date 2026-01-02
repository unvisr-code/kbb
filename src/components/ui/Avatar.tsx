'use client';

import { cn, getInitials } from '@/lib/utils';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
};

const imageSizes = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

function Avatar({ src, alt, name, size = 'md', className }: AvatarProps) {
  const initials = name ? getInitials(name) : '?';

  if (src) {
    return (
      <div
        className={cn(
          'relative rounded-full overflow-hidden bg-neutral-200 flex-shrink-0',
          sizes[size],
          className
        )}
      >
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="object-cover w-full h-full"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-medium flex-shrink-0',
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
}

export { Avatar };
