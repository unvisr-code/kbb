'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Navigation,
  Download,
  Share2,
  Home,
  RefreshCw,
  Sparkles,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useBookingStore } from '@/stores/bookingStore';
import { formatPrice, formatDuration } from '@/lib/utils';
import { DEPOSIT_AMOUNT } from '@/types';
import confetti from 'canvas-confetti';
import { useEffect, useState, useRef } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import html2canvas from 'html2canvas';

export default function ResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const bookingId = params.bookingId as string;
  const status = searchParams.get('status') || 'confirmed';
  const isConfirmed = status === 'confirmed';

  const { selectedSalon, selectedService, selectedDate, selectedTime, customerInfo, clearAll } =
    useBookingStore();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showSaveError, setShowSaveError] = useState(false);
  const bookingCardRef = useRef<HTMLDivElement>(null);

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveImage = async () => {
    if (!bookingCardRef.current || isSaving) return;

    setIsSaving(true);

    try {
      // Wait for images to load
      const images = bookingCardRef.current.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) {
                resolve(true);
              } else {
                img.onload = () => resolve(true);
                img.onerror = () => resolve(true);
              }
            })
        )
      );

      const canvas = await html2canvas(bookingCardRef.current, {
        backgroundColor: '#ffffff',
        scale: 3, // Higher resolution for mobile
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: bookingCardRef.current.offsetWidth,
        height: bookingCardRef.current.offsetHeight,
        onclone: (clonedDoc) => {
          // Ensure cloned element has proper styling
          const clonedElement = clonedDoc.querySelector('[data-booking-card]');
          if (clonedElement) {
            (clonedElement as HTMLElement).style.borderRadius = '24px';
            (clonedElement as HTMLElement).style.overflow = 'hidden';
          }
        },
      });

      // Convert to high quality PNG
      const url = canvas.toDataURL('image/png', 1.0);
      const a = document.createElement('a');
      a.href = url;
      a.download = `booking-${bookingId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to save image:', error);
      setShowSaveError(true);
    } finally {
      setIsSaving(false);
    }
  };

  // Confetti effect for confirmed bookings
  useEffect(() => {
    if (isConfirmed) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#e04d75', '#f472b6', '#2dd4bf'],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#e04d75', '#f472b6', '#2dd4bf'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isConfirmed]);

  const formatBookingDate = (dateString: string | null): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={`min-h-screen ${isConfirmed ? 'bg-gradient-to-b from-green-50/50 via-white to-primary-50/30' : 'bg-gradient-to-b from-red-50/50 via-white to-neutral-50'}`}>
      <div className="max-w-lg mx-auto px-4 py-12">
        {/* Status Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-center mb-8"
        >
          {isConfirmed ? (
            <div className="relative inline-block">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl shadow-green-500/30"
              >
                <CheckCircle2 className="w-12 h-12 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-8 h-8 text-amber-400" />
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shadow-xl shadow-red-500/30 mx-auto"
            >
              <XCircle className="w-12 h-12 text-white" />
            </motion.div>
          )}
        </motion.div>

        {/* Status Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-2xl font-bold text-neutral-900 mb-2">
            {isConfirmed ? 'Booking Confirmed!' : 'Booking Declined'}
          </h1>
          <p className="text-neutral-500">
            {isConfirmed
              ? 'Your appointment has been confirmed. We can\'t wait to see you!'
              : 'Unfortunately, the salon couldn\'t accommodate your request.'}
          </p>
        </motion.div>

        {/* Booking Card */}
        <motion.div
          ref={bookingCardRef}
          data-booking-card
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-lg mb-6"
        >
          {/* Header */}
          <div className={`p-4 ${isConfirmed ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-rose-500'} text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/70 uppercase tracking-wider">Booking ID</p>
                <p className="font-mono font-semibold">{bookingId}</p>
              </div>
              <div className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                <p className="text-xs font-semibold capitalize">{status}</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-5 space-y-4">
            {selectedSalon && (
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                  <img
                    src={selectedSalon.images[0]}
                    alt={selectedSalon.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">{selectedSalon.name}</h3>
                  <div className="flex items-center gap-1.5 text-neutral-500 text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{selectedSalon.address}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedService && (
              <div className="bg-neutral-50 rounded-2xl p-4">
                <p className="text-sm text-neutral-500 mb-1">Service</p>
                <p className="font-semibold text-neutral-900">{selectedService.name}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500">
                  <span>{formatDuration(selectedService.duration)}</span>
                  <span>•</span>
                  <span>{formatPrice(selectedService.price)}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-neutral-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Date</span>
                </div>
                <p className="font-semibold text-neutral-900">
                  {selectedDate
                    ? new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })
                    : '-'}
                </p>
              </div>
              <div className="bg-neutral-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-neutral-500 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Time</span>
                </div>
                <p className="font-semibold text-neutral-900">{selectedTime || '-'}</p>
              </div>
            </div>

            {/* Payment Status */}
            <div className={`flex items-center justify-between p-4 rounded-2xl ${isConfirmed ? 'bg-green-50' : 'bg-amber-50'}`}>
              {isConfirmed ? (
                <>
                  <div>
                    <p className="text-sm text-green-700 font-medium">Deposit Paid</p>
                    <p className="text-xs text-green-600">
                      Pay {formatPrice(selectedService ? selectedService.price - DEPOSIT_AMOUNT : 0)} at salon
                    </p>
                  </div>
                  <span className="font-bold text-green-700">{formatPrice(DEPOSIT_AMOUNT)}</span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-sm text-amber-700 font-medium">Refund Initiated</p>
                      <p className="text-xs text-amber-600">3-5 business days</p>
                    </div>
                  </div>
                  <span className="font-bold text-amber-700">{formatPrice(DEPOSIT_AMOUNT)}</span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        {isConfirmed ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3 mb-6"
          >
            {selectedSalon && (
              <>
                <button
                  onClick={() => setShowComingSoon(true)}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/30 transition-colors"
                >
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </button>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setShowComingSoon(true)}
                    className="flex flex-col items-center gap-2 py-4 bg-white border border-neutral-100 rounded-2xl hover:border-primary-200 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-neutral-600" />
                    <span className="text-xs text-neutral-600">Call</span>
                  </button>
                  <button
                    onClick={handleSaveImage}
                    disabled={isSaving}
                    className="flex flex-col items-center gap-2 py-4 bg-white border border-neutral-100 rounded-2xl hover:border-primary-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
                    ) : (
                      <Download className="w-5 h-5 text-neutral-600" />
                    )}
                    <span className="text-xs text-neutral-600">{isSaving ? 'Saving...' : 'Save'}</span>
                  </button>
                  <button
                    onClick={async () => {
                      const shareData = {
                        title: 'Booking Confirmation',
                        text: `${selectedSalon?.name || ''} - ${selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''} ${selectedTime || ''}`,
                        url: window.location.href,
                      };
                      if (navigator.share) {
                        try {
                          await navigator.share(shareData);
                        } catch (err) {
                          // User cancelled or error
                        }
                      } else {
                        await navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }
                    }}
                    className="flex flex-col items-center gap-2 py-4 bg-white border border-neutral-100 rounded-2xl hover:border-primary-200 transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-neutral-600" />
                    <span className="text-xs text-neutral-600">Share</span>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3 mb-6"
          >
            <Link
              href="/"
              onClick={() => clearAll()}
              className="w-full flex items-center justify-center gap-3 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/30 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Find Another Salon
            </Link>

            <p className="text-center text-sm text-neutral-500">
              Don't worry! There are many other amazing salons waiting for you.
            </p>
          </motion.div>
        )}

        {/* Important Info */}
        {isConfirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6"
          >
            <h4 className="font-semibold text-amber-800 mb-2">Important Reminders</h4>
            <ul className="text-sm text-amber-700 space-y-1.5">
              <li>• Arrive 10 minutes before your appointment</li>
              <li>• Bring a valid ID for verification</li>
              <li>• Cancellation must be 24 hours in advance</li>
            </ul>
          </motion.div>
        )}

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link
            href="/"
            onClick={() => clearAll()}
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-primary-500 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>

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
            This feature is currently under development.<br />
            Stay tuned for updates!
          </p>
          <Button onClick={() => setShowComingSoon(false)} className="w-full">
            Got it
          </Button>
        </div>
      </Modal>

      {/* Save Error Modal */}
      <Modal
        isOpen={showSaveError}
        onClose={() => setShowSaveError(false)}
        size="sm"
        showCloseButton={false}
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Save Failed</h3>
          <p className="text-neutral-500 text-sm mb-6">
            Unable to save the image.<br />
            Please try again.
          </p>
          <Button onClick={() => setShowSaveError(false)} className="w-full">
            Try Again
          </Button>
        </div>
      </Modal>
    </div>
  );
}
