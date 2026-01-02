'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, MapPin, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { Salon, REGION_LABELS } from '@/types';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface SalonCardProps {
  salon: Salon;
  index?: number;
}

export function SalonCard({ salon, index = 0 }: SalonCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % salon.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + salon.images.length) % salon.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/salons/${salon.id}`}>
        <motion.article
          className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {/* Main Image */}
            <motion.div
              className="absolute inset-0"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={salon.images[currentImage]}
                alt={salon.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

            {/* Image Navigation - Only show if multiple images */}
            {salon.images.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  onClick={prevImage}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-9 sm:h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4 text-neutral-700" />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  onClick={nextImage}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-9 sm:h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4 text-neutral-700" />
                </motion.button>

                {/* Image Dots */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {salon.images.map((_, idx) => (
                    <motion.div
                      key={idx}
                      className={cn(
                        'w-1.5 h-1.5 rounded-full transition-all duration-300',
                        idx === currentImage
                          ? 'bg-white w-4'
                          : 'bg-white/50'
                      )}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Foreigner Friendly Badge */}
            {salon.isForeignerFriendly && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="absolute top-4 left-4"
              >
                <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                  <Globe className="w-3.5 h-3.5 text-primary-500" />
                  <span className="text-xs font-semibold text-primary-600">
                    Foreigner Friendly
                  </span>
                </div>
              </motion.div>
            )}

            {/* Bottom Info on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold text-white mb-1 drop-shadow-lg">
                    {salon.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-white/90">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-sm">{REGION_LABELS[salon.region].en}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-semibold text-white">{salon.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-4 sm:p-5">
            <p className="text-neutral-500 text-sm line-clamp-2 mb-3 sm:mb-4 leading-relaxed">
              {salon.description}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] sm:text-xs text-neutral-400 uppercase tracking-wider">
                  Starting from
                </span>
                <p className="text-base sm:text-lg font-semibold text-neutral-900">
                  {formatPrice(salon.startingPrice)}
                </p>
              </div>

              <motion.div
                className="flex items-center gap-2 text-primary-500 font-medium text-sm"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                View Details
                <motion.span
                  animate={{ x: isHovered ? 3 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </motion.div>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'linear-gradient(135deg, rgba(224, 77, 117, 0.05) 0%, transparent 50%)',
            }}
          />
        </motion.article>
      </Link>
    </motion.div>
  );
}
