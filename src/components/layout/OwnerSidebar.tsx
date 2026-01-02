'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
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
  {
    href: '/owner/dashboard',
    label: '대시보드',
    icon: LayoutDashboard,
  },
  {
    href: '/owner/services',
    label: '시술 관리',
    icon: Scissors,
  },
  {
    href: '/owner/bookings/requests',
    label: '예약 요청',
    icon: CalendarClock,
    badge: true,
  },
  {
    href: '/owner/bookings/confirmed',
    label: '확정 예약',
    icon: CalendarCheck,
  },
  {
    href: '/owner/settlement',
    label: '정산',
    icon: Wallet,
  },
  {
    href: '/owner/settings',
    label: '설정',
    icon: Settings,
  },
];

export function OwnerSidebar() {
  const pathname = usePathname();
  const { owner, logoutOwner } = useAuthStore();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-neutral-200 h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-100">
        <Link href="/owner/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <div>
            <span className="font-semibold text-neutral-900 block">K-Booking</span>
            <span className="text-xs text-neutral-500">샵 관리자</span>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                isActive
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-neutral-600 hover:bg-neutral-100'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  3
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-neutral-100">
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
          onClick={logoutOwner}
          className="flex items-center gap-3 px-4 py-3 w-full text-neutral-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-2"
        >
          <LogOut className="w-5 h-5" />
          <span>로그아웃</span>
        </button>
      </div>
    </aside>
  );
}
