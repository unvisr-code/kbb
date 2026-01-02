'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useMockPayment() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const processPayment = useCallback(async () => {
    setIsProcessing(true);

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Generate a mock booking ID
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();
    const bookingId = `BK${timestamp}${randomPart}`;

    // Navigate to pending page
    router.push(`/booking/${bookingId}/pending`);
  }, [router]);

  return {
    isProcessing,
    processPayment,
  };
}
