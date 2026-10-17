import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  total: number;
  current: number; // 0-indexed or 1-indexed
  onBack?: () => void;
  showBack?: boolean;
}

export function QuizProgressBar({ total, current, onBack, showBack = true }: ProgressBarProps) {
  return (
    <div className="w-full flex items-center justify-between gap-3 px-4 py-2 bg-[#143026]/80 backdrop-blur-md border border-[#D4AF37]/20 rounded-full mb-3">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Go to previous question or screen"
          className="p-1.5 rounded-full text-[#D4AF37] hover:bg-white/10 active:scale-95 transition-all focus:outline-none focus:ring-1 focus:ring-[#D4AF37] cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      ) : (
        <div className="w-4" />
      )}

      {/* Segmented Progress */}
      <div className="flex-1 flex items-center gap-1.5 max-w-[260px]">
        {Array.from({ length: total }).map((_, i) => {
          const isCompleted = i < current;
          const isCurrent = i === current;

          return (
            <div
              key={i}
              className="relative h-1.5 flex-1 rounded-full bg-white/15 overflow-hidden"
            >
              {isCompleted && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              {isCurrent && (
                <motion.div
                  className="absolute inset-0 bg-[#D4AF37]"
                  layoutId="currentProgressSegment"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Indicator */}
      <div className="text-xs font-bold text-[#D4AF37] tabular-nums min-w-[36px] text-right">
        {Math.min(current + 1, total)}/{total}
      </div>
    </div>
  );
}
