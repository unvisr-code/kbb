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
} from 'lucide-react';
import { SideSheet } from '@/components/ui/SideSheet';
import { useUIStore } from '@/stores/uiStore';
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

export function MyPageSheet() {
  const router = useRouter();
  const { isMyPageOpen, closeMyPage } = useUIStore();
  const { favoriteIds } = useFavoriteStore();

  const handleLogout = () => {
    closeMyPage();
    router.push('/');
  };

  const handleMenuClick = (href: string) => {
    closeMyPage();
    router.push(href);
  };

  return (
    <SideSheet
      isOpen={isMyPageOpen}
      onClose={closeMyPage}
      title="My Page"
      width="md"
    >
      <div className="p-4">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-50 rounded-2xl p-5 mb-4"
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                {MOCK_USER.avatar ? (
                  <img
                    src={MOCK_USER.avatar}
                    alt={MOCK_USER.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-bold text-white">
                    {MOCK_USER.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-base text-neutral-900 truncate">
                {MOCK_USER.name}
              </h2>
              <p className="text-sm text-neutral-500 truncate">{MOCK_USER.email}</p>
            </div>

            {/* Edit Profile */}
            <button
              onClick={() => handleMenuClick('/mypage/profile')}
              className="w-9 h-9 rounded-full bg-white hover:bg-neutral-100 flex items-center justify-center transition-colors shadow-sm"
            >
              <Settings className="w-4 h-4 text-neutral-500" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-neutral-200">
            <div className="text-center">
              <p className="text-xl font-bold text-primary-500">{favoriteIds.length}</p>
              <p className="text-xs text-neutral-500">Favorites</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-blue-500">5</p>
              <p className="text-xs text-neutral-500">Bookings</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-amber-500">3</p>
              <p className="text-xs text-neutral-500">Reviews</p>
            </div>
          </div>
        </motion.div>

        {/* Menu List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-neutral-50 rounded-2xl overflow-hidden"
        >
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.href)}
              className="w-full flex items-center gap-3 p-4 hover:bg-neutral-100 transition-colors border-b border-neutral-100 last:border-b-0"
            >
              <div className={`w-9 h-9 rounded-xl ${item.bgColor} flex items-center justify-center`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-neutral-900 text-sm">{item.label}</p>
                <p className="text-xs text-neutral-500">{item.labelKr}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-300" />
            </button>
          ))}
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={handleLogout}
          className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-neutral-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium text-sm">Log Out</span>
        </motion.button>
      </div>
    </SideSheet>
  );
}
