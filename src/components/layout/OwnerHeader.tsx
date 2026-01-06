'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, Bell, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { BottomSheet } from '../ui/BottomSheet';
import {
  Scissors,
  CalendarCheck,
  CalendarClock,
  Wallet,
  LogOut,
  DollarSign,
  XCircle,
  CheckCircle,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    type: 'booking_request',
    title: '새 예약 요청',
    message: '김서연 고객님이 프리미엄 젤 네일을 예약했습니다.',
    time: '5분 전',
    isRead: false,
  },
  {
    id: 2,
    type: 'booking_confirmed',
    title: '예약 확정',
    message: '이지민 고객님 예약이 확정되었습니다.',
    time: '1시간 전',
    isRead: false,
  },
  {
    id: 3,
    type: 'booking_cancelled',
    title: '예약 취소',
    message: '박소영 고객님이 예약을 취소했습니다.',
    time: '3시간 전',
    isRead: true,
  },
  {
    id: 4,
    type: 'settlement',
    title: '정산 완료',
    message: '2026년 2월 정산금 922,500원이 입금되었습니다.',
    time: '1일 전',
    isRead: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'booking_request':
      return <CalendarClock className="w-5 h-5 text-amber-500" />;
    case 'booking_confirmed':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'booking_cancelled':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'settlement':
      return <DollarSign className="w-5 h-5 text-blue-500" />;
    default:
      return <Bell className="w-5 h-5 text-neutral-500" />;
  }
};

const menuItems = [
  { href: '/owner/services', label: '시술 관리', icon: Scissors },
  { href: '/owner/bookings/requests', label: '예약 요청', icon: CalendarClock },
  { href: '/owner/bookings/confirmed', label: '확정 예약', icon: CalendarCheck },
  { href: '/owner/settlement', label: '정산', icon: Wallet },
];

interface OwnerHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function OwnerHeader({ title, showBack = false, onBack }: OwnerHeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { owner, logoutOwner } = useAuthStore();

  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

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

          {/* Right - Notification Bell */}
          <button
            onClick={() => setIsNotificationOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
            )}
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

      {/* Notifications */}
      <BottomSheet
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        title="알림"
      >
        <div className="space-y-1">
          {mockNotifications.length === 0 ? (
            <div className="py-8 text-center">
              <Bell className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500 text-sm">새로운 알림이 없습니다</p>
            </div>
          ) : (
            mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  'flex items-start gap-3 px-4 py-3 rounded-xl transition-colors',
                  notification.isRead
                    ? 'bg-white'
                    : 'bg-primary-50'
                )}
              >
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={cn(
                      'text-sm',
                      notification.isRead ? 'text-neutral-700' : 'text-neutral-900 font-medium'
                    )}>
                      {notification.title}
                    </p>
                    <span className="text-xs text-neutral-400 flex-shrink-0">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5 line-clamp-2">
                    {notification.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {mockNotifications.length > 0 && (
          <div className="mt-4 pt-4 border-t border-neutral-100">
            <button className="w-full py-2.5 text-sm text-primary-600 font-medium hover:bg-primary-50 rounded-xl transition-colors">
              모든 알림 읽음 처리
            </button>
          </div>
        )}
      </BottomSheet>
    </>
  );
}
