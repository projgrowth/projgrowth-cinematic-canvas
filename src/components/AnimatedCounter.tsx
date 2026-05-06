import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
  delay?: number;
}

const AnimatedCounter = ({ value, className = "", delay = 0 }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part and suffix/prefix
    const match = value.match(/^([+-]?)(\d+\.?\d*)(.*)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const targetNum = parseFloat(numStr);
    const isDecimal = numStr.includes(".");
    const decimalPlaces = isDecimal ? numStr.split(".")[1]?.length || 0 : 0;

    const duration = 1500;
    const startTime = Date.now();
    const delayMs = delay * 1000;

    const timer = setTimeout(() => {
      const animate = () => {
        const elapsed = Date.now() - startTime - delayMs;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-smooth cubic)
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = targetNum * eased;

        if (isDecimal) {
          setDisplayValue(`${prefix}${current.toFixed(decimalPlaces)}${suffix}`);
        } else {
          setDisplayValue(`${prefix}${Math.floor(current)}${suffix}`);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };

      animate();
    }, delayMs);

    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay }}
    >
      {displayValue}
    </motion.span>
  );
};

export default AnimatedCounter;
