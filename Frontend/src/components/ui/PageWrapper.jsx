import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Cyan wipe bar sweeps across on page nav (SRS AR-12)
const wipeVariants = {
  initial: { scaleX: 0, transformOrigin: 'left' },
  animate: { scaleX: 1, transformOrigin: 'left', transition: { duration: 0.28, ease: [0.76, 0, 0.24, 1] } },
  exit:    { scaleX: 0, transformOrigin: 'right', transition: { duration: 0.28, ease: [0.76, 0, 0.24, 1], delay: 0.05 } },
};

const contentVariants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.33, 1, 0.68, 1], delay: 0.12 }
  },
  exit: {
    opacity: 0, y: -14,
    transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] }
  },
};

const PageWrapper = ({ children, className = '' }) => {
  return (
    <>
      {/* Cyan wipe bar — SRS: page transition requirement */}
      <motion.div
        key="wipe"
        variants={wipeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(135deg, #00c8ff 0%, #0055ff 100%)',
          zIndex: 9000,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Page content */}
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`page-wrapper ${className}`}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageWrapper;
