'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Clock,
  Calendar,
  MapPin,
  Bell,
  Mail,
  MessageCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useBookingStore } from '@/stores/bookingStore';
import { formatPrice, formatDuration } from '@/lib/utils';
import { DEPOSIT_AMOUNT } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export default function PendingPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.bookingId as string;
  const { selectedSalon, selectedService, selectedDate, selectedTime, customerInfo } =
    useBookingStore();

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Simulated timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto redirect to result page after demo time
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push(`/booking/${bookingId}/result?status=confirmed`);
    }, 10000);
    return () => clearTimeout(timeout);
  }, [bookingId, router]);

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

  // Floating orbs animation
  const orbs = [
    { size: 200, x: -50, y: -50, delay: 0 },
    { size: 150, x: 250, y: 100, delay: 0.5 },
    { size: 100, x: 50, y: 300, delay: 1 },
    { size: 180, x: 200, y: 400, delay: 1.5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/50 via-white to-accent-50/30 relative overflow-hidden">
      {/* Animated Background Orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary-100/40 blur-3xl"
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-lg mx-auto px-4 py-12">
        {/* Status Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-10"
        >
          {/* Animated Waiting Icon */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary-200"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            {/* Middle ring */}
            <motion.div
              className="absolute inset-3 rounded-full border-4 border-primary-300"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            {/* Inner circle */}
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Clock className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            {/* Sparkles */}
            <motion.div
              className="absolute -top-2 right-0"
              animate={{ opacity: [0, 1, 0], y: [-5, -10, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-primary-400" />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-2xl font-bold text-neutral-900 mb-2"
          >
            Awaiting Confirmation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-neutral-500 max-w-xs mx-auto"
          >
            The salon is reviewing your booking request. You'll receive a notification soon.
          </motion.p>

          {/* Timer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-neutral-100"
          >
            <span className="text-sm text-neutral-500">Waiting time:</span>
            <span className="font-mono font-semibold text-primary-600">
              {Math.floor(timeElapsed / 60)
                .toString()
                .padStart(2, '0')}
              :{(timeElapsed % 60).toString().padStart(2, '0')}
            </span>
          </motion.div>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-lg mb-6"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-rose-500 p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/70 uppercase tracking-wider">Booking ID</p>
                <p className="font-mono font-semibold">{bookingId}</p>
              </div>
              <div className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                <p className="text-xs font-semibold">Pending</p>
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
                <div>
                  <h3 className="font-semibold text-neutral-900">{selectedSalon.name}</h3>
                  <div className="flex items-center gap-1.5 text-neutral-500 text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedSalon.address}</span>
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
                  {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  }) : '-'}
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

            {/* Deposit Paid */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-neutral-600">Deposit Paid</span>
              </div>
              <span className="font-semibold text-green-600">{formatPrice(DEPOSIT_AMOUNT)}</span>
            </div>
          </div>
        </motion.div>

        {/* Notification Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl border border-neutral-100 p-5 mb-6"
        >
          <h3 className="font-semibold text-neutral-900 mb-4">
            Get notified when confirmed
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900">Email</p>
                  <p className="text-xs text-neutral-500">{customerInfo?.email || 'Not set'}</p>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            </div>
            <button
              onClick={() => setShowComingSoon(true)}
              className="flex items-center justify-between w-full p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-accent-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-neutral-900">Push Notifications</p>
                  <p className="text-xs text-neutral-500">Enable for instant updates</p>
                </div>
              </div>
              <span className="text-xs text-primary-500 font-medium">Enable</span>
            </button>
          </div>
        </motion.div>

        {/* Help Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <a
            href={`mailto:support@kbeautybook.com?subject=Booking Support - ${bookingId}`}
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-500 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Need help? Contact support
          </a>
        </motion.div>

        {/* Demo Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-xs text-neutral-400 mt-8"
        >
          Demo: Auto-redirecting to result in {Math.max(0, 10 - timeElapsed)}s...
        </motion.p>
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
    </div>
  );
}
