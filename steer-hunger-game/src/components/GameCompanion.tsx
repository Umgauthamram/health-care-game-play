"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export type CompanionEmotion =
  | "idle"
  | "thinking"
  | "celebrate"
  | "encourage"
  | "explaining"
  | "stamp"
  | "victory";

interface GameCompanionProps {
  emotion: CompanionEmotion;
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GameCompanion({
  emotion,
  message,
  size = "md",
  className = ""
}: GameCompanionProps) {
  const getDims = () => {
    switch (size) {
      case "sm":
        return "w-16 h-16";
      case "lg":
        return "w-28 h-28";
      case "md":
      default:
        return "w-20 h-20";
    }
  };

  return (
    <div className={`relative flex items-center gap-3 ${className}`}>
      {/* Animated Doctor/Scientist Game Character Avatar */}
      <motion.div
        animate={
          emotion === "celebrate" || emotion === "victory"
            ? { y: [0, -8, 0, -6, 0], rotate: [0, -5, 5, -3, 0] }
            : emotion === "thinking"
            ? { rotate: [0, 4, -4, 0] }
            : emotion === "encourage"
            ? { y: [0, 3, 0] }
            : { y: [0, -3, 0] }
        }
        transition={{
          repeat: emotion === "idle" ? Infinity : 0,
          duration: emotion === "idle" ? 3 : 0.6,
          ease: "easeInOut"
        }}
        className={`relative ${getDims()} flex-shrink-0 drop-shadow-md`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" role="img" aria-label="Steer Metabolic Guide Doc">
          <defs>
            <radialGradient id="docAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#256B52" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#153A2D" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="coatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#EBF0ED" />
            </linearGradient>
            <linearGradient id="scrubGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#153A2D" />
              <stop offset="100%" stopColor="#0E281F" />
            </linearGradient>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E5A675" />
              <stop offset="100%" stopColor="#D48E58" />
            </linearGradient>
          </defs>

          {/* Background friendly glowing aura ring */}
          <circle cx="50" cy="50" r="48" fill="url(#docAura)" />
          <circle cx="50" cy="50" r="42" fill="#F4ECE1" stroke="#153A2D" strokeWidth="2.5" />

          {/* Doctor Lab Coat Shoulders */}
          <path d="M 22 84 C 25 64 35 58 50 58 C 65 58 75 64 78 84 Z" fill="url(#coatGrad)" stroke="#153A2D" strokeWidth="2" />
          {/* Inner Teal Scrubs */}
          <polygon points="43,62 57,62 50,75" fill="url(#scrubGrad)" />

          {/* Stethoscope */}
          <path d="M 36 64 C 36 78 44 80 50 80 C 56 80 64 78 64 64" fill="none" stroke="#E27D30" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="80" r="3.5" fill="#E27D30" stroke="#FFFFFF" strokeWidth="1" />

          {/* Head & Neck */}
          <rect x="44" y="48" width="12" height="12" rx="3" fill="#D48E58" />
          <ellipse cx="50" cy="38" rx="20" ry="21" fill="url(#skinGrad)" />

          {/* Friendly stylish short hair */}
          <path d="M 29 35 C 28 20 40 16 50 16 C 60 16 72 20 71 35 C 66 26 58 24 50 25 C 41 24 33 28 29 35 Z" fill="#1C1815" />

          {/* Glasses Frame (Steer Smart Style) */}
          <rect x="34" y="32" width="13" height="11" rx="3" fill="none" stroke="#153A2D" strokeWidth="2" />
          <rect x="53" y="32" width="13" height="11" rx="3" fill="none" stroke="#153A2D" strokeWidth="2" />
          <line x1="47" y1="37" x2="53" y2="37" stroke="#153A2D" strokeWidth="2" />

          {/* Dynamic Animated Eyes */}
          {emotion === "celebrate" || emotion === "victory" ? (
            // Joyful curved closed eyes
            <>
              <path d="M 37 38 Q 40.5 34 44 38" fill="none" stroke="#153A2D" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 56 38 Q 59.5 34 63 38" fill="none" stroke="#153A2D" strokeWidth="2.2" strokeLinecap="round" />
            </>
          ) : emotion === "thinking" ? (
            // Curious looking sideways
            <>
              <circle cx="43" cy="37" r="2.2" fill="#153A2D" />
              <circle cx="62" cy="37" r="2.2" fill="#153A2D" />
            </>
          ) : (
            // Focused friendly open eyes
            <>
              <circle cx="40.5" cy="37" r="2" fill="#153A2D" />
              <circle cx="59.5" cy="37" r="2" fill="#153A2D" />
              <circle cx="41.2" cy="36.2" r="0.7" fill="#FFFFFF" />
              <circle cx="60.2" cy="36.2" r="0.7" fill="#FFFFFF" />
            </>
          )}

          {/* Animated Cheerful Eyebrows */}
          {emotion === "celebrate" ? (
            <>
              <path d="M 36 29 Q 40 26 45 28" fill="none" stroke="#1C1815" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 55 28 Q 60 26 64 29" fill="none" stroke="#1C1815" strokeWidth="1.8" strokeLinecap="round" />
            </>
          ) : (
            <>
              <line x1="36" y1="30" x2="44" y2="30" stroke="#1C1815" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="56" y1="30" x2="64" y2="30" stroke="#1C1815" strokeWidth="1.5" strokeLinecap="round" />
            </>
          )}

          {/* Mouth expressions */}
          {emotion === "celebrate" || emotion === "victory" ? (
            // Big smiling mouth
            <path d="M 43 45 Q 50 53 57 45 Z" fill="#9C3A27" stroke="#153A2D" strokeWidth="1" />
          ) : emotion === "encourage" ? (
            // Warm gentle smile
            <path d="M 44 47 Q 50 51 56 47" fill="none" stroke="#153A2D" strokeWidth="2" strokeLinecap="round" />
          ) : (
            // Calm subtle smile
            <path d="M 45 46 Q 50 49 55 46" fill="none" stroke="#153A2D" strokeWidth="1.8" strokeLinecap="round" />
          )}

          {/* Steer Doctor Badge on Coat */}
          <circle cx="32" cy="74" r="3" fill="#E27D30" />
        </svg>

        {/* Small floating badge */}
        {(emotion === "celebrate" || emotion === "victory") && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-[#E27D30] text-white p-1 rounded-full shadow-md"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </motion.div>
        )}
      </motion.div>

      {/* Comic / Game Speech Bubble */}
      {message && (
        <AnimatePresence mode="wait">
          <motion.div
            key={message}
            initial={{ opacity: 0, scale: 0.9, x: -6 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative flex-1 bg-white px-3.5 py-2.5 rounded-2xl border-2 border-[#153A2D]/20 shadow-sm text-xs"
          >
            {/* Speech bubble arrow pointer */}
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-white" />
            <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-r-[9px] border-r-[#153A2D]/20 -z-10" />

            <div className="font-bold text-[#153A2D] text-[10px] tracking-wider uppercase mb-0.5 flex items-center gap-1">
              <span>Dr. Steer Guide</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[#1E2220] font-medium leading-relaxed">{message}</p>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
