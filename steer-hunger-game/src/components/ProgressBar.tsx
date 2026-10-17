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
    <div className="w-full flex items-center justify-between gap-3 px-4 py-2.5 bg-white/70 backdrop-blur-md border-b border-[#E8DED1] sticky top-0 z-30">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Go to previous question or screen"
          className="p-2 -ml-2 rounded-xl text-[#153A2D] hover:bg-[#153A2D]/10 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#153A2D]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      ) : (
        <div className="w-5" />
      )}

      {/* Segmented Progress */}
      <div className="flex-1 flex items-center gap-1.5 max-w-[240px]">
        {Array.from({ length: total }).map((_, i) => {
          const isCompleted = i < current;
          const isCurrent = i === current;

          return (
            <div
              key={i}
              className="relative h-2 flex-1 rounded-full bg-[#EADECF] overflow-hidden"
            >
              {isCompleted && (
                <motion.div
                  className="absolute inset-0 bg-[#153A2D]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              {isCurrent && (
                <motion.div
                  className="absolute inset-0 bg-[#E27D30]"
                  layoutId="currentProgressSegment"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Indicator */}
      <div className="text-xs font-semibold text-[#153A2D] tabular-nums min-w-[36px] text-right">
        {Math.min(current + 1, total)}/{total}
      </div>
    </div>
  );
}
