'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ProcessingOverlayProps {
  isVisible: boolean;
}

export function ProcessingOverlay({ isVisible }: ProcessingOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-full border-4 border-primary-200 border-t-primary-500 mx-auto mb-4"
            />
            <p className="font-medium text-neutral-900 mb-1">Processing your payment</p>
            <p className="text-sm text-neutral-500">Please don&apos;t close this page...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
