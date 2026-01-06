'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart } from 'lucide-react';
import { useFavoriteStore } from '@/stores/favoriteStore';
import { mockSalons } from '@/lib/mock';
import { SalonCard } from '@/components/customer/SalonCard';
import Link from 'next/link';

export default function FavoritesPage() {
  const router = useRouter();
  const { favoriteIds } = useFavoriteStore();

  const favoriteSalons = mockSalons.filter((salon) =>
    favoriteIds.includes(salon.id)
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </button>
            <div>
              <h1 className="font-display text-lg font-semibold text-neutral-900">
                Favorites
              </h1>
              <p className="text-xs text-neutral-500">
                {favoriteIds.length} {favoriteIds.length === 1 ? 'salon' : 'salons'} saved
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {favoriteSalons.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {favoriteSalons.map((salon, index) => (
              <motion.div
                key={salon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SalonCard salon={salon} index={index} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-rose-300" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-neutral-500 mb-6">
              Save your favorite salons by tapping<br />
              the heart icon on salon cards
            </p>
            <Link
              href="/"
              className="inline-flex px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
            >
              Explore Salons
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  );
}
