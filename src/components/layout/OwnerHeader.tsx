'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, Bell, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { BottomSheet } from '../ui/BottomSheet';
import {
  LayoutDashboard,
  Scissors,
  CalendarCheck,
  CalendarClock,
  Wallet,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

const menuItems = [
  { href: '/owner/dashboard', label: '대시보드', icon: LayoutDashboard },
  { href: '/owner/services', label: '시술 관리', icon: Scissors },
  { href: '/owner/bookings/requests', label: '예약 요청', icon: CalendarClock },
  { href: '/owner/bookings/confirmed', label: '확정 예약', icon: CalendarCheck },
  { href: '/owner/settlement', label: '정산', icon: Wallet },
  { href: '/owner/settings', label: '설정', icon: Settings },
];

interface OwnerHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function OwnerHeader({ title, showBack = false, onBack }: OwnerHeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { owner, logoutOwner } = useAuthStore();

  const currentTitle =
    title ||
    menuItems.find((item) => pathname.startsWith(item.href))?.label ||
    '관리자';

  return (
    <>
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-neutral-100">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Left */}
          <div className="flex items-center gap-2">
            {showBack ? (
              <button
                onClick={onBack}
                className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-neutral-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-neutral-100"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-lg font-semibold">{currentTitle}</h1>
          </div>

          {/* Right */}
          <button className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <BottomSheet
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="메뉴"
      >
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                  isActive
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-neutral-600 hover:bg-neutral-100'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 pt-4 border-t border-neutral-100">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-medium">
                {owner?.name?.charAt(0) || 'O'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">
                {owner?.name || '오너'}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {owner?.email || 'owner@example.com'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              logoutOwner();
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-3 w-full text-neutral-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-2"
          >
            <LogOut className="w-5 h-5" />
            <span>로그아웃</span>
          </button>
        </div>
      </BottomSheet>
    </>
  );
}
