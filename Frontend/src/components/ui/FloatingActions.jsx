import React, { useState } from 'react';
import { MessageCircle, Phone, CalendarDays, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './FloatingActions.css';

const actions = [
  {
    id: 'whatsapp',
    label: 'WhatsApp Us',
    icon: <MessageCircle size={20} />,
    href: 'https://wa.me/1234567890',
    bg: '#25D366',
    shadow: 'rgba(37,211,102,0.4)',
    external: true,
  },
  {
    id: 'call',
    label: 'Call Experts',
    icon: <Phone size={20} />,
    href: 'tel:+12345678900',
    bg: 'linear-gradient(135deg, #0a1628, #0f2040)',
    border: 'rgba(0,200,255,0.4)',
    shadow: 'rgba(0,200,255,0.3)',
    external: false,
  },
  {
    id: 'consult',
    label: 'Book Consultation',
    icon: <CalendarDays size={20} />,
    href: '/contact',
    bg: 'linear-gradient(135deg, #00c8ff, #0055ff)',
    shadow: 'rgba(0,200,255,0.4)',
    external: false,
  },
];

const menuVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  visible: (i) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.07, type: 'spring', stiffness: 300, damping: 20 } }),
  exit:    (i) => ({ opacity: 0, y: 8, scale: 0.9, transition: { delay: i * 0.04 } }),
};

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: 'fixed', bottom: '28px', right: '28px',
        zIndex: 9999,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px',
      }}
      role="complementary"
      aria-label="Quick contact options"
    >
      {/* Action items — shown when open */}
      <AnimatePresence>
        {isOpen && actions.map((action, i) => (
          <motion.div
            key={action.id}
            custom={actions.length - 1 - i}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            {/* Label pill */}
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: 0.1 }}
              style={{
                background: 'rgba(5,13,26,0.9)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(0,200,255,0.15)',
                color: '#e8f0fe',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                fontFamily: 'var(--font-main)',
                letterSpacing: '0.3px',
              }}
            >
              {action.label}
            </motion.span>

            {/* Action button */}
            <motion.a
              href={action.href}
              target={action.external ? '_blank' : '_self'}
              rel={action.external ? 'noreferrer noopener' : undefined}
              aria-label={action.label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: '48px', height: '48px',
                borderRadius: '50%',
                background: action.bg,
                border: action.border ? `1px solid ${action.border}` : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff',
                textDecoration: 'none',
                boxShadow: `0 6px 20px ${action.shadow || 'rgba(0,0,0,0.3)'}`,
                flexShrink: 0,
                cursor: 'pointer',
              }}
            >
              {action.icon}
            </motion.a>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main FAB toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close quick contact' : 'Open quick contact'}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        style={{
          width: '62px', height: '62px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00c8ff 0%, #0055ff 100%)',
          color: '#fff',
          border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 30px rgba(0,200,255,0.45)',
          position: 'relative',
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
        </motion.div>

        {/* Radar pulse rings — SRS INT-01 */}
        {!isOpen && (
          <>
            <motion.span
              aria-hidden="true"
              animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
              style={{
                position: 'absolute', inset: '-8px',
                borderRadius: '50%',
                border: '2px solid rgba(0,200,255,0.5)',
                pointerEvents: 'none',
              }}
            />
            <motion.span
              aria-hidden="true"
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeOut', delay: 0.7 }}
              style={{
                position: 'absolute', inset: '-8px',
                borderRadius: '50%',
                border: '2px solid rgba(0,200,255,0.3)',
                pointerEvents: 'none',
              }}
            />
          </>
        )}
      </motion.button>
    </div>
  );
};

export default FloatingActions;
