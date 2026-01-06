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
    return <div style={{ letterSpacing: '-0.03em' }}>{children}</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-50" style={{ letterSpacing: '-0.03em' }}>
      {/* Desktop Sidebar */}
      <OwnerSidebar />

      {/* Mobile Header + Main Content Container */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <OwnerHeader />

        {/* Main Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
