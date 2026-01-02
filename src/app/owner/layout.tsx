'use client';

import { usePathname } from 'next/navigation';
import { OwnerSidebar, OwnerHeader } from '@/components/layout';

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Don't show sidebar/header on login and onboarding pages
  const isAuthPage = pathname === '/owner/login' || pathname === '/owner/onboarding';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Desktop Sidebar */}
      <OwnerSidebar />

      {/* Mobile Header */}
      <OwnerHeader />

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
