import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { QuizCard as QuizCardType } from "@/lib/content";
import {
  IndianThaliIllustration,
  StomachBrainSignaling,
  MuscleFatSplitIllustration,
  Clock4PMRadial
} from "@/components/Illustrations";
import { ParticleBurst } from "@/components/ParticleBurst";
import { GameCompanion } from "@/components/GameCompanion";

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
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
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

  const renderIllustration = () => {
    switch (card.illustrationType) {
      case "hunger":
        return <IndianThaliIllustration className="w-24 h-24 drop-shadow-sm" />;
      case "muscle":
        return <MuscleFatSplitIllustration className="w-full max-w-[260px] h-16" />;
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

  const getCompanionFeedback = () => {
    if (!isAnswered) {
      if (cardIndex === 0) return "Swipe or tap to call it: Myth or Fact?";
      return "What do your gut instincts say on this one?";
    }
    if (isCorrect) {
      if (streak >= 3) return "Incredible streak! You have sharp metabolic intuition!";
      if (streak === 2) return "Spot on! That's 2 correct in a row!";
      return "Excellent! You broke through a common misconception!";
    }
    return "Surprising, isn't it? Even medical guidelines took time to clarify this!";
  };

  return (
    <div className="relative w-full flex-1 flex flex-col items-center justify-start max-w-2xl mx-auto">
      {/* Game Character Companion Live Reaction Header */}
      <div className="w-full mb-4">
        <GameCompanion
          doctor={doctor}
          emotion={
            !isAnswered
              ? "thinking"
              : isCorrect
              ? streak >= 2
                ? "victory"
                : "celebrate"
              : "encourage"
          }
          message={getCompanionFeedback()}
          size="sm"
        />
      </div>

      {/* Streak badge */}
      {streak >= 2 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -6 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="mb-3 px-3 py-1 bg-[#E27D30] text-white rounded-full text-xs font-bold tracking-wide shadow-sm flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.507.787-.798 1.708-.948 2.608C8.5 6.643 8.01 7.785 7.42 8.783c-.482.813-1.084 1.558-1.745 2.193a.998.998 0 00-.28.847c.07.575.39 1.09.877 1.408.825.539 1.78.85 2.766.892.482.02.96-.06 1.413-.23.633-.238 1.18-.65 1.583-1.188.384-.51.61-1.127.65-1.764.062-.977-.282-1.956-.967-2.738-.285-.325-.5-.705-.623-1.114a3.996 3.996 0 01-.137-1.144c.045-.584.267-1.139.638-1.597.26-.32.58-.58.94-.766.38-.198.81-.29 1.25-.268.44.022.86.158 1.22.395.27.177.5.405.67.67.35.54.52 1.18.49 1.83-.04.9-.38 1.76-.98 2.45-.33.38-.56.84-.66 1.33-.12.59-.06 1.2.17 1.76.24.58.64 1.07 1.16 1.42.5.34 1.09.52 1.69.53.52.01 1.03-.13 1.48-.41.4-.25.7-.62.86-1.06.18-.49.19-1.03.04-1.54-.25-.87-.75-1.64-1.44-2.22-.64-.54-1.17-1.2-1.55-1.94-.38-.75-.58-1.58-.58-2.42 0-.94.27-1.85.78-2.63.26-.39.58-.73.95-1.01a1 1 0 00-.32-1.74z" clipRule="evenodd" />
          </svg>
          <span>Streak: {streak} in a row!</span>
        </motion.div>
      )}

      {/* Interactive Card */}
      <div className="relative w-full flex flex-col justify-center">
        <ParticleBurst active={isAnswered && isCorrect} />

        <motion.div
          style={{ x, rotate }}
          drag={isAnswered ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.65}
          onDragEnd={handleDragEnd}
          initial={{ scale: 0.98, opacity: 0, y: 15 }}
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
          className={`relative w-full bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-300 select-none cursor-grab active:cursor-grabbing flex flex-col items-center justify-between shadow-md ${
            isAnswered
              ? isCorrect
                ? "border-[#153A2D]/40 ring-2 ring-[#153A2D]/10"
                : "border-[#E27D30]/40"
              : "border-[#E8DED1] hover:border-[#153A2D]/30"
          }`}
        >
          {!isAnswered && (
            <>
              <motion.div
                style={{ opacity: mythOpacity }}
                className="absolute top-4 left-4 border-2 border-red-500 text-red-600 px-3 py-1 rounded-xl font-black text-xs tracking-wider uppercase rotate-[-12deg] pointer-events-none bg-red-50/95 z-20"
              >
                SWIPING MYTH
              </motion.div>
              <motion.div
                style={{ opacity: factOpacity }}
                className="absolute top-4 right-4 border-2 border-[#153A2D] text-[#153A2D] px-3 py-1 rounded-xl font-black text-xs tracking-wider uppercase rotate-[12deg] pointer-events-none bg-emerald-50/95 z-20"
              >
                SWIPING FACT
              </motion.div>
            </>
          )}

          {/* Top Tag & Card Counter */}
          <div className="w-full flex items-center justify-between text-xs font-semibold text-[#5A6560]">
            <span className="px-3 py-1 rounded-full bg-[#F4ECE1] text-[#153A2D]">
              {card.tag}
            </span>
            <span className="tabular-nums font-bold">Card {cardIndex + 1} of {totalCards}</span>
          </div>

          {/* Center Illustration */}
          <div className="py-4 flex items-center justify-center">
            {renderIllustration()}
          </div>

          {/* Statement */}
          <div className="text-center my-2 max-w-lg">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1E2220] leading-snug">
              &ldquo;{card.statement}&rdquo;
            </h2>
          </div>

          {/* Swipe hint */}
          {!isAnswered && (
            <p className="text-xs text-[#5A6560] font-medium tracking-wide mt-2">
              ← Swipe Left for Myth • Swipe Right for Fact →
            </p>
          )}

          {isAnswered && (
            <div
              className={`w-full py-2 px-4 rounded-xl text-center text-xs sm:text-sm font-bold tracking-wide mt-2 ${
                isCorrect
                  ? "bg-[#153A2D] text-white"
                  : "bg-[#F4ECE1] text-[#153A2D]"
              }`}
            >
              {isCorrect ? "Correct! High medical accuracy." : "Educational Insight: See doctor notes below"}
            </div>
          )}
        </motion.div>
      </div>

      {/* Answer Choice Buttons or Explanation Bottom Sheet */}
      <div className="w-full mt-4">
        {!isAnswered ? (
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => onAnswer("MYTH")}
              className="py-4 px-6 rounded-2xl bg-white border-2 border-[#1E2220]/20 text-[#1E2220] font-bold text-lg hover:bg-[#F4ECE1] active:scale-95 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#153A2D] cursor-pointer"
            >
              MYTH
            </button>
            <button
              type="button"
              onClick={() => onAnswer("FACT")}
              className="py-4 px-6 rounded-2xl bg-[#153A2D] text-white font-bold text-lg hover:bg-[#205743] active:scale-95 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#153A2D] cursor-pointer"
            >
              FACT
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#FFFFFF] rounded-2xl p-5 sm:p-6 border border-[#E8DED1] shadow-md flex flex-col gap-3"
          >
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#153A2D]">
                {card.headline}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6560] leading-relaxed mt-1.5">
                {card.explanation}
              </p>
            </div>

            <div className="text-xs sm:text-sm bg-[#FBF8F3] p-3.5 rounded-xl border border-[#EADECF] text-[#153A2D]">
              <strong className="font-semibold text-[#153A2D]">Doctor Review: </strong>
              {card.doctorTakeaway}
            </div>

            <button
              type="button"
              onClick={onNext}
              className="w-full py-4 px-6 rounded-xl bg-[#153A2D] text-white font-bold text-base hover:bg-[#205743] active:scale-95 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#153A2D] cursor-pointer"
            >
              <span>{cardIndex + 1 < totalCards ? "Next Question" : "See Your Clinical Readout"}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
