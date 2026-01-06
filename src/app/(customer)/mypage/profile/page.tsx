'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Clock } from 'lucide-react';

// Mock user data
const MOCK_USER = {
  id: 'user-001',
  name: 'Emily Johnson',
  email: 'emily.johnson@example.com',
  phone: '1234567890',
  countryCode: '+1',
  avatar: null,
};

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState(MOCK_USER.name);
  const [email, setEmail] = useState(MOCK_USER.email);
  const [phone, setPhone] = useState(MOCK_USER.phone);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    // In real app, save to backend
    setIsSaved(true);
    setTimeout(() => {
      router.back();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="w-10 h-10 rounded-full bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-neutral-600" />
              </button>
              <h1 className="font-display text-lg font-semibold text-neutral-900">
                Edit Profile
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-8"
        >
          <button
            onClick={() => setShowComingSoon(true)}
            className="relative group"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              {MOCK_USER.avatar ? (
                <img
                  src={MOCK_USER.avatar}
                  alt={MOCK_USER.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-white">
                  {name.charAt(0)}
                </span>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:bg-neutral-50 transition-colors">
              <Camera className="w-4 h-4 text-neutral-600" />
            </div>
          </button>
          <p className="text-sm text-neutral-500 mt-3">Tap to change photo</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-xl border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-xl border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Phone Number
            </label>
            <div className="flex gap-2">
              <div className="px-4 py-3 bg-neutral-100 rounded-xl text-neutral-600 font-medium">
                {MOCK_USER.countryCode}
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="flex-1 px-4 py-3 bg-white rounded-xl border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
              />
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Button
            onClick={handleSave}
            className="w-full"
            disabled={isSaved}
          >
            {isSaved ? (
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                Saved!
              </span>
            ) : (
              'Save Changes'
            )}
          </Button>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-6 border-t border-neutral-200"
        >
          <h3 className="text-sm font-medium text-neutral-500 mb-4">Account</h3>
          <button
            onClick={() => setShowComingSoon(true)}
            className="text-red-500 text-sm font-medium hover:text-red-600 transition-colors"
          >
            Delete Account
          </button>
        </motion.div>
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
