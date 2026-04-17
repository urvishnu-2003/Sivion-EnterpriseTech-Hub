import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * TiltCard — SRS AR-04
 * ± 12 deg 3D tilt on mousemove, perspective 900px.
 * Radial-gradient spotlight spotlight follows cursor inside card.
 */
const TiltCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

  // ± 12 deg tilt as per SRS
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nX = (e.clientX - rect.left) / rect.width;
    const nY = (e.clientY - rect.top)  / rect.height;
    x.set(nX - 0.5);
    y.set(nY - 0.5);
    // Update spotlight position (% within card)
    setGlowPos({ x: nX * 100, y: nY * 100 });
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const nX = (touch.clientX - rect.left) / rect.width;
    const nY = (touch.clientY - rect.top)  / rect.height;
    x.set(nX - 0.5);
    y.set(nY - 0.5);
    // Update spotlight position (% within card)
    setGlowPos({ x: nX * 100, y: nY * 100 });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setGlowPos({ x: 50, y: 50 });
  };

  const handleTouchEnd = () => {
    x.set(0);
    y.set(0);
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <div style={{ perspective: '900px' }} className={className}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          // Radial spotlight that follows cursor
          '--mouse-x': `${glowPos.x}%`,
          '--mouse-y': `${glowPos.y}%`,
        }}
        className="tilt-card-inner"
        whileHover={{ scale: 1.01 }}
        transition={{ scale: { duration: 0.2 } }}
      >
        {/* Inner content lifted on Z axis for 3D depth feel */}
        <div style={{ transform: 'translateZ(30px)' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default TiltCard;
