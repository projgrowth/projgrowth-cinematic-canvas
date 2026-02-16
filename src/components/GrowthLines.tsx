import { motion } from "framer-motion";

/**
 * Abstract organic SVG lines that subtly trace upward —
 * evoking botanical growth without being literal.
 * Rendered behind hero content at low opacity.
 */
const GrowthLines = () => {
  const lines = [
    // Left vine — gentle S-curve rising
    "M 80 700 C 80 580, 120 500, 95 400 S 70 280, 110 180 S 130 100, 100 20",
    // Center-left — taller, straighter with slight sway
    "M 260 700 C 260 600, 240 520, 250 420 S 270 320, 245 220 S 230 140, 255 40",
    // Right side — wider arc
    "M 900 700 C 880 580, 920 480, 890 360 S 860 260, 910 160 S 930 80, 895 0",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        viewBox="0 0 1200 700"
        fill="none"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {lines.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="hsl(var(--accent))"
            strokeWidth={1}
            strokeLinecap="round"
            opacity={0.08 + i * 0.02}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2.5 + i * 0.5,
              delay: 0.8 + i * 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        ))}

        {/* Small leaf-like offshoots on the left vine */}
        {[
          { d: "M 95 400 C 105 390, 120 385, 130 390", delay: 2.2 },
          { d: "M 110 180 C 100 170, 85 165, 75 170", delay: 2.8 },
          { d: "M 250 420 C 260 410, 275 405, 285 412", delay: 2.5 },
        ].map((leaf, i) => (
          <motion.path
            key={`leaf-${i}`}
            d={leaf.d}
            stroke="hsl(var(--accent))"
            strokeWidth={0.8}
            strokeLinecap="round"
            opacity={0.06}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.8,
              delay: leaf.delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default GrowthLines;
