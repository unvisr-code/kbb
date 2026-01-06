'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Heart,
  Calendar,
  CreditCard,
  Star,
  ChevronRight,
  LogOut,
  Settings,
  ArrowLeft,
} from 'lucide-react';
import { useFavoriteStore } from '@/stores/favoriteStore';

// Mock user data (in real app, this would come from auth)
const MOCK_USER = {
  id: 'user-001',
  name: 'Emily Johnson',
  email: 'emily.johnson@example.com',
  avatar: null,
};

const MENU_ITEMS = [
  {
    id: 'favorites',
    icon: Heart,
    label: 'Favorites',
    labelKr: '찜한 스토어',
    href: '/mypage/favorites',
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
  },
  {
    id: 'bookings',
    icon: Calendar,
    label: 'Booking History',
    labelKr: '이용 내역',
    href: '/mypage/bookings',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'payments',
    icon: CreditCard,
    label: 'Payment History',
    labelKr: '결제 내역',
    href: '/mypage/payments',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    id: 'reviews',
    icon: Star,
    label: 'My Reviews',
    labelKr: '내 리뷰',
    href: '/mypage/reviews',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
];

export default function MyPage() {
  const router = useRouter();
  const { favoriteIds } = useFavoriteStore();

  const handleLogout = () => {
    // In real app, clear auth and redirect
    router.push('/');
  };

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
              My Page
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-neutral-100 p-6 mb-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                {MOCK_USER.avatar ? (
                  <img
                    src={MOCK_USER.avatar}
                    alt={MOCK_USER.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">
                    {MOCK_USER.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="font-semibold text-lg text-neutral-900">
                {MOCK_USER.name}
              </h2>
              <p className="text-sm text-neutral-500">{MOCK_USER.email}</p>
            </div>

            {/* Edit Profile */}
            <Link
              href="/mypage/profile"
              className="w-10 h-10 rounded-full bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center transition-colors"
            >
              <Settings className="w-5 h-5 text-neutral-500" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-neutral-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-500">{favoriteIds.length}</p>
              <p className="text-xs text-neutral-500">Favorites</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-500">5</p>
              <p className="text-xs text-neutral-500">Bookings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-500">3</p>
              <p className="text-xs text-neutral-500">Reviews</p>
            </div>
          </div>
        </motion.div>

        {/* Menu List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-sm"
        >
          {MENU_ITEMS.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-b-0"
            >
              <div className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-neutral-900">{item.label}</p>
                <p className="text-xs text-neutral-500">{item.labelKr}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-300" />
            </Link>
          ))}
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleLogout}
          className="w-full mt-6 flex items-center justify-center gap-2 py-4 text-neutral-500 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </motion.button>
      </main>
    </div>
  );
}
