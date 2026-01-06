'use client';

import { MyPageSheet } from '@/components/customer/MyPageSheet';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <main>{children}</main>
      <MyPageSheet />
    </div>
  );
}
