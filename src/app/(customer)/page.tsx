'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, SlidersHorizontal, Sparkles, ChevronDown, X, User } from 'lucide-react';
import Link from 'next/link';
import { mockSalons } from '@/lib/mock';
import { Region, REGION_LABELS, Salon } from '@/types';
import { SalonCard } from '@/components/customer/SalonCard';
import { cn } from '@/lib/utils';

type SortOption = 'recommended' | 'price_low' | 'price_high' | 'rating';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const REGIONS: { value: Region | 'all'; label: string }[] = [
  { value: 'all', label: 'All Areas' },
  ...Object.entries(REGION_LABELS).map(([value, labels]) => ({
    value: value as Region,
    label: labels.en,
  })),
];

export default function HomePage() {
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [foreignerFriendlyOnly, setForeignerFriendlyOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredSalons = useMemo(() => {
    let salons = mockSalons.filter((salon) => salon.isActive);

    // Region filter
    if (selectedRegion !== 'all') {
      salons = salons.filter((salon) => salon.region === selectedRegion);
    }

    // Foreigner friendly filter
    if (foreignerFriendlyOnly) {
      salons = salons.filter((salon) => salon.isForeignerFriendly);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      salons = salons.filter(
        (salon) =>
          salon.name.toLowerCase().includes(query) ||
          salon.description.toLowerCase().includes(query) ||
          REGION_LABELS[salon.region].en.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price_low':
        salons = [...salons].sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case 'price_high':
        salons = [...salons].sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case 'rating':
        salons = [...salons].sort((a, b) => b.rating - a.rating);
        break;
      default:
        // recommended - keep original order
        break;
    }

    return salons;
  }, [selectedRegion, sortBy, foreignerFriendlyOnly, searchQuery]);

  const activeFiltersCount =
    (selectedRegion !== 'all' ? 1 : 0) +
    (foreignerFriendlyOnly ? 1 : 0) +
    (sortBy !== 'recommended' ? 1 : 0);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-rose-50 to-pink-50" />

          {/* Floating Shapes */}
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-40 right-1/4 w-48 h-48 bg-pink-200/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative px-4 pt-6 pb-10 sm:pt-8 sm:pb-12 md:pt-16 md:pb-20">
          {/* My Page Button */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
            <Link
              href="/mypage"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <User className="w-5 h-5 text-neutral-700" />
            </Link>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm mb-4 sm:mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-xs sm:text-sm font-medium text-neutral-700">
                Discover K-Beauty Experience
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 mb-3 sm:mb-4 leading-tight"
            >
              Find Your Perfect
              <br className="md:hidden" />
              {' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-primary-500">Nail Salon</span>
                <motion.span
                  className="absolute bottom-1 md:bottom-2 left-0 right-0 h-2 md:h-3 bg-primary-200/50 -z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  style={{ originX: 0 }}
                />
              </span>
              <br />
              in Korea
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-600 text-sm sm:text-base md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-4"
            >
              Book appointments at foreigner-friendly salons
              <br className="hidden md:block" />
              {' '}with English-speaking staff.
              <br className="md:hidden" />
              {' '}Experience the best of Korean nail art.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative max-w-xl mx-auto px-2 sm:px-0"
            >
              <div className="relative">
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-neutral-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search salons or areas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 sm:h-14 pl-10 sm:pl-12 pr-10 sm:pr-4 bg-white rounded-xl sm:rounded-2xl shadow-lg shadow-neutral-200/50 border border-neutral-100 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all text-sm sm:text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-neutral-100 relative">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
            {/* Left Filters */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
              {/* Region Dropdown */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => {
                    setIsRegionOpen(!isRegionOpen);
                    setIsSortOpen(false);
                  }}
                  className={cn(
                    'flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap',
                    selectedRegion !== 'all'
                      ? 'bg-primary-50 text-primary-600 border border-primary-200'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  )}
                >
                  <MapPin className="w-4 h-4" />
                  <span>
                    {selectedRegion === 'all'
                      ? 'All Areas'
                      : REGION_LABELS[selectedRegion].en}
                  </span>
                  <ChevronDown className={cn(
                    'w-4 h-4 transition-transform',
                    isRegionOpen && 'rotate-180'
                  )} />
                </button>

              </div>

              {/* Sort Dropdown */}
              <div className="relative hidden sm:block flex-shrink-0">
                <button
                  onClick={() => {
                    setIsSortOpen(!isSortOpen);
                    setIsRegionOpen(false);
                  }}
                  className={cn(
                    'flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap',
                    sortBy !== 'recommended'
                      ? 'bg-primary-50 text-primary-600 border border-primary-200'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  )}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>{SORT_OPTIONS.find((o) => o.value === sortBy)?.label}</span>
                  <ChevronDown className={cn(
                    'w-4 h-4 transition-transform',
                    isSortOpen && 'rotate-180'
                  )} />
                </button>

              </div>

              {/* Foreigner Friendly Toggle */}
              <button
                onClick={() => setForeignerFriendlyOnly(!foreignerFriendlyOnly)}
                className={cn(
                  'flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0',
                  foreignerFriendlyOnly
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                )}
              >
                <span className="hidden sm:inline">Foreigner Friendly</span>
                <span className="sm:hidden">English OK</span>
              </button>
            </div>

            {/* Results Count */}
            <div className="text-xs sm:text-sm text-neutral-500 flex-shrink-0">
              <span className="font-semibold text-neutral-900">{filteredSalons.length}</span> salons
            </div>
          </div>
        </div>

        {/* Region Dropdown Menu - Outside overflow container */}
        <AnimatePresence>
          {isRegionOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-3 sm:left-4 top-full mt-1 bg-white rounded-xl shadow-2xl border border-neutral-200 py-2 min-w-[180px] z-[100]"
            >
              {REGIONS.map((region) => (
                <button
                  key={region.value}
                  onClick={() => {
                    setSelectedRegion(region.value);
                    setIsRegionOpen(false);
                  }}
                  className={cn(
                    'w-full px-4 py-2.5 text-left text-sm transition-colors',
                    selectedRegion === region.value
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  )}
                >
                  {region.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sort Dropdown Menu - Outside overflow container */}
        <AnimatePresence>
          {isSortOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-3 sm:left-[180px] top-full mt-1 bg-white rounded-xl shadow-2xl border border-neutral-200 py-2 min-w-[200px] z-[100]"
            >
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value);
                    setIsSortOpen(false);
                  }}
                  className={cn(
                    'w-full px-4 py-2.5 text-left text-sm transition-colors',
                    sortBy === option.value
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Click outside to close dropdowns */}
      {(isRegionOpen || isSortOpen) && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => {
            setIsRegionOpen(false);
            setIsSortOpen(false);
          }}
        />
      )}

      {/* Salon Grid */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {filteredSalons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredSalons.map((salon, index) => (
              <SalonCard key={salon.id} salon={salon} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              No salons found
            </h3>
            <p className="text-neutral-500 mb-6">
              Try adjusting your filters or search term
            </p>
            <button
              onClick={() => {
                setSelectedRegion('all');
                setSortBy('recommended');
                setForeignerFriendlyOnly(false);
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </section>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-safe-bottom sm:hidden pointer-events-none">
        <AnimatePresence>
          {activeFiltersCount > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => {
                setSelectedRegion('all');
                setSortBy('recommended');
                setForeignerFriendlyOnly(false);
              }}
              className="pointer-events-auto mx-auto flex items-center gap-2 px-4 py-3 bg-neutral-900 text-white rounded-full shadow-lg"
            >
              <X className="w-4 h-4" />
              <span className="text-sm font-medium">Clear {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''}</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
