"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type CompanionEmotion =
  | "idle"
  | "thinking"
  | "celebrate"
  | "encourage"
  | "explaining"
  | "stamp"
  | "victory";

export type DoctorGuide = "female" | "male" | "team";

interface GameCompanionProps {
  emotion: CompanionEmotion;
  message?: string;
  doctor?: DoctorGuide;
  size?: "sm" | "md" | "lg" | "full";
  className?: string;
}

export function GameCompanion({
  emotion,
  message,
  doctor = "female",
  size = "md",
  className = ""
}: GameCompanionProps) {
  const getImageSrc = () => {
    switch (doctor) {
      case "male":
        return "/images/male doctor.jpg";
      case "team":
        return "/images/both male and female doctor.jpg";
      case "female":
      default:
        return "/images/female doctor.jpg";
    }
  };

  const getDoctorName = () => {
    switch (doctor) {
      case "male":
        return "Dr. Aryan, MD • Lead DEXA Specialist";
      case "team":
        return "Steer Clinical Board • Review Panel";
      case "female":
      default:
        return "Dr. Meera, MD • Metabolic Physician";
    }
  };

  const isFullBody = size === "full";

  return (
    <div className={`relative flex items-center gap-3.5 ${className}`}>
      {/* Animated Doctor Character Avatar / Full Body */}
      <motion.div
        animate={
          emotion === "celebrate" || emotion === "victory"
            ? { y: [0, -10, 0, -6, 0], scale: [1, 1.05, 1] }
            : emotion === "thinking"
            ? { rotate: [0, 3, -3, 0] }
            : emotion === "encourage"
            ? { y: [0, 4, 0] }
            : { y: [0, -3, 0] }
        }
        transition={{
          repeat: emotion === "idle" ? Infinity : 0,
          duration: emotion === "idle" ? 3.5 : 0.6,
          ease: "easeInOut"
        }}
        className={`relative flex-shrink-0 ${
          isFullBody
            ? "w-28 sm:w-36 h-48 sm:h-64"
            : size === "lg"
            ? "w-20 h-20 sm:w-24 sm:h-24"
            : size === "sm"
            ? "w-14 h-14"
            : "w-16 h-16 sm:w-20 sm:h-20"
        }`}
      >
        {isFullBody ? (
          <div className="relative w-full h-full drop-shadow-xl">
            <Image
              src={getImageSrc()}
              alt={getDoctorName()}
              fill
              className="object-contain"
              priority
            />
          </div>
        ) : (
          <div className="relative w-full h-full rounded-[22px] overflow-hidden border-2 border-[#D4AF37]/50 bg-[#143026] shadow-lg">
            <Image
              src={getImageSrc()}
              alt={getDoctorName()}
              fill
              className="object-cover object-top"
              priority
            />
            {/* Live Status indicator */}
            <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-[#D4AF37] border-2 border-[#0D1612]" />
          </div>
        )}

        {/* Floating Celebration Badge */}
        {(emotion === "celebrate" || emotion === "victory") && (
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-[#0D1612] px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1 border border-white/20"
          >
            <span>★</span>
            <span>Accurate</span>
          </motion.div>
        )}
      </motion.div>

      {/* Luxury Doctor Speech Bubble */}
      {message && (
        <AnimatePresence mode="wait">
          <motion.div
            key={message}
            initial={{ opacity: 0, scale: 0.95, x: -8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative flex-1 bg-[#143026] px-4 py-3 rounded-[20px] border border-[#D4AF37]/35 shadow-xl text-xs sm:text-sm"
          >
            {/* Bubble arrow pointer */}
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-r-[8px] border-r-[#143026]" />

            <div className="font-semibold text-[#D4AF37] text-[11px] tracking-wide uppercase mb-0.5 flex items-center gap-1.5">
              <span>{getDoctorName()}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            </div>
            <p className="text-[#F7F5F0] font-normal leading-relaxed">{message}</p>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
