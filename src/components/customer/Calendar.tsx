'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  minDate?: Date;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function Calendar({ selectedDate, onSelectDate, minDate = new Date() }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [direction, setDirection] = useState(0);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const normalizedMinDate = useMemo(() => {
    const d = new Date(minDate);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [minDate]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: Array<{ date: Date; isCurrentMonth: boolean; isDisabled: boolean }> = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({
        date,
        isCurrentMonth: false,
        isDisabled: true,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      date.setHours(0, 0, 0, 0);
      days.push({
        date,
        isCurrentMonth: true,
        isDisabled: date < normalizedMinDate,
      });
    }

    // Next month days to fill the grid
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isDisabled: true,
      });
    }

    return days;
  };

  const days = useMemo(() => getDaysInMonth(currentMonth), [currentMonth, normalizedMinDate]);

  const navigateMonth = (delta: number) => {
    setDirection(delta);
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const canGoPrev = useMemo(() => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const lastDayOfPrevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
    return lastDayOfPrevMonth >= normalizedMinDate;
  }, [currentMonth, normalizedMinDate]);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-neutral-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => canGoPrev && navigateMonth(-1)}
          disabled={!canGoPrev}
          className={cn(
            'w-11 h-11 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all',
            canGoPrev
              ? 'bg-neutral-50 hover:bg-primary-50 text-neutral-600 hover:text-primary-500'
              : 'bg-neutral-50 text-neutral-300 cursor-not-allowed'
          )}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentMonth.toISOString()}
            initial={{ opacity: 0, y: direction * 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction * -10 }}
            transition={{ duration: 0.2 }}
            className="text-center"
          >
            <h3 className="font-display text-lg sm:text-xl font-semibold text-neutral-900">
              {MONTHS[currentMonth.getMonth()]}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
              {currentMonth.getFullYear()}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigateMonth(1)}
          className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-neutral-50 hover:bg-primary-50 flex items-center justify-center text-neutral-600 hover:text-primary-500 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 mb-3 sm:mb-4">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-[11px] sm:text-xs font-medium text-neutral-400 uppercase tracking-wider py-1.5 sm:py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Date Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMonth.toISOString()}
          initial={{ opacity: 0, x: direction * 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-7 gap-1"
        >
          {days.map((day, index) => {
            const selected = isSelected(day.date);
            const todayDate = isToday(day.date);

            return (
              <motion.button
                key={index}
                disabled={day.isDisabled}
                onClick={() => !day.isDisabled && onSelectDate(day.date)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01, duration: 0.2 }}
                className={cn(
                  'relative aspect-square flex items-center justify-center rounded-xl transition-all duration-200',
                  !day.isCurrentMonth && 'opacity-0 pointer-events-none',
                  day.isDisabled && day.isCurrentMonth && 'text-neutral-300 cursor-not-allowed',
                  !day.isDisabled && !selected && 'hover:bg-primary-50 text-neutral-700 hover:text-primary-600',
                  selected && 'bg-primary-500 text-white shadow-lg shadow-primary-500/30',
                  todayDate && !selected && 'ring-2 ring-primary-200 ring-inset'
                )}
              >
                <span className={cn(
                  'relative z-10 text-sm font-medium',
                  selected && 'font-semibold'
                )}>
                  {day.date.getDate()}
                </span>

                {/* Today indicator dot */}
                {todayDate && !selected && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-400" />
                )}

                {/* Selected glow effect */}
                {selected && (
                  <motion.div
                    layoutId="selectedDate"
                    className="absolute inset-0 bg-primary-500 rounded-xl -z-0"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-neutral-100">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ring-2 ring-primary-200" />
          <span className="text-[11px] sm:text-xs text-neutral-500">Today</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary-500" />
          <span className="text-[11px] sm:text-xs text-neutral-500">Selected</span>
        </div>
      </div>
    </div>
  );
}
