'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sun, Sunset, Moon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotPickerProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  serviceDuration: number;
}

// Generate mock time slots
const generateTimeSlots = (date: Date | null): TimeSlot[] => {
  if (!date) return [];

  const slots: TimeSlot[] = [];
  const startHour = 10;
  const endHour = 20;

  // Seed random based on date for consistent results
  const seed = date.getDate() + date.getMonth() * 31;
  const random = (i: number) => {
    const x = Math.sin(seed + i) * 10000;
    return x - Math.floor(x);
  };

  for (let hour = startHour; hour < endHour; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      // Make some slots unavailable randomly
      const slotIndex = (hour - startHour) * 2 + (min === 30 ? 1 : 0);
      const available = random(slotIndex) > 0.3;
      slots.push({ time, available });
    }
  }

  return slots;
};

const groupSlotsByPeriod = (slots: TimeSlot[]) => {
  const morning: TimeSlot[] = [];
  const afternoon: TimeSlot[] = [];
  const evening: TimeSlot[] = [];

  slots.forEach(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    if (hour < 12) {
      morning.push(slot);
    } else if (hour < 17) {
      afternoon.push(slot);
    } else {
      evening.push(slot);
    }
  });

  return { morning, afternoon, evening };
};

const PeriodIcon = ({ period }: { period: 'morning' | 'afternoon' | 'evening' }) => {
  switch (period) {
    case 'morning':
      return <Sun className="w-4 h-4" />;
    case 'afternoon':
      return <Sunset className="w-4 h-4" />;
    case 'evening':
      return <Moon className="w-4 h-4" />;
  }
};

const periodLabels = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
};

export function TimeSlotPicker({
  selectedDate,
  selectedTime,
  onSelectTime,
  serviceDuration,
}: TimeSlotPickerProps) {
  const slots = useMemo(() => generateTimeSlots(selectedDate), [selectedDate]);
  const groupedSlots = useMemo(() => groupSlotsByPeriod(slots), [slots]);

  if (!selectedDate) {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-neutral-100">
        <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-50 flex items-center justify-center mb-3 sm:mb-4">
            <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-300" />
          </div>
          <h3 className="font-medium text-neutral-600 mb-1 text-sm sm:text-base">Select a Date First</h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Choose a date to see available time slots
          </p>
        </div>
      </div>
    );
  }

  const hasAvailableSlots = slots.some(s => s.available);

  if (!hasAvailableSlots) {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-neutral-100">
        <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-50 flex items-center justify-center mb-3 sm:mb-4">
            <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />
          </div>
          <h3 className="font-medium text-neutral-600 mb-1 text-sm sm:text-base">No Available Slots</h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Unfortunately, there are no available slots for this date.
            <br />Please select another date.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-neutral-100">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="font-display text-base sm:text-lg font-semibold text-neutral-900">
          Available Times
        </h3>
        <span className="text-[11px] sm:text-xs text-neutral-400 bg-neutral-50 px-2.5 sm:px-3 py-1 rounded-full">
          {serviceDuration} min
        </span>
      </div>

      <div className="space-y-5 sm:space-y-6">
        {(['morning', 'afternoon', 'evening'] as const).map((period, periodIndex) => {
          const periodSlots = groupedSlots[period];
          const availableCount = periodSlots.filter(s => s.available).length;

          if (availableCount === 0) return null;

          return (
            <motion.div
              key={period}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: periodIndex * 0.1 }}
            >
              {/* Period Header */}
              <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                <div className={cn(
                  'w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center',
                  period === 'morning' && 'bg-amber-50 text-amber-500',
                  period === 'afternoon' && 'bg-orange-50 text-orange-500',
                  period === 'evening' && 'bg-indigo-50 text-indigo-500'
                )}>
                  <PeriodIcon period={period} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-neutral-600">
                  {periodLabels[period]}
                </span>
                <span className="text-[11px] sm:text-xs text-neutral-400">
                  ({availableCount})
                </span>
              </div>

              {/* Time Slots Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2">
                {periodSlots.map((slot, index) => {
                  const isSelected = selectedTime === slot.time;

                  return (
                    <motion.button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => slot.available && onSelectTime(slot.time)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: periodIndex * 0.1 + index * 0.02 }}
                      whileHover={slot.available ? { scale: 1.05 } : {}}
                      whileTap={slot.available ? { scale: 0.95 } : {}}
                      className={cn(
                        'relative py-2.5 sm:py-3 px-1.5 sm:px-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200',
                        !slot.available && 'bg-neutral-50 text-neutral-300 cursor-not-allowed line-through',
                        slot.available && !isSelected && 'bg-neutral-50 text-neutral-700 hover:bg-primary-50 hover:text-primary-600',
                        isSelected && 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                      )}
                    >
                      {slot.time}

                      {/* Selected indicator */}
                      {isSelected && (
                        <motion.div
                          layoutId="selectedTime"
                          className="absolute inset-0 bg-primary-500 rounded-lg sm:rounded-xl -z-10"
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Time Zone Note */}
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-neutral-100">
        <p className="text-[11px] sm:text-xs text-neutral-400 text-center">
          All times are in Korea Standard Time (KST)
        </p>
      </div>
    </div>
  );
}
