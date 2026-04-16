import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

/**
 * A premium counter component that animates numbers when they enter the viewport.
 * Handles prefixes, suffixes, and cleans numeric strings automatically.
 */
const Counter = ({ value, duration = 2.5, prefix = "", suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      // Extract numeric part from the value (e.g., "$50M+" -> 50)
      // Note: This simple regex works for integers/decimals.
      const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, '')) || 0;

      const controls = animate(0, numericValue, {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for premium feel
        onUpdate: (latest) => {
          // If the original value was an integer, floor it; otherwise keep decimals
          if (Number.isInteger(numericValue)) {
            setDisplayValue(Math.floor(latest));
          } else {
            setDisplayValue(latest.toFixed(1));
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  // If the value has non-numeric characters at start/end that aren't prefix/suffix,
  // we might need more complex logic. But for standard Sivion stats, this works.

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};

export default Counter;
