'use client';

import { Fragment, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
};

function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
}: ModalProps) {
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
            onClick={closeOnOverlayClick ? onClose : undefined}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className={cn(
                'relative w-full bg-white rounded-2xl shadow-xl',
                sizes[size]
              )}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-start justify-between p-5 border-b border-neutral-100">
                  <div>
                    {title && (
                      <h2 className="text-lg font-semibold text-neutral-900">
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p className="mt-1 text-sm text-neutral-500">
                        {description}
                      </p>
                    )}
                  </div>
                  {showCloseButton && (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={onClose}
                      className="text-neutral-400 hover:text-neutral-600"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-5">{children}</div>
            </motion.div>
          </div>
        </Fragment>
      )}
    </AnimatePresence>,
    document.body
  );
}

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 pt-4 border-t border-neutral-100 mt-4 -mx-5 -mb-5 px-5 py-4 bg-neutral-50 rounded-b-2xl',
        className
      )}
    >
      {children}
    </div>
  );
}

export { Modal, ModalFooter };
