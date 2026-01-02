'use client';

import { motion } from 'framer-motion';
import { Lock, Shield, Sparkles } from 'lucide-react';

export function SecurityBadges() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex items-center justify-center gap-6 py-6"
    >
      <div className="flex items-center gap-2 text-neutral-400">
        <Lock className="w-4 h-4" />
        <span className="text-xs">SSL Encrypted</span>
      </div>
      <div className="w-px h-4 bg-neutral-200" />
      <div className="flex items-center gap-2 text-neutral-400">
        <Shield className="w-4 h-4" />
        <span className="text-xs">PCI Compliant</span>
      </div>
      <div className="w-px h-4 bg-neutral-200" />
      <div className="flex items-center gap-2 text-neutral-400">
        <Sparkles className="w-4 h-4" />
        <span className="text-xs">Refundable</span>
      </div>
    </motion.div>
  );
}
