'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Star,
  Pencil,
  Clock,
} from 'lucide-react';
import { mockReviews } from '@/lib/mock/reviews';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'text-amber-400 fill-amber-400'
              : 'text-neutral-200'
          }`}
        />
      ))}
    </div>
  );
};

export default function ReviewsPage() {
  const router = useRouter();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const averageRating = mockReviews.length > 0
    ? (mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length).toFixed(1)
    : '0.0';

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
            <h1 className="font-display text-lg font-semibold text-neutral-900">
              My Reviews
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-neutral-100 p-5 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center">
              <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-neutral-900">{averageRating}</span>
                <span className="text-neutral-400">/ 5.0</span>
              </div>
              <p className="text-sm text-neutral-500">
                {mockReviews.length} {mockReviews.length === 1 ? 'review' : 'reviews'} written
              </p>
            </div>
          </div>
        </motion.div>

        {/* Reviews List */}
        {mockReviews.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {mockReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="bg-white rounded-2xl border border-neutral-100 overflow-hidden"
              >
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Link
                        href={`/salons/${review.salonId}`}
                        className="font-semibold text-neutral-900 hover:text-primary-500 transition-colors"
                      >
                        {review.salonName}
                      </Link>
                      <p className="text-sm text-neutral-500">{review.serviceName}</p>
                    </div>
                    <button
                      onClick={() => setShowComingSoon(true)}
                      className="p-2 hover:bg-neutral-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4 text-neutral-400" />
                    </button>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-neutral-400">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {review.comment}
                  </p>

                  {/* Images */}
                  {review.images.length > 0 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
                      {review.images.map((image, i) => (
                        <div
                          key={i}
                          className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
                        >
                          <img
                            src={image}
                            alt={`Review photo ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-10 h-10 text-amber-300" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              No reviews yet
            </h3>
            <p className="text-neutral-500 mb-6">
              Share your experience after<br />
              your salon visits
            </p>
            <Link
              href="/mypage/bookings"
              className="inline-flex px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
            >
              View Bookings
            </Link>
          </motion.div>
        )}
      </main>

      {/* Coming Soon Modal */}
      <Modal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        size="sm"
        showCloseButton={false}
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-primary-500" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Coming Soon!</h3>
          <p className="text-neutral-500 text-sm mb-6">
            Review editing will be available soon.<br />
            Stay tuned for updates!
          </p>
          <Button onClick={() => setShowComingSoon(false)} className="w-full">
            Got it
          </Button>
        </div>
      </Modal>
    </div>
  );
}
