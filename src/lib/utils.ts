import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO, addDays, isBefore, isAfter, isSameDay } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | null | undefined,
  currency: string = 'KRW'
): string {
  if (price == null || isNaN(price)) return '';
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${price}`;
  }
}

export function formatPriceKR(price: number | null | undefined): string {
  if (price == null || isNaN(price)) return '';
  return new Intl.NumberFormat('ko-KR').format(price) + '원';
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}min`;
}

export function formatDurationKR(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}분`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}시간`;
  }
  return `${hours}시간 ${remainingMinutes}분`;
}

export function formatDate(
  dateString: string | null | undefined,
  formatStr: string = 'MMM d, yyyy'
): string {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), formatStr);
  } catch {
    console.warn(`Invalid date string: ${dateString}`);
    return '';
  }
}

export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

export function formatDateKR(dateString: string | null | undefined): string {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), 'yyyy년 M월 d일');
  } catch {
    console.warn(`Invalid date string: ${dateString}`);
    return '';
  }
}

export function getNextNDays(n: number): Date[] {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    days.push(addDays(today, i));
  }
  return days;
}

export function isDateInPast(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return isBefore(date, today);
}

export function isDateInFuture(date: Date): boolean {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return isAfter(date, today);
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export function generateId(prefix?: string): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 9);
  const id = `${timestamp}${randomPart}`;
  return prefix ? `${prefix}_${id}` : id;
}

export function generateBookingId(): string {
  return generateId('BK');
}

export function generateTransactionId(): string {
  return generateId('TXN');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), wait);
  };
}
