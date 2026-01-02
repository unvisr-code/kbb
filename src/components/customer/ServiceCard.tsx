'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles, Check } from 'lucide-react';
import { Service, SERVICE_CATEGORY_LABELS, DEPOSIT_AMOUNT } from '@/types';
import { formatPrice, formatDuration, cn } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  isSelected?: boolean;
  onSelect?: (service: Service) => void;
  index?: number;
}

export function ServiceCard({ service, isSelected, onSelect, index = 0 }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const remainingAmount = service.price - DEPOSIT_AMOUNT;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(service)}
      className={cn(
        'group relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300',
        isSelected
          ? 'ring-2 ring-primary-500 shadow-lg shadow-primary-500/10'
          : 'border border-neutral-100 hover:border-primary-200 hover:shadow-lg hover:shadow-neutral-200/50'
      )}
    >
      {/* Selected Indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 z-10 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        </motion.div>
      )}

      <div className="flex gap-3 sm:gap-4 p-3 sm:p-4">
        {/* Service Image */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <img
              src={service.images[0]}
              alt={service.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          {/* Featured Badge */}
          {service.isFeatured && (
            <div className="absolute top-1.5 left-1.5 bg-primary-500 text-white px-1.5 py-0.5 rounded text-[11px] font-semibold flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              Popular
            </div>
          )}
        </div>

        {/* Service Info */}
        <div className="flex-1 min-w-0">
          {/* Category */}
          <span className="text-xs font-medium text-primary-500 uppercase tracking-wider">
            {SERVICE_CATEGORY_LABELS[service.category].en}
          </span>

          {/* Name */}
          <h3 className="font-semibold text-neutral-900 mt-0.5 line-clamp-1">
            {service.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
            {service.description}
          </p>

          {/* Duration */}
          <div className="flex items-center gap-1.5 mt-2">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs text-neutral-500">{formatDuration(service.duration)}</span>
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="bg-neutral-50 rounded-xl p-2.5 sm:p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold text-neutral-900">
                {formatPrice(service.price)}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-neutral-500">
                  Deposit: <span className="font-medium text-primary-600">{formatPrice(DEPOSIT_AMOUNT)}</span>
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-xs text-neutral-500">
                  At salon: {formatPrice(remainingAmount > 0 ? remainingAmount : 0)}
                </span>
              </div>
            </div>

            {/* Book Button */}
            <motion.div
              animate={{
                scale: isSelected ? 0.95 : 1,
                opacity: isSelected ? 0.7 : 1
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-semibold transition-colors',
                isSelected
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-primary-500 text-white hover:bg-primary-600'
              )}
            >
              {isSelected ? 'Selected' : 'Select'}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hover Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered && !isSelected ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, rgba(224, 77, 117, 0.03) 0%, transparent 50%)',
        }}
      />
    </motion.article>
  );
}
