import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ParticleBurstProps {
  active: boolean;
}

export function ParticleBurst({ active }: ParticleBurstProps) {
  if (!active) return null;

  // 12 particles bursting out
  const particles = [
    { x: 0, y: -50, color: "#153A2D" },
    { x: 35, y: -35, color: "#E27D30" },
    { x: 50, y: 0, color: "#2E6B48" },
    { x: 35, y: 35, color: "#F0A638" },
    { x: 0, y: 50, color: "#153A2D" },
    { x: -35, y: 35, color: "#E27D30" },
    { x: -50, y: 0, color: "#2E6B48" },
    { x: -35, y: -35, color: "#F0A638" },
    { x: 18, y: -45, color: "#153A2D" },
    { x: 45, y: -18, color: "#E27D30" },
    { x: -45, y: 18, color: "#2E6B48" },
    { x: -18, y: 45, color: "#F0A638" }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.3, 0],
              x: p.x * 1.6,
              y: p.y * 1.6,
              opacity: [1, 0.9, 0]
            }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            style={{ backgroundColor: p.color }}
            className="absolute w-2.5 h-2.5 rounded-full"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
