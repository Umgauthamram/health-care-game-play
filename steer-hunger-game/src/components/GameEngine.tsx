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
  SteerBadge,
  GameIconShield,
  GameIconBicep,
  GameIconRefresh,
  GameIconMicroscope,
  GameIconTarget
} from "@/components/Illustrations";
import { QuizProgressBar } from "@/components/ProgressBar";
import { QuizCardView } from "@/components/QuizCardView";
import { GameCompanion } from "@/components/GameCompanion";

interface GameEngineProps {
  initialSource?: "meta" | "website";
  initialScreen?: GameScreen;
  isEmbedded?: boolean;
}

const STORAGE_KEY = "steer_hunger_game_v1";

export function GameEngine({
  initialSource = "website",
  initialScreen = "doubts",
  isEmbedded = false
}: GameEngineProps) {
  const [screen, setScreen] = useState<GameScreen>(initialScreen);
  const [chosenDoubts, setChosenDoubts] = useState<string[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, "MYTH" | "FACT">>({});
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [mythsMissed, setMythsMissed] = useState<number[]>([]);
  const [soundMuted, setSoundMuted] = useState<boolean>(true);
  const [source, setSource] = useState<"meta" | "website">(initialSource);
  const [selectedDoctor, setSelectedDoctor] = useState<"female" | "male" | "team">("female");

  // Form state
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const srcParam = urlParams.get("src");
      if (srcParam === "meta" || srcParam === "website") {
        setSource(srcParam);
      }
      const docParam = urlParams.get("doc");
      if (docParam === "male" || docParam === "female" || docParam === "team") {
        setSelectedDoctor(docParam);
      }
    }
  }, []);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.screen && parsed.screen !== "hook") {
          setScreen(parsed.screen);
        } else {
          setScreen(initialScreen);
        }
        if (parsed.chosenDoubts) setChosenDoubts(parsed.chosenDoubts);
        if (parsed.currentCardIndex !== undefined) setCurrentCardIndex(parsed.currentCardIndex);
        if (parsed.userAnswers) setUserAnswers(parsed.userAnswers);
        if (parsed.score !== undefined) setScore(parsed.score);
        if (parsed.streak !== undefined) setStreak(parsed.streak);
        if (parsed.mythsMissed) setMythsMissed(parsed.mythsMissed);
      } else {
        setScreen(initialScreen);
      }
    } catch {
      // ignore
    }
  }, [initialScreen]);

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
    if (userAnswers[currentCard.id]) return;

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

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Submission failed");
      }

      sound.playCelebration();
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      track("lead_submitted", { score, chosenDoubts });
      setScreen("thankyou");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please check your connection.";
      setFormErrors({ general: msg });
      sound.playIncorrect();
    } finally {
      setIsSubmitting(false);
    }
  };

  const getScoreRank = () => {
    if (score >= 5) {
      return {
        badge: "METABOLIC STRATEGIST",
        title: "High Clinical Awareness",
        desc: "You understand how insulin, GLP-1 hormones, and DEXA metrics control hunger."
      };
    }
    if (score >= 3) {
      return {
        badge: "DIET CULTURE SCEPTIC",
        title: "Solid Understanding",
        desc: "You see past generic willpower advice, but still carry subtle dietary myths."
      };
    }
    return {
      badge: "METABOLIC EXPLORER",
      title: "Surprising Biological Realities",
      desc: "Modern endocrinology challenges everything we were taught about counting calories."
    };
  };

  const rank = getScoreRank();

  const getDoubtIcon = (id: string, isSelected: boolean) => {
    const cls = isSelected ? "w-5 h-5 text-[#0D1612]" : "w-5 h-5 text-[#D4AF37]";
    switch (id) {
      case "safety":
        return <GameIconShield className={cls} />;
      case "muscle":
        return <GameIconBicep className={cls} />;
      case "regain":
        return <GameIconRefresh className={cls} />;
      case "diabetics":
        return <GameIconMicroscope className={cls} />;
      case "fit":
      default:
        return <GameIconTarget className={cls} />;
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0D1612] text-[#F7F5F0]">
      {/* Top Universal Website Header */}
      <header className="w-full bg-[#143026]/90 backdrop-blur-md border-b border-[#D4AF37]/25 sticky top-0 z-40">
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="font-serif italic text-2xl font-bold tracking-tight text-white hover:text-[#D4AF37] transition-colors">
              Steer<span className="text-[#D4AF37] not-italic">.</span>
            </a>
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/10">
              <span className="text-xs font-semibold text-[#F7F5F0] tracking-wide">
                The 4:00 PM Hunger Game
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                Doctor-Led Care
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex text-xs text-[#F7F5F0]/60 font-medium">
              Precision Metabolic Assessment
            </span>
            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundMuted ? "Unmute audio effects" : "Mute audio effects"}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0D1612] border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs font-semibold transition-all focus:outline-none focus:ring-1 focus:ring-[#D4AF37] cursor-pointer"
            >
              {soundMuted ? (
                <>
                  <svg className="w-3.5 h-3.5 text-[#D4AF37]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                  <span className="hidden sm:inline">Audio Off</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  <span className="hidden sm:inline">Audio On</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area: Zero unnecessary scrolling on desktop */}
      <main className="flex-1 w-full flex flex-col justify-center px-4 sm:px-8 py-3 sm:py-5 max-w-7xl mx-auto overflow-hidden">
        <AnimatePresence mode="wait">
          {/* 1. HOOK SCREEN */}
          {screen === "hook" && (
            <motion.div
              key="screen-hook"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <SteerBadge text="DOCTOR-LED METABOLIC SCIENCE" />

                <div className="w-full my-4">
                  <GameCompanion
                    doctor={selectedDoctor}
                    emotion="idle"
                    message="Welcome to Steer! I'm reviewing your metabolic biomarkers. Let's decode the science behind 4:00 PM cravings."
                    size="md"
                  />
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-tight">
                  Why does hunger hit hard at{" "}
                  <span className="italic text-[#D4AF37]">
                    4:00 PM
                  </span>
                  , even after a full thali?
                </h1>

                <p className="mt-4 text-base sm:text-lg text-[#F7F5F0]/75 leading-relaxed max-w-xl font-light">
                  {GAME_CONTENT.hook.subhead}
                </p>

                <div className="mt-5 p-4 bg-[#143026] rounded-2xl border border-[#D4AF37]/25 flex items-center gap-4 text-left w-full max-w-xl shadow-lg">
                  <IndianThaliIllustration className="w-14 h-14 flex-shrink-0" />
                  <div className="text-xs sm:text-sm text-[#F7F5F0]/75">
                    <strong className="text-[#D4AF37] font-semibold block text-sm">The 4:00 PM Post-Thali Crash</strong>
                    Dal, 2 rotis & curd at 1:30 PM... yet by 4:00 PM your brain demands chai and namkeen. It is biology, not weak willpower.
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                  <button
                    type="button"
                    onClick={handleStartGame}
                    className="w-full sm:w-auto flex-1 py-4 px-8 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C58A38] text-[#0D1612] font-bold text-base hover:brightness-110 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <span>{GAME_CONTENT.hook.ctaButton}</span>
                    <span className="text-lg">→</span>
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-3 text-xs text-[#F7F5F0]/60">
                  <span>6 interactive cards</span>
                  <span>•</span>
                  <span>60 seconds</span>
                  <span>•</span>
                  <span>Instant clinical readout</span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center justify-center bg-gradient-to-br from-[#143026] to-[#0D1612] rounded-3xl p-8 border border-[#D4AF37]/30 shadow-2xl">
                <div className="relative flex items-center justify-center mb-6">
                  <Clock4PMRadial className="w-44 h-44 sm:w-52 sm:h-52" />
                  <div className="absolute -bottom-3 bg-[#0D1612] px-4 py-1.5 rounded-full shadow-lg border border-[#D4AF37]/40 text-xs font-bold text-[#D4AF37] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                    <span>The 4:00 PM Glucagon Spike</span>
                  </div>
                </div>

                <div className="w-full bg-[#143026] rounded-2xl p-5 border border-[#D4AF37]/20 text-center">
                  <h3 className="font-serif text-lg font-bold text-white">
                    Test Your Metabolic IQ
                  </h3>
                  <p className="text-xs text-[#F7F5F0]/70 mt-1.5 leading-relaxed font-light">
                    Swipe or tap 6 quick cards to debunk old diet culture and see where your body stands.
                  </p>
                </div>
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
              className="w-full flex-1 max-w-4xl mx-auto flex flex-col justify-between py-2"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase bg-[#143026] px-3.5 py-1 rounded-full border border-[#D4AF37]/30">
                    Step 1 • Doubt Configuration
                  </span>
                  <span className="text-sm font-bold text-[#D4AF37]">
                    {chosenDoubts.length}/2 Selected
                  </span>
                </div>

                <div className="mb-4">
                  <GameCompanion
                    doctor={selectedDoctor}
                    emotion={chosenDoubts.length === 2 ? "celebrate" : "thinking"}
                    message={
                      chosenDoubts.length === 2
                        ? "Great selections! I've loaded your doubts into our clinical model."
                        : "Pick 1 or 2 areas of skepticism regarding metabolic health. We'll tailor your clinical readout!"
                    }
                    size="sm"
                  />
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white leading-snug">
                  What is your biggest question about modern metabolic science?
                </h2>
                <p className="text-sm text-[#F7F5F0]/70 mt-1 font-light">
                  Select up to 2 areas you are most skeptical or curious about.
                </p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {GAME_CONTENT.doubts.map((doubt) => {
                    const isSelected = chosenDoubts.includes(doubt.id);
                    const isMaxReached = chosenDoubts.length >= 2 && !isSelected;

                    return (
                      <button
                        key={doubt.id}
                        type="button"
                        onClick={() => handleToggleDoubt(doubt.id)}
                        disabled={isMaxReached}
                        className={`p-4 rounded-2xl text-left border transition-all flex items-center justify-between active:scale-[0.98] ${
                          isSelected
                            ? "bg-gradient-to-r from-[#D4AF37] to-[#C58A38] text-[#0D1612] border-[#D4AF37] shadow-xl ring-2 ring-[#D4AF37]/50"
                            : isMaxReached
                            ? "bg-[#143026]/40 text-white/30 border-white/5 opacity-50 cursor-not-allowed"
                            : "bg-[#143026] text-white border-[#D4AF37]/25 hover:border-[#D4AF37]/60 shadow-md hover:shadow-lg"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-[#0D1612] text-[#D4AF37]"
                                : "bg-[#0D1612] text-[#D4AF37] border border-[#D4AF37]/30"
                            }`}
                          >
                            {getDoubtIcon(doubt.id, isSelected)}
                          </div>
                          <div>
                            <div className="text-sm sm:text-base font-semibold leading-tight">
                              {doubt.label}
                            </div>
                            <span
                              className={`text-xs tracking-wide ${
                                isSelected ? "text-[#0D1612]/80 font-medium" : "text-[#D4AF37]"
                              }`}
                            >
                              {doubt.tag}
                            </span>
                          </div>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                            isSelected
                              ? "bg-[#0D1612] border-[#0D1612] text-[#D4AF37]"
                              : "border-[#D4AF37]/40"
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

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="/"
                  className="text-xs sm:text-sm text-[#F7F5F0]/60 font-semibold hover:text-[#D4AF37] transition-colors order-2 sm:order-1 cursor-pointer"
                >
                  ← Return to Club Overview
                </a>

                <button
                  type="button"
                  onClick={handleStartQuiz}
                  disabled={chosenDoubts.length === 0}
                  className={`w-full sm:w-auto py-3.5 px-8 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 order-1 sm:order-2 ${
                    chosenDoubts.length > 0
                      ? "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C58A38] text-[#0D1612] hover:brightness-110 active:scale-95 shadow-xl cursor-pointer"
                      : "bg-white/10 text-white/40 cursor-not-allowed border border-white/5"
                  }`}
                >
                  <span>Begin 4pm Assessment</span>
                  <span className="text-base font-bold">→</span>
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
              className="w-full flex-1 flex flex-col justify-between py-1"
            >
              <QuizProgressBar
                total={GAME_CONTENT.cards.length}
                current={currentCardIndex}
                onBack={handleBack}
              />

              <div className="w-full flex-1 flex flex-col justify-center py-1">
                <QuizCardView
                  card={GAME_CONTENT.cards[currentCardIndex]}
                  cardIndex={currentCardIndex}
                  totalCards={GAME_CONTENT.cards.length}
                  selectedAnswer={userAnswers[GAME_CONTENT.cards[currentCardIndex].id] || null}
                  onAnswer={handleAnswerCard}
                  onNext={handleNextCard}
                  streak={streak}
                  doctor={selectedDoctor}
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
              className="w-full max-w-5xl mx-auto flex flex-col gap-5 py-2"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <SteerBadge text="PERSONALIZED METABOLIC READOUT" />
                <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/15 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  {rank.badge}
                </span>
              </div>

              <GameCompanion
                doctor={selectedDoctor}
                emotion={score >= 4 ? "celebrate" : "encourage"}
                message={
                  score === 6
                    ? "Incredible scientific precision! You understand true hormonal appetite regulation."
                    : score >= 4
                    ? "Well done! You see straight through popular crash-diet myths."
                    : "You've uncovered essential metabolic facts that make sustainable weight management possible."
                }
                size="md"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-6 bg-[#143026] rounded-3xl border border-[#D4AF37]/30 flex items-center justify-between gap-4 shadow-xl"
                  >
                    <div>
                      <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
                        Metabolic Status
                      </div>
                      <h2 className="font-serif text-2xl font-bold text-white mt-1">
                        {rank.title}
                      </h2>
                      <p className="text-xs text-[#F7F5F0]/70 mt-1.5 leading-snug font-light">
                        {rank.desc}
                      </p>
                    </div>

                    <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-white/10"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <motion.path
                          className="text-[#D4AF37]"
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
                        <span className="text-base font-bold text-white">{score}/6</span>
                      </div>
                    </div>
                  </motion.div>

                  <div className="p-5 bg-[#143026] rounded-3xl border border-[#D4AF37]/25 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white">
                        DEXA Protocol: Muscle Protection
                      </span>
                      <span className="text-xs text-[#D4AF37] font-semibold">
                        Steer Standard
                      </span>
                    </div>
                    <p className="text-xs text-[#F7F5F0]/70 leading-relaxed mb-3 font-light">
                      {GAME_CONTENT.readoutStep.dexaConceptDesc}
                    </p>
                    <MuscleFatSplitIllustration className="w-full h-16" />
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col gap-3.5">
                  <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    Targeted Insights for Your Doubts
                  </div>

                  {chosenDoubts.map((doubtId) => {
                    const doubtObj = GAME_CONTENT.doubts.find((d) => d.id === doubtId);
                    if (!doubtObj) return null;
                    return (
                      <div
                        key={doubtObj.id}
                        className="p-4 bg-[#143026] rounded-2xl border-l-4 border-[#D4AF37] border-y border-r border-[#D4AF37]/20 shadow-md"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-[#D4AF37]">
                          {getDoubtIcon(doubtObj.id, false)}
                          <span>{doubtObj.readoutTitle}</span>
                        </div>
                        <p className="text-xs text-[#F7F5F0]/80 mt-1 leading-relaxed font-light">
                          {doubtObj.readoutTip}
                        </p>
                      </div>
                    );
                  })}

                  <div className="p-4 bg-[#143026] rounded-2xl border border-[#D4AF37]/30 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <IndianThaliIllustration className="w-9 h-9 flex-shrink-0" />
                      <h3 className="font-serif text-sm font-bold text-[#D4AF37]">
                        {GAME_CONTENT.readoutStep.indianDietTipTitle}
                      </h3>
                    </div>
                    <p className="text-xs text-[#F7F5F0]/80 leading-relaxed font-light">
                      {GAME_CONTENT.readoutStep.indianDietTip}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-2 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-xs sm:text-sm text-[#F7F5F0]/60 font-semibold hover:text-[#D4AF37] transition-colors order-2 sm:order-1 cursor-pointer"
                >
                  ← Review Questions
                </button>

                <button
                  type="button"
                  onClick={handleGoToLead}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C58A38] text-[#0D1612] font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 order-1 sm:order-2 cursor-pointer"
                >
                  <span>{GAME_CONTENT.readoutStep.ctaButton}</span>
                  <span className="text-base font-bold">→</span>
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
              className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-2"
            >
              <div className="lg:col-span-6 flex flex-col">
                <SteerBadge text="DOCTOR-LED FIT ASSESSMENT" />

                <div className="my-3">
                  <GameCompanion
                    doctor={selectedDoctor}
                    emotion="victory"
                    message="You've mastered the quiz! Let's connect you with our clinical board to evaluate whether our protocol fits your metabolic profile."
                    size="md"
                  />
                </div>

                <h2 className="font-serif text-3xl font-normal text-white leading-snug">
                  See if the Steer Programme Fits You
                </h2>
                <p className="text-xs sm:text-sm text-[#F7F5F0]/70 mt-1.5 leading-relaxed font-light">
                  A Steer physician reviews your metabolic scorecard and explains how blood tests, DEXA body scans, and physician oversight integrate.
                </p>

                <div className="mt-4 p-4 bg-[#143026] rounded-2xl border border-[#D4AF37]/25 flex flex-col gap-2">
                  {GAME_CONTENT.leadStep.doctorGuarantee.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#F7F5F0]/80">
                      <span className="text-[#D4AF37] font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#143026] p-6 sm:p-7 rounded-3xl border border-[#D4AF37]/35 shadow-2xl">
                <form onSubmit={handleLeadSubmit} className="flex flex-col gap-3.5">
                  {formErrors.general && (
                    <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-200 text-xs rounded-xl">
                      {formErrors.general}
                    </div>
                  )}

                  <div>
                    <label htmlFor="lead-name" className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
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
                      className={`w-full px-4 py-3 rounded-xl bg-[#0D1612] border text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 transition-all ${
                        formErrors.name
                          ? "border-red-400 focus:ring-red-400"
                          : "border-[#D4AF37]/30 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-xs text-red-400 mt-1 font-medium">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lead-phone" className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                      WhatsApp / Mobile Number
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-sm font-semibold text-[#D4AF37]">
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
                        className={`w-full pl-13 pr-4 py-3 rounded-xl bg-[#0D1612] border text-sm text-white font-medium tracking-wide placeholder-white/30 focus:outline-none focus:ring-1 transition-all ${
                          formErrors.phone
                            ? "border-red-400 focus:ring-red-400"
                            : "border-[#D4AF37]/30 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-xs text-red-400 mt-1 font-medium">{formErrors.phone}</p>
                    )}
                  </div>

                  <p className="text-[11px] text-[#F7F5F0]/60 leading-relaxed font-light">
                    <span className="font-semibold text-[#D4AF37]">Clinical Privacy Guarantee:</span> Steer maintains strict medical confidentiality. Direct clinical conversations only. Zero spam.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C58A38] text-[#0D1612] font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-[#0D1612]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Connecting with Steer Doctors...
                      </span>
                    ) : (
                      <>
                        <span>{GAME_CONTENT.leadStep.submitButton}</span>
                        <span className="text-base font-bold">→</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-xs text-[#F7F5F0]/60 font-medium hover:text-[#D4AF37] transition-colors"
                  >
                    ← Back to Scorecard
                  </button>
                  <p className="text-[10px] text-[#F7F5F0]/40 text-right">
                    *Doctor review mandatory prior to prescription.
                  </p>
                </div>
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
              className="w-full max-w-2xl mx-auto py-6 text-center flex flex-col items-center justify-center"
            >
              <GameCompanion
                doctor={selectedDoctor}
                emotion="victory"
                message="Outstanding! Your quiz responses have reached our clinical faculty."
                size="lg"
              />

              <div className="mt-4">
                <SteerBadge text="ASSESSMENT CONFIRMED" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-white mt-3">
                {GAME_CONTENT.thankyouStep.title}
              </h2>

              <p className="text-sm sm:text-base text-[#F7F5F0]/75 mt-2 leading-relaxed max-w-md font-light">
                {GAME_CONTENT.thankyouStep.subtitle}
              </p>

              <div className="mt-5 p-5 bg-[#143026] rounded-2xl border border-[#D4AF37]/30 text-left max-w-md w-full shadow-xl">
                <div className="flex items-center gap-2 text-sm font-bold text-[#D4AF37] mb-1.5">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>What to Expect Next</span>
                </div>
                <p className="text-xs text-[#F7F5F0]/80 leading-relaxed font-light">
                  {GAME_CONTENT.thankyouStep.whatsAppNotice}
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 w-full max-w-xs">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="w-full py-3 px-6 rounded-full bg-[#143026] border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-xs hover:bg-[#D4AF37]/10 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  Play Quiz Again
                </button>
              </div>

              <p className="text-[11px] text-[#F7F5F0]/50 mt-5">
                Steer Metabolic Health Club • Doctor-Led Care
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
