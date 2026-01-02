'use client';

import { Fragment, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  height?: 'auto' | 'half' | 'full';
  showHandle?: boolean;
}

function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  height = 'auto',
  showHandle = true,
}: BottomSheetProps) {
  const dragControls = useDragControls();

  const heights = {
    auto: 'max-h-[90vh]',
    half: 'h-[50vh]',
    full: 'h-[90vh]',
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-xl overflow-hidden',
              heights[height]
            )}
          >
            {/* Handle */}
            {showHandle && (
              <div
                className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => dragControls.start(e)}
              >
                <div className="w-10 h-1 bg-neutral-300 rounded-full" />
              </div>
            )}

            {/* Header */}
            {title && (
              <div className="px-5 pb-4 border-b border-neutral-100">
                <h2 className="text-lg font-semibold text-neutral-900 text-center">
                  {title}
                </h2>
              </div>
            )}

            {/* Content */}
            <div className="overflow-y-auto overscroll-contain" style={{ maxHeight: 'calc(90vh - 60px)' }}>
              <div className="p-5">{children}</div>
            </div>

            {/* Safe area padding for iOS */}
            <div className="h-safe-bottom" />
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>,
    document.body
  );
}

export { BottomSheet };
