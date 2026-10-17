"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { GAME_CONTENT } from "@/lib/content";
import { GameScreen } from "@/lib/schema";
import { sound, track } from "@/lib/sound";
import {
  Clock4PMRadial,
  IndianThaliIllustration,
  MuscleFatSplitIllustration,
  StomachBrainSignaling,
  SteerBadge
} from "@/components/Illustrations";
import { QuizProgressBar } from "@/components/ProgressBar";
import { QuizCardView } from "@/components/QuizCardView";

interface GameEngineProps {
  initialSource?: "meta" | "website";
  isEmbedded?: boolean;
}

const STORAGE_KEY = "steer_hunger_game_v1";

export function GameEngine({ initialSource = "website", isEmbedded = false }: GameEngineProps) {
  // Game state
  const [screen, setScreen] = useState<GameScreen>("hook");
  const [chosenDoubts, setChosenDoubts] = useState<string[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, "MYTH" | "FACT">>({});
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [mythsMissed, setMythsMissed] = useState<number[]>([]);
  const [soundMuted, setSoundMuted] = useState<boolean>(true);
  const [source, setSource] = useState<"meta" | "website">(initialSource);

  // Form state
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Read URL query params on client if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const srcParam = urlParams.get("src");
      if (srcParam === "meta" || srcParam === "website") {
        setSource(srcParam);
      }
    }
  }, []);

  // Hydrate from sessionStorage safely
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.screen) setScreen(parsed.screen);
        if (parsed.chosenDoubts) setChosenDoubts(parsed.chosenDoubts);
        if (parsed.currentCardIndex !== undefined) setCurrentCardIndex(parsed.currentCardIndex);
        if (parsed.userAnswers) setUserAnswers(parsed.userAnswers);
        if (parsed.score !== undefined) setScore(parsed.score);
        if (parsed.streak !== undefined) setStreak(parsed.streak);
        if (parsed.mythsMissed) setMythsMissed(parsed.mythsMissed);
      }
    } catch {
      // ignore storage failure
    }
  }, []);

  // Sync to sessionStorage
  useEffect(() => {
    try {
      const stateToSave = {
        screen,
        chosenDoubts,
        currentCardIndex,
        userAnswers,
        score,
        streak,
        mythsMissed
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // ignore
    }
  }, [screen, chosenDoubts, currentCardIndex, userAnswers, score, streak, mythsMissed]);

  const toggleSound = () => {
    const nextState = !soundMuted;
    setSoundMuted(nextState);
    sound.setMuted(nextState);
    if (!nextState) {
      sound.playTap();
    }
  };

  // Screen navigation helpers
  const handleStartGame = () => {
    sound.playTap();
    track("game_start", { source });
    setScreen("doubts");
  };

  const handleToggleDoubt = (id: string) => {
    sound.playTap();
    if (chosenDoubts.includes(id)) {
      setChosenDoubts(chosenDoubts.filter((d) => d !== id));
      track("doubt_deselected", { doubtId: id });
    } else {
      if (chosenDoubts.length < 2) {
        const updated = [...chosenDoubts, id];
        setChosenDoubts(updated);
        track("doubt_selected", { doubtId: id, count: updated.length });
      }
    }
  };

  const handleStartQuiz = () => {
    sound.playTap();
    track("quiz_started", { doubts: chosenDoubts });
    setScreen("quiz");
  };

  const handleAnswerCard = (choice: "MYTH" | "FACT") => {
    const currentCard = GAME_CONTENT.cards[currentCardIndex];
    if (userAnswers[currentCard.id]) return; // already answered

    const isCorrect = choice === currentCard.answer;
    const newAnswers = { ...userAnswers, [currentCard.id]: choice };
    setUserAnswers(newAnswers);

    if (isCorrect) {
      sound.playCorrect();
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      sound.playIncorrect();
      setStreak(0);
      setMythsMissed((prev) => [...prev, currentCard.id]);
    }

    track("card_answered", {
      cardId: currentCard.id,
      choice,
      isCorrect,
      currentCardIndex
    });
  };

  const handleNextCard = () => {
    sound.playTap();
    if (currentCardIndex + 1 < GAME_CONTENT.cards.length) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      // End of quiz: go to readout
      sound.playStamp();
      track("readout_viewed", { score, mythsMissed, chosenDoubts });
      setScreen("readout");
    }
  };

  const handleGoToLead = () => {
    sound.playTap();
    track("lead_started", { score });
    setScreen("lead");
  };

  const handleBack = () => {
    sound.playTap();
    if (screen === "doubts") {
      setScreen("hook");
    } else if (screen === "quiz") {
      if (currentCardIndex > 0) {
        setCurrentCardIndex((prev) => prev - 1);
      } else {
        setScreen("doubts");
      }
    } else if (screen === "readout") {
      setScreen("quiz");
    } else if (screen === "lead") {
      setScreen("readout");
    }
  };

  const handleRestart = () => {
    sound.playTap();
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setScreen("hook");
    setChosenDoubts([]);
    setCurrentCardIndex(0);
    setUserAnswers({});
    setScore(0);
    setStreak(0);
    setMythsMissed([]);
    setName("");
    setPhone("");
    setFormErrors({});
    track("game_restarted");
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; phone?: string; general?: string } = {};

    const cleanName = name.trim();
    const cleanPhone = phone.trim().replace(/\D/g, "");

    if (!cleanName || cleanName.length < 2) {
      errors.name = "Please enter your full name (minimum 2 letters)";
    }

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.phone = "Enter a valid 10-digit Indian mobile starting with 6, 7, 8, or 9";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      sound.playIncorrect();
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const payload = {
        name: cleanName,
        phone: cleanPhone,
        chosenDoubts,
        score,
        mythsMissed,
        source
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        track("lead_submitted", { source, score });
        sound.playCorrect();

        // Confetti burst
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#153A2D", "#E27D30", "#2E6B48", "#F0A638"]
          });
        } catch {
          // ignore if canvas blocked
        }

        setScreen("thankyou");
      } else {
        setFormErrors({
          general: data.message || "Failed to submit. Please check your details."
        });
        sound.playIncorrect();
      }
    } catch {
      setFormErrors({ general: "Network connection error. Please try again." });
      sound.playIncorrect();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rank metadata based on score
  const getRankData = (currentScore: number) => {
    if (currentScore === 6) {
      return {
        title: "Metabolic Scholar",
        badge: "⭐ 6/6 Perfect Science",
        desc: "You have an exceptional grasp of metabolic physiology and how hormones steer cravings."
      };
    }
    if (currentScore >= 4) {
      return {
        title: "Metabolically Savvy",
        badge: "🌿 High Clinical Awareness",
        desc: "You see right through common diet culture myths and recognise real biological signals."
      };
    }
    return {
      title: "Metabolic Explorer",
      badge: "🔍 Curious & Ready to Learn",
      desc: "Like 90% of people, you were taught old willpower rules. Real metabolic science changes everything."
    };
  };

  const rank = getRankData(score);

  return (
    <div className={`w-full min-h-screen flex flex-col items-center justify-between ${isEmbedded ? "bg-transparent p-0" : "bg-[#FBF8F3] px-3 py-2 sm:py-6"}`}>
      {/* Centered Mobile Frame (Max width 440px) */}
      <main
        className={`w-full max-w-[440px] flex-1 flex flex-col bg-[#FBF8F3] relative overflow-hidden ${
          isEmbedded ? "rounded-none shadow-none border-0" : "sm:rounded-[36px] sm:shadow-2xl sm:border sm:border-[#E8DED1]"
        }`}
        style={{ minHeight: isEmbedded ? "100vh" : "640px" }}
      >
        {/* Top Header / Sound Toggle */}
        <header className="w-full flex items-center justify-between px-5 py-3.5 bg-white/80 backdrop-blur-sm border-b border-[#E8DED1] z-20">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold tracking-tight text-[#153A2D]">
              Steer<span className="text-[#E27D30]">.</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#5A6560] bg-[#F4ECE1] px-2 py-0.5 rounded-full">
              4pm Hunger Game
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundMuted ? "Unmute audio effects" : "Mute audio effects"}
              className="p-1.5 rounded-full text-[#153A2D] hover:bg-[#F4ECE1] transition-all focus:outline-none focus:ring-2 focus:ring-[#153A2D]"
            >
              {soundMuted ? (
                <svg className="w-5 h-5 text-[#5A6560]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-[#153A2D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Dynamic Screen Content with Animated Spring Transitions */}
        <div className="relative flex-1 flex flex-col overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* 1. HOOK SCREEN */}
            {screen === "hook" && (
              <motion.div
                key="screen-hook"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex-1 flex flex-col justify-between p-6"
              >
                <div className="flex flex-col items-center text-center">
                  <SteerBadge text="DOCTOR-LED METABOLIC SCIENCE" />

                  {/* Animated Clock / Thali Hook Illustration */}
                  <div className="relative my-6 flex items-center justify-center">
                    <Clock4PMRadial className="w-32 h-32" />
                    <div className="absolute -bottom-3 -right-2 bg-white px-2.5 py-1 rounded-full shadow-md border border-[#E8DED1] text-xs font-bold text-[#153A2D] flex items-center gap-1">
                      <span>🍛</span>
                      <span>Post-Thali Crash</span>
                    </div>
                  </div>

                  {/* Staggered Headline */}
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2220] leading-snug">
                    Why does hunger hit hard at{" "}
                    <span className="text-[#E27D30] underline decoration-[#E27D30]/40 decoration-wavy">
                      4:00 PM
                    </span>
                    , even after a full thali?
                  </h1>

                  <p className="mt-3 text-sm text-[#5A6560] leading-relaxed max-w-xs">
                    {GAME_CONTENT.hook.subhead}
                  </p>

                  {/* Realistic Indian Diet Context */}
                  <div className="mt-4 p-3 bg-white rounded-2xl border border-[#EADECF] flex items-center gap-3 text-left">
                    <IndianThaliIllustration className="w-12 h-12 flex-shrink-0" />
                    <div className="text-xs text-[#5A6560]">
                      <strong className="text-[#153A2D] font-semibold block">The Indian Office Afternoon Dilemma</strong>
                      Dal, 2 rotis & curd at 1:30pm... yet by 4pm, your brain demands chai and namkeen.
                    </div>
                  </div>
                </div>

                {/* Bottom CTA & Disclaimers */}
                <div className="mt-8 flex flex-col items-center gap-3 safe-pb">
                  <button
                    type="button"
                    onClick={handleStartGame}
                    className="w-full py-4 px-6 rounded-2xl bg-[#E27D30] text-white font-bold text-base hover:bg-[#C85E16] active:scale-95 transition-all shadow-lg animate-breathing flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#E27D30]"
                  >
                    <span>{GAME_CONTENT.hook.ctaButton}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  <p className="text-[11px] text-[#5A6560] text-center">
                    ⏱️ 60 seconds • 6 interactive cards • Instant clinical readout
                  </p>

                  <p className="text-[10px] text-[#8C9893] text-center leading-tight">
                    *Educational quiz only. Not medical advice. Steer doctors evaluate tests before prescribing.
                  </p>
                </div>
              </motion.div>
            )}

            {/* 2. PICK DOUBTS SCREEN */}
            {screen === "doubts" && (
              <motion.div
                key="screen-doubts"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col justify-between p-5"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#E27D30] tracking-wider uppercase">
                      Step 1 of 2
                    </span>
                    <span className="text-xs font-medium text-[#5A6560]">
                      {chosenDoubts.length}/2 Selected
                    </span>
                  </div>

                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1E2220] leading-snug">
                    What is your biggest doubt about modern metabolic science?
                  </h2>
                  <p className="text-xs text-[#5A6560] mt-1.5 leading-relaxed">
                    Pick up to 2 doubts. We will tailor your doctor-led readout to answer them directly.
                  </p>

                  {/* Doubt Chips */}
                  <div className="mt-4 flex flex-col gap-2.5">
                    {GAME_CONTENT.doubts.map((doubt) => {
                      const isSelected = chosenDoubts.includes(doubt.id);
                      const isMaxReached = chosenDoubts.length >= 2 && !isSelected;

                      return (
                        <button
                          key={doubt.id}
                          type="button"
                          onClick={() => handleToggleDoubt(doubt.id)}
                          disabled={isMaxReached}
                          className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between active:scale-[0.98] ${
                            isSelected
                              ? "bg-[#153A2D] text-white border-[#153A2D] shadow-md"
                              : isMaxReached
                              ? "bg-white/50 text-[#9DA8A3] border-[#E8DED1] opacity-60 cursor-not-allowed"
                              : "bg-white text-[#1E2220] border-[#E8DED1] hover:border-[#153A2D]/40 shadow-sm"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold ${
                                isSelected
                                  ? "bg-white/20 text-white"
                                  : "bg-[#F4ECE1] text-[#153A2D]"
                              }`}
                            >
                              {doubt.id === "safety" && "🛡️"}
                              {doubt.id === "muscle" && "💪"}
                              {doubt.id === "regain" && "🔄"}
                              {doubt.id === "diabetics" && "🔬"}
                              {doubt.id === "fit" && "🎯"}
                            </div>
                            <div>
                              <div className="text-sm font-semibold leading-tight">
                                {doubt.label}
                              </div>
                              <span
                                className={`text-[10px] tracking-wide ${
                                  isSelected ? "text-emerald-100" : "text-[#5A6560]"
                                }`}
                              >
                                {doubt.tag}
                              </span>
                            </div>
                          </div>

                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                              isSelected
                                ? "bg-[#E27D30] border-[#E27D30] text-white"
                                : "border-[#C5BCB0]"
                            }`}
                          >
                            {isSelected && (
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2 safe-pb">
                  <button
                    type="button"
                    onClick={handleStartQuiz}
                    disabled={chosenDoubts.length === 0}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
                      chosenDoubts.length > 0
                        ? "bg-[#153A2D] text-white hover:bg-[#205743] active:scale-95 shadow-lg focus:ring-2 focus:ring-[#153A2D]"
                        : "bg-[#E0D8CE] text-[#8C9893] cursor-not-allowed"
                    }`}
                  >
                    <span>Begin the 4pm Quiz</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-xs text-[#5A6560] font-medium py-1 hover:text-[#153A2D] transition-colors"
                  >
                    ← Back to Hook
                  </button>
                </div>
              </motion.div>
            )}

            {/* 3. SIX MYTH OR FACT CARDS */}
            {screen === "quiz" && (
              <motion.div
                key="screen-quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col"
              >
                <QuizProgressBar
                  total={GAME_CONTENT.cards.length}
                  current={currentCardIndex}
                  onBack={handleBack}
                />

                <div className="flex-1 flex flex-col p-4">
                  <QuizCardView
                    card={GAME_CONTENT.cards[currentCardIndex]}
                    cardIndex={currentCardIndex}
                    totalCards={GAME_CONTENT.cards.length}
                    selectedAnswer={userAnswers[GAME_CONTENT.cards[currentCardIndex].id] || null}
                    onAnswer={handleAnswerCard}
                    onNext={handleNextCard}
                    streak={streak}
                  />
                </div>
              </motion.div>
            )}

            {/* 4. PERSONALISED READOUT */}
            {screen === "readout" && (
              <motion.div
                key="screen-readout"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="flex-1 flex flex-col justify-between p-5"
              >
                <div className="flex flex-col gap-4">
                  {/* Doctor badge & Rank stamp */}
                  <div className="flex items-center justify-between">
                    <SteerBadge text="CLINICAL READOUT" />
                    <span className="text-xs font-bold text-[#E27D30]">{rank.badge}</span>
                  </div>

                  {/* Stamp Reveal */}
                  <motion.div
                    initial={{ scale: 0.85, rotate: -3, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="p-4 bg-white rounded-3xl border border-[#E8DED1] shadow-sm flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-[11px] font-bold text-[#5A6560] uppercase tracking-wider">
                        Your Metabolic Status
                      </div>
                      <h2 className="font-serif text-xl font-bold text-[#153A2D] mt-0.5">
                        {rank.title}
                      </h2>
                      <p className="text-xs text-[#5A6560] mt-1 leading-snug">
                        {rank.desc}
                      </p>
                    </div>

                    {/* Animated Score Ring */}
                    <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-[#EADECF]"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <motion.path
                          className="text-[#153A2D]"
                          strokeWidth="3.5"
                          strokeDasharray="100, 100"
                          initial={{ strokeDashoffset: 100 }}
                          animate={{ strokeDashoffset: 100 - (score / 6) * 100 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-sm font-black text-[#153A2D]">{score}/6</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Muscle / Fat DEXA split */}
                  <div className="p-4 bg-white rounded-3xl border border-[#E8DED1] shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#153A2D]">
                        The DEXA Metric: Muscle vs Fat
                      </span>
                      <span className="text-[10px] text-[#E27D30] font-semibold">
                        Steer Gold Standard
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5A6560] leading-snug mb-2.5">
                      {GAME_CONTENT.readoutStep.dexaConceptDesc}
                    </p>
                    <MuscleFatSplitIllustration className="w-full h-16" />
                  </div>

                  {/* Tailored Doubt Answers */}
                  <div className="flex flex-col gap-2.5">
                    <div className="text-xs font-bold text-[#153A2D] uppercase tracking-wider">
                      Addressing Your Chosen Doubts
                    </div>

                    {chosenDoubts.length > 0 ? (
                      chosenDoubts.map((doubtId) => {
                        const doubtObj = GAME_CONTENT.doubts.find((d) => d.id === doubtId);
                        if (!doubtObj) return null;
                        return (
                          <div
                            key={doubtObj.id}
                            className="p-3.5 bg-white rounded-2xl border-l-4 border-[#153A2D] border-[#E8DED1] shadow-sm"
                          >
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#153A2D]">
                              <span>🩺</span>
                              <span>{doubtObj.readoutTitle}</span>
                            </div>
                            <p className="text-xs text-[#5A6560] mt-1 leading-relaxed">
                              {doubtObj.readoutTip}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-3 bg-white rounded-2xl border border-[#E8DED1] text-xs text-[#5A6560]">
                        Comprehensive blood panels and medical history precede every clinical plan.
                      </div>
                    )}
                  </div>

                  {/* Indian Diet 4pm Tip */}
                  <div className="p-4 bg-[#F4ECE1] rounded-3xl border border-[#E27D30]/30 shadow-sm flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🍛</span>
                      <h3 className="font-serif text-sm font-bold text-[#153A2D]">
                        {GAME_CONTENT.readoutStep.indianDietTipTitle}
                      </h3>
                    </div>
                    <p className="text-xs text-[#1E2220] leading-relaxed">
                      {GAME_CONTENT.readoutStep.indianDietTip}
                    </p>
                  </div>
                </div>

                {/* Bottom CTA to Lead Screen */}
                <div className="mt-6 flex flex-col gap-2 safe-pb">
                  <button
                    type="button"
                    onClick={handleGoToLead}
                    className="w-full py-4 px-6 rounded-2xl bg-[#153A2D] text-white font-bold text-base hover:bg-[#205743] active:scale-95 transition-all shadow-lg shine-sweep flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#153A2D]"
                  >
                    <span>{GAME_CONTENT.readoutStep.ctaButton}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-xs text-[#5A6560] font-medium py-1 hover:text-[#153A2D] transition-colors"
                  >
                    ← Review Questions
                  </button>
                </div>
              </motion.div>
            )}

            {/* 5. LEAD CAPTURE SCREEN */}
            {screen === "lead" && (
              <motion.div
                key="screen-lead"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col justify-between p-5"
              >
                <div>
                  <SteerBadge text="DOCTOR-LED FIT ASSESSMENT" />

                  <h2 className="font-serif text-2xl font-bold text-[#1E2220] mt-2 leading-snug">
                    See if the Steer Programme Fits You
                  </h2>
                  <p className="text-xs text-[#5A6560] mt-1.5 leading-relaxed">
                    A Steer medical advisor reviews your metabolic quiz results and shares whether our doctor-led protocol is clinically right for you.
                  </p>

                  {/* Doctor Guarantees */}
                  <div className="mt-4 p-3 bg-white rounded-2xl border border-[#E8DED1] flex flex-col gap-2">
                    {GAME_CONTENT.leadStep.doctorGuarantee.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#5A6560]">
                        <span className="text-[#153A2D] font-bold text-sm">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Form */}
                  <form onSubmit={handleLeadSubmit} className="mt-5 flex flex-col gap-3.5">
                    {formErrors.general && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                        {formErrors.general}
                      </div>
                    )}

                    {/* Name Input */}
                    <div>
                      <label htmlFor="lead-name" className="block text-xs font-bold text-[#153A2D] mb-1">
                        Full Name
                      </label>
                      <input
                        id="lead-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                        }}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full px-4 py-3.5 rounded-xl bg-white border text-sm text-[#1E2220] placeholder-[#A2ADA7] focus:outline-none focus:ring-2 transition-all ${
                          formErrors.name
                            ? "border-red-400 focus:ring-red-400"
                            : "border-[#E8DED1] focus:ring-[#153A2D] focus:border-[#153A2D]"
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Mobile Input */}
                    <div>
                      <label htmlFor="lead-phone" className="block text-xs font-bold text-[#153A2D] mb-1">
                        WhatsApp / Mobile Number
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-sm font-semibold text-[#5A6560]">
                          +91
                        </span>
                        <input
                          id="lead-phone"
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={10}
                          required
                          value={phone}
                          onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, "");
                            setPhone(digits);
                            if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                          }}
                          placeholder="98765 43210"
                          className={`w-full pl-13 pr-4 py-3.5 rounded-xl bg-white border text-sm text-[#1E2220] font-medium tracking-wide placeholder-[#A2ADA7] focus:outline-none focus:ring-2 transition-all ${
                            formErrors.phone
                              ? "border-red-400 focus:ring-red-400"
                              : "border-[#E8DED1] focus:ring-[#153A2D] focus:border-[#153A2D]"
                          }`}
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.phone}</p>
                      )}
                    </div>

                    {/* Privacy Note */}
                    <p className="text-[11px] text-[#5A6560] leading-relaxed mt-1">
                      🔒 <span className="font-semibold text-[#153A2D]">Privacy Note (Draft for Review):</span> Steer respects your medical confidentiality. Your details are used strictly for clinical assessment discussions. Zero spam.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-4 px-6 rounded-2xl bg-[#E27D30] text-white font-bold text-base hover:bg-[#C85E16] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#E27D30] disabled:opacity-70 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Connecting with Steer Doctors...
                        </span>
                      ) : (
                        <>
                          <span>{GAME_CONTENT.leadStep.submitButton}</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <div className="mt-4 flex flex-col items-center gap-2 safe-pb">
                  <p className="text-[10px] text-[#8C9893] text-center leading-tight">
                    *Educational only. Steer does not guarantee drug suitability without physician review and blood diagnostics.
                  </p>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-xs text-[#5A6560] font-medium py-1 hover:text-[#153A2D] transition-colors"
                  >
                    ← Back to Scorecard
                  </button>
                </div>
              </motion.div>
            )}

            {/* 6. THANK YOU / HANDOFF SCREEN */}
            {screen === "thankyou" && (
              <motion.div
                key="screen-thankyou"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex-1 flex flex-col justify-between p-6 text-center"
              >
                <div className="flex-1 flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className="w-20 h-20 rounded-full bg-[#153A2D] text-white flex items-center justify-center text-3xl shadow-lg mb-4"
                  >
                    ✓
                  </motion.div>

                  <SteerBadge text="REQUEST CONFIRMED" />

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153A2D] mt-3">
                    {GAME_CONTENT.thankyouStep.title}
                  </h2>

                  <p className="text-sm text-[#5A6560] mt-3 leading-relaxed max-w-xs">
                    {GAME_CONTENT.thankyouStep.subtitle}
                  </p>

                  <div className="mt-6 p-4 bg-white rounded-2xl border border-[#E8DED1] text-left max-w-xs w-full shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#153A2D] mb-1">
                      <span>💬</span>
                      <span>Next Steps</span>
                    </div>
                    <p className="text-xs text-[#5A6560] leading-snug">
                      {GAME_CONTENT.thankyouStep.whatsAppNotice}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-2 safe-pb">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="w-full py-3.5 px-6 rounded-2xl bg-white border border-[#E8DED1] text-[#153A2D] font-bold text-sm hover:bg-[#F4ECE1] active:scale-95 transition-all shadow-sm"
                  >
                    Play Again
                  </button>
                  <p className="text-[10px] text-[#8C9893]">
                    Steer Metabolic Health Club • Doctor-Led Care
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
