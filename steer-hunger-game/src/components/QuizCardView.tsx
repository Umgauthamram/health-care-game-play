"use client";

import React, { useState } from "react";
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
}

export function QuizCardView({
  card,
  cardIndex,
  totalCards,
  onAnswer,
  selectedAnswer,
  onNext,
  streak
}: QuizCardProps) {
  const [dragOffset, setDragOffset] = useState<number>(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const mythOpacity = useTransform(x, [-120, -30], [1, 0]);
  const factOpacity = useTransform(x, [30, 120], [0, 1]);

  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === card.answer;

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (isAnswered) return;
    const threshold = 85;
    if (info.offset.x < -threshold) {
      onAnswer("MYTH");
    } else if (info.offset.x > threshold) {
      onAnswer("FACT");
    }
  };

  // Render contextual illustration for the card
  const renderIllustration = () => {
    switch (card.illustrationType) {
      case "hunger":
        return <IndianThaliIllustration className="w-24 h-24 drop-shadow-sm" />;
      case "muscle":
        return <MuscleFatSplitIllustration className="w-full max-w-[240px] h-16" />;
      case "diabetic":
      case "nausea":
        return <StomachBrainSignaling className="w-20 h-20" />;
      case "habits":
        return <Clock4PMRadial className="w-20 h-20" />;
      case "tests":
      default:
        return (
          <div className="w-16 h-16 rounded-2xl bg-[#153A2D]/10 flex items-center justify-center text-[#153A2D]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full flex-1 flex flex-col items-center justify-between pb-4">
      {/* Streak badge */}
      {streak >= 2 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="mb-2 px-3 py-1 bg-[#E27D30] text-white rounded-full text-xs font-bold tracking-wide shadow-sm flex items-center gap-1.5"
        >
          <span>🔥</span>
          <span>{streak} in a row! On a roll</span>
        </motion.div>
      )}

      {/* Interactive Card */}
      <div className="relative w-full max-w-sm flex-1 flex flex-col justify-center my-auto min-h-[340px]">
        <ParticleBurst active={isAnswered && isCorrect} />

        <motion.div
          style={{ x, rotate }}
          drag={isAnswered ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.65}
          onDrag={(_, info) => setDragOffset(info.offset.x)}
          onDragEnd={handleDragEnd}
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={
            isAnswered && !isCorrect
              ? {
                  x: [0, -8, 8, -6, 6, 0],
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45 }
                }
              : { scale: 1, opacity: 1, y: 0 }
          }
          className={`relative w-full bg-white rounded-3xl p-6 border transition-shadow duration-300 select-none cursor-grab active:cursor-grabbing flex flex-col items-center justify-between min-h-[320px] shadow-sm ${
            isAnswered
              ? isCorrect
                ? "border-[#153A2D]/40 ring-2 ring-[#153A2D]/10"
                : "border-[#E27D30]/40"
              : "border-[#E8DED1] hover:border-[#153A2D]/30"
          }`}
        >
          {/* Drag Color Overlays */}
          {!isAnswered && (
            <>
              {/* Myth stamp indicator (left swipe) */}
              <motion.div
                style={{ opacity: mythOpacity }}
                className="absolute top-4 left-4 border-2 border-red-500 text-red-600 px-3 py-1 rounded-xl font-black text-sm tracking-wider uppercase rotate-[-12deg] pointer-events-none bg-red-50/90 z-20"
              >
                MYTH
              </motion.div>
              {/* Fact stamp indicator (right swipe) */}
              <motion.div
                style={{ opacity: factOpacity }}
                className="absolute top-4 right-4 border-2 border-[#153A2D] text-[#153A2D] px-3 py-1 rounded-xl font-black text-sm tracking-wider uppercase rotate-[12deg] pointer-events-none bg-emerald-50/90 z-20"
              >
                FACT
              </motion.div>
            </>
          )}

          {/* Top Tag & Card Counter */}
          <div className="w-full flex items-center justify-between text-xs font-semibold text-[#5A6560]">
            <span className="px-2.5 py-0.5 rounded-full bg-[#F4ECE1] text-[#153A2D]">
              {card.tag}
            </span>
            <span>Card {cardIndex + 1} of {totalCards}</span>
          </div>

          {/* Center Illustration */}
          <div className="py-3 flex items-center justify-center">
            {renderIllustration()}
          </div>

          {/* Statement */}
          <div className="text-center my-2">
            <h2 className="font-serif text-lg md:text-xl font-semibold text-[#1E2220] leading-snug">
              &ldquo;{card.statement}&rdquo;
            </h2>
          </div>

          {/* Swipe hint */}
          {!isAnswered && (
            <p className="text-[11px] text-[#5A6560] font-medium tracking-wide">
              ← Swipe Left (Myth) • Swipe Right (Fact) →
            </p>
          )}

          {/* State feedback banner when answered */}
          {isAnswered && (
            <div
              className={`w-full py-1.5 px-3 rounded-xl text-center text-xs font-bold tracking-wide mt-2 ${
                isCorrect
                  ? "bg-[#153A2D] text-white"
                  : "bg-[#F4ECE1] text-[#153A2D]"
              }`}
            >
              {isCorrect ? "✓ Spot on! You know your biology." : "Good try! Science is counter-intuitive."}
            </div>
          )}
        </motion.div>
      </div>

      {/* Answer Choice Buttons or Explanation Bottom Sheet */}
      <div className="w-full max-w-sm mt-3">
        {!isAnswered ? (
          <div className="grid grid-cols-2 gap-3.5">
            <button
              type="button"
              onClick={() => onAnswer("MYTH")}
              className="py-3.5 px-4 rounded-2xl bg-white border-2 border-[#1E2220]/20 text-[#1E2220] font-bold text-base hover:bg-[#F4ECE1] active:scale-95 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#153A2D]"
            >
              MYTH
            </button>
            <button
              type="button"
              onClick={() => onAnswer("FACT")}
              className="py-3.5 px-4 rounded-2xl bg-[#153A2D] text-white font-bold text-base hover:bg-[#205743] active:scale-95 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#153A2D]"
            >
              FACT
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#FFFFFF] rounded-2xl p-4 border border-[#E8DED1] shadow-md flex flex-col gap-2.5"
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">
                {card.answer === "MYTH" ? "💡" : "🔬"}
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#153A2D]">
                  {card.headline}
                </h3>
                <p className="text-xs text-[#5A6560] leading-relaxed mt-1">
                  {card.explanation}
                </p>
              </div>
            </div>

            <div className="text-[11px] bg-[#FBF8F3] p-2.5 rounded-xl border border-[#EADECF] text-[#153A2D]">
              <strong className="font-semibold text-[#153A2D]">Steer Doctor Note: </strong>
              {card.doctorTakeaway}
            </div>

            <button
              type="button"
              onClick={onNext}
              className="w-full py-3 px-4 rounded-xl bg-[#153A2D] text-white font-bold text-sm hover:bg-[#205743] active:scale-95 transition-all flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#153A2D]"
            >
              <span>{cardIndex + 1 < totalCards ? "Next Question" : "See Your Clinical Readout"}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
