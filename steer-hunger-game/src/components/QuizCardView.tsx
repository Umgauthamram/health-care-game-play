"use client";

import React from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { QuizCard as QuizCardType } from "@/lib/content";
import {
  IndianThaliIllustration,
  StomachBrainSignaling,
  MuscleFatSplitIllustration,
  Clock4PMRadial
} from "@/components/Illustrations";
import { ParticleBurst } from "@/components/ParticleBurst";

interface QuizCardProps {
  card: QuizCardType;
  cardIndex: number;
  totalCards: number;
  onAnswer: (choice: "MYTH" | "FACT") => void;
  selectedAnswer: "MYTH" | "FACT" | null;
  onNext: () => void;
  streak: number;
  doctor?: "female" | "male" | "team";
}

export function QuizCardView({
  card,
  cardIndex,
  totalCards,
  onAnswer,
  selectedAnswer,
  onNext,
  streak,
  doctor = "female"
}: QuizCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const mythOpacity = useTransform(x, [-120, -30], [1, 0]);
  const factOpacity = useTransform(x, [30, 120], [0, 1]);

  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === card.answer;

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (isAnswered) return;
    const threshold = 75;
    if (info.offset.x < -threshold) {
      onAnswer("MYTH");
    } else if (info.offset.x > threshold) {
      onAnswer("FACT");
    }
  };

  const getDoctorImageSrc = () => {
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

  const getDoctorComment = () => {
    if (!isAnswered) {
      if (cardIndex === 0) return "Card 1: Swipe Left for Myth or Right for Fact!";
      if (cardIndex === 1) return "Does willpower really dictate 4pm hunger, or is it hormonal?";
      if (cardIndex === 2) return "Think about rapid weight loss: what tissue burns first?";
      if (cardIndex === 3) return "Let's test what you know about early treatment side effects.";
      if (cardIndex === 4) return "What happens after stopping medications without habit shifts?";
      return "Final test: Can anyone jump into metabolic medicine without blood panels?";
    }
    if (isCorrect) {
      if (streak >= 3) return "Exceptional diagnostic streak! You have high clinical accuracy!";
      if (streak === 2) return "Spot on! That's 2 correct in a row!";
      return "Excellent! You broke through a common diet culture misconception!";
    }
    return "Surprising! Most people get this wrong — metabolic biology is counter-intuitive.";
  };

  const renderIllustration = () => {
    switch (card.illustrationType) {
      case "hunger":
        return <IndianThaliIllustration className="w-20 h-20 sm:w-24 sm:h-24" />;
      case "muscle":
        return <MuscleFatSplitIllustration className="w-full max-w-[260px] h-16" />;
      case "diabetic":
      case "nausea":
        return <StomachBrainSignaling className="w-18 h-18 sm:w-20 sm:h-20" />;
      case "habits":
        return <Clock4PMRadial className="w-18 h-18 sm:w-20 sm:h-20" />;
      case "tests":
      default:
        return (
          <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
      {/* LEFT SIDE: Big Doctor Mentor Character with Speech Bubble */}
      <div className="w-full lg:w-[42%] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-shrink-0">
        <div className="relative w-full max-w-[340px] flex flex-col items-center">
          <motion.div
            animate={
              isAnswered && isCorrect
                ? { y: [0, -10, 0, -6, 0], scale: [1, 1.03, 1] }
                : { y: [0, -4, 0] }
            }
            transition={{
              repeat: isAnswered ? 0 : Infinity,
              duration: isAnswered ? 0.6 : 3.5,
              ease: "easeInOut"
            }}
            className="relative w-48 sm:w-56 lg:w-72 h-60 sm:h-68 lg:h-[310px] drop-shadow-2xl"
          >
            <Image
              src={getDoctorImageSrc()}
              alt={getDoctorName()}
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Luxury Doctor Speech Bubble */}
          <motion.div
            key={getDoctorComment()}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-2 bg-[#143026] p-4 sm:p-5 rounded-[24px] border border-[#D4AF37]/35 shadow-xl text-left"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs sm:text-sm font-bold text-[#D4AF37] tracking-wide">
                {getDoctorName()}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            </div>
            <p className="text-xs sm:text-sm text-[#F7F5F0] font-normal leading-snug">
              {getDoctorComment()}
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE: Interactive Luxury Quiz Card Arena */}
      <div className="w-full lg:w-[58%] flex-1 flex flex-col justify-center max-w-xl mx-auto">
        {/* Streak notification */}
        {streak >= 2 && (
          <div className="self-center mb-2 px-4 py-1 bg-gradient-to-r from-[#D4AF37] to-[#C58A38] text-[#0D1612] rounded-full text-xs font-bold tracking-wide shadow-md flex items-center gap-1.5">
            <span>⚡</span>
            <span>Streak: {streak} Correct In A Row!</span>
          </div>
        )}

        <div className="relative w-full">
          <ParticleBurst active={isAnswered && isCorrect} />

          <motion.div
            style={{ x, rotate }}
            drag={isAnswered ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.65}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.98, opacity: 0 }}
            animate={
              isAnswered && !isCorrect
                ? {
                    x: [0, -8, 8, -6, 6, 0],
                    scale: 1,
                    opacity: 1,
                    transition: { duration: 0.45 }
                  }
                : { scale: 1, opacity: 1 }
            }
            className={`relative w-full bg-[#143026]/90 backdrop-blur-md rounded-[32px] p-6 sm:p-7 border transition-all duration-300 select-none cursor-grab active:cursor-grabbing flex flex-col items-center justify-between shadow-2xl ${
              isAnswered
                ? isCorrect
                  ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/40"
                  : "border-[#FF6B6B]"
                : "border-[#D4AF37]/30 hover:border-[#D4AF37]/60"
            }`}
          >
            {!isAnswered && (
              <>
                <motion.div
                  style={{ opacity: mythOpacity }}
                  className="absolute top-4 left-4 border-2 border-red-400 text-red-300 px-3.5 py-1.5 rounded-xl font-bold text-xs tracking-wider uppercase rotate-[-10deg] pointer-events-none bg-red-950/80 z-20"
                >
                  SWIPING MYTH
                </motion.div>
                <motion.div
                  style={{ opacity: factOpacity }}
                  className="absolute top-4 right-4 border-2 border-[#D4AF37] text-[#D4AF37] px-3.5 py-1.5 rounded-xl font-bold text-xs tracking-wider uppercase rotate-[10deg] pointer-events-none bg-[#0D1612]/90 z-20"
                >
                  SWIPING FACT
                </motion.div>
              </>
            )}

            {/* Top metadata */}
            <div className="w-full flex items-center justify-between text-xs font-semibold text-[#F7F5F0]/70">
              <span className="px-3 py-1 rounded-full bg-[#0D1612] border border-[#D4AF37]/30 text-[#D4AF37] uppercase tracking-wider text-[11px]">
                {card.tag}
              </span>
              <span className="font-bold text-white tracking-wide">Card {cardIndex + 1} of {totalCards}</span>
            </div>

            {/* Illustration */}
            <div className="py-2 flex items-center justify-center">
              {renderIllustration()}
            </div>

            {/* Question Statement */}
            <div className="text-center my-1">
              <h2 className="font-serif text-xl sm:text-2xl text-white tracking-tight leading-snug">
                &ldquo;{card.statement}&rdquo;
              </h2>
            </div>

            {!isAnswered && (
              <p className="text-xs text-[#D4AF37]/80 font-medium tracking-wide mt-1">
                ← Swipe Left for Myth • Swipe Right for Fact →
              </p>
            )}

            {isAnswered && (
              <div
                className={`w-full py-2 px-4 rounded-xl text-center text-xs font-bold tracking-wide mt-2 ${
                  isCorrect
                    ? "bg-[#D4AF37] text-[#0D1612]"
                    : "bg-red-500/20 text-red-200 border border-red-500/30"
                }`}
              >
                {isCorrect ? "Correct! High clinical accuracy." : "Surprising! Science is counter-intuitive."}
              </div>
            )}
          </motion.div>
        </div>

        {/* Buttons / Feedback Sheet */}
        <div className="w-full mt-3">
          {!isAnswered ? (
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => onAnswer("MYTH")}
                className="py-3.5 px-6 rounded-full bg-[#0D1612] border-2 border-red-400/50 text-red-300 font-bold text-sm sm:text-base hover:bg-red-950/40 active:scale-95 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
              >
                MYTH
              </button>
              <button
                type="button"
                onClick={() => onAnswer("FACT")}
                className="py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C58A38] text-[#0D1612] font-bold text-sm sm:text-base hover:brightness-110 active:scale-95 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] cursor-pointer"
              >
                FACT
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-[#143026] rounded-[24px] p-4 sm:p-5 border border-[#D4AF37]/30 shadow-xl flex flex-col gap-2"
            >
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {card.headline}
                </h3>
                <p className="text-xs sm:text-sm text-[#F7F5F0]/75 leading-relaxed mt-1">
                  {card.explanation}
                </p>
              </div>

              <div className="text-xs bg-[#0D1612] p-2.5 rounded-xl border border-[#D4AF37]/25 text-[#D4AF37]">
                <strong className="font-semibold text-white">Physician Note: </strong>
                {card.doctorTakeaway}
              </div>

              <button
                type="button"
                onClick={onNext}
                className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C58A38] text-[#0D1612] font-bold text-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1 shadow-md"
              >
                <span>{cardIndex + 1 < totalCards ? "Next Question" : "View Your Clinical Readout"}</span>
                <span className="text-base font-bold">→</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
