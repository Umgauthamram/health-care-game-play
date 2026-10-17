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
  isEmbedded?: boolean;
}

const STORAGE_KEY = "steer_hunger_game_v1";

export function GameEngine({ initialSource = "website", isEmbedded = false }: GameEngineProps) {
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const srcParam = urlParams.get("src");
      if (srcParam === "meta" || srcParam === "website") {
        setSource(srcParam);
      }
    }
  }, []);

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
      // ignore
    }
  }, []);

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

      const data = await res.json();

      if (res.ok && data.success) {
        track("lead_submitted", { source, score });
        sound.playCorrect();

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#153A2D", "#E27D30", "#2E6B48", "#F0A638"]
          });
        } catch {
          // ignore
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

  const getRankData = (currentScore: number) => {
    if (currentScore === 6) {
      return {
        title: "Metabolic Scholar",
        badge: "6/6 Perfect Science",
        desc: "You have an exceptional grasp of metabolic physiology and how hormones steer cravings."
      };
    }
    if (currentScore >= 4) {
      return {
        title: "Metabolically Savvy",
        badge: "High Clinical Awareness",
        desc: "You see right through common diet culture myths and recognise real biological signals."
      };
    }
    return {
      title: "Metabolic Explorer",
      badge: "Curious & Ready to Learn",
      desc: "Like 90% of people, you were taught old willpower rules. Real metabolic science changes everything."
    };
  };

  const rank = getRankData(score);

  const getDoubtIcon = (id: string, isSelected: boolean) => {
    const cls = isSelected ? "w-5 h-5 text-white" : "w-5 h-5 text-[#153A2D]";
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
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Top Universal Website Header */}
      <header className="w-full bg-white border-b border-[#E8DED1] sticky top-0 z-40">
        <div className="w-full px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#153A2D]">
              Steer<span className="text-[#E27D30]">.</span>
            </span>
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-[#E8DED1]">
              <span className="text-xs font-semibold text-[#153A2D] tracking-wide">
                The 4pm Hunger Game
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#5A6560] bg-[#F4ECE1] px-2.5 py-0.5 rounded-full">
                Metabolic Health Club
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex text-xs text-[#5A6560] font-medium">
              Doctor-Led Assessment
            </span>
            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundMuted ? "Unmute audio effects" : "Mute audio effects"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4ECE1] text-[#153A2D] hover:bg-[#EADECF] text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#153A2D]"
            >
              {soundMuted ? (
                <>
                  <svg className="w-4 h-4 text-[#5A6560]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                  <span className="hidden sm:inline">Sound Off</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-[#153A2D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  <span className="hidden sm:inline">Sound On</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Content Area without contrasting outer boxes */}
      <main className="flex-1 w-full flex flex-col justify-start px-4 sm:px-8 py-4 sm:py-6">
        <AnimatePresence mode="wait">
          {/* 1. HOOK SCREEN (FULL BLEED HERO) */}
          {screen === "hook" && (
            <motion.div
              key="screen-hook"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              {/* Left Column */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <SteerBadge text="DOCTOR-LED METABOLIC SCIENCE" />

                <div className="w-full my-4">
                  <GameCompanion
                    emotion="idle"
                    message="Welcome! I'm Dr. Steer. Wonder why your appetite spikes right at 4pm? Let's decode the hormonal science together!"
                    size="md"
                  />
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2220] leading-tight">
                  Why does hunger hit hard at{" "}
                  <span className="text-[#E27D30] underline decoration-[#E27D30]/40 decoration-wavy">
                    4:00 PM
                  </span>
                  , even after a full thali?
                </h1>

                <p className="mt-4 text-base sm:text-lg text-[#5A6560] leading-relaxed max-w-xl">
                  {GAME_CONTENT.hook.subhead}
                </p>

                <div className="mt-6 p-4 bg-[#FBF8F3] rounded-2xl border border-[#EADECF] flex items-center gap-4 text-left w-full max-w-xl">
                  <IndianThaliIllustration className="w-14 h-14 flex-shrink-0" />
                  <div className="text-sm text-[#5A6560]">
                    <strong className="text-[#153A2D] font-semibold block text-base">The 4pm Post-Thali Crash</strong>
                    Dal, 2 rotis & curd at 1:30pm... yet by 4pm, your brain demands chai and namkeen. It is biology, not weak willpower.
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                  <button
                    type="button"
                    onClick={handleStartGame}
                    className="w-full sm:w-auto flex-1 py-4 px-8 rounded-2xl bg-[#E27D30] text-white font-bold text-lg hover:bg-[#C85E16] active:scale-95 transition-all shadow-lg animate-breathing flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <span>{GAME_CONTENT.hook.ctaButton}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-3 text-xs text-[#5A6560]">
                  <span>6 interactive cards</span>
                  <span>•</span>
                  <span>60 seconds</span>
                  <span>•</span>
                  <span>Instant clinical readout</span>
                </div>

                <p className="text-[11px] text-[#8C9893] mt-3 leading-tight">
                  *Educational game only. Not medical advice. Steer physicians evaluate tests before clinical prescriptions.
                </p>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#FBF8F3] rounded-3xl p-8 border border-[#E8DED1]">
                <div className="relative flex items-center justify-center mb-6">
                  <Clock4PMRadial className="w-48 h-48 sm:w-56 sm:h-56" />
                  <div className="absolute -bottom-3 bg-white px-4 py-1.5 rounded-full shadow-md border border-[#E8DED1] text-sm font-bold text-[#153A2D] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E27D30] animate-ping" />
                    <span>The 4:00 PM Glucagon Spike</span>
                  </div>
                </div>

                <div className="w-full bg-white rounded-2xl p-5 border border-[#E8DED1] shadow-sm text-center">
                  <h3 className="font-serif text-lg font-bold text-[#153A2D]">
                    Test Your Metabolic IQ
                  </h3>
                  <p className="text-xs text-[#5A6560] mt-1.5 leading-relaxed">
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
              className="w-full flex-1 max-w-4xl mx-auto flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#E27D30] tracking-wider uppercase bg-[#F4ECE1] px-3 py-1 rounded-full">
                    Step 1 of 2 • Doubt Configuration
                  </span>
                  <span className="text-sm font-bold text-[#153A2D]">
                    {chosenDoubts.length}/2 Selected
                  </span>
                </div>

                <div className="mb-6">
                  <GameCompanion
                    emotion={chosenDoubts.length === 2 ? "celebrate" : "thinking"}
                    message={
                      chosenDoubts.length === 2
                        ? "Great choices! I've loaded your doubts into the game engine."
                        : "Pick 1 or 2 doubts about modern metabolic care. We'll tailor your clinical readout!"
                    }
                    size="sm"
                  />
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2220] leading-snug">
                  What is your biggest question about modern metabolic science?
                </h2>
                <p className="text-sm text-[#5A6560] mt-2">
                  Select up to 2 areas you are most skeptical or curious about.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            ? "bg-[#153A2D] text-white border-[#153A2D] shadow-md ring-2 ring-[#153A2D]/20"
                            : isMaxReached
                            ? "bg-[#FBF8F3] text-[#9DA8A3] border-[#E8DED1] opacity-60 cursor-not-allowed"
                            : "bg-white text-[#1E2220] border-[#E8DED1] hover:border-[#153A2D]/40 shadow-sm hover:shadow"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-[#F4ECE1] text-[#153A2D]"
                            }`}
                          >
                            {getDoubtIcon(doubt.id, isSelected)}
                          </div>
                          <div>
                            <div className="text-base font-semibold leading-tight">
                              {doubt.label}
                            </div>
                            <span
                              className={`text-xs tracking-wide ${
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

              <div className="mt-8 pt-6 border-t border-[#E8DED1] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-sm text-[#5A6560] font-semibold hover:text-[#153A2D] transition-colors order-2 sm:order-1"
                >
                  ← Back to Hook
                </button>

                <button
                  type="button"
                  onClick={handleStartQuiz}
                  disabled={chosenDoubts.length === 0}
                  className={`w-full sm:w-auto py-4 px-8 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 order-1 sm:order-2 ${
                    chosenDoubts.length > 0
                      ? "bg-[#153A2D] text-white hover:bg-[#205743] active:scale-95 shadow-lg cursor-pointer"
                      : "bg-[#E0D8CE] text-[#8C9893] cursor-not-allowed"
                  }`}
                >
                  <span>Begin the 4pm Quiz</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {/* 3. SIX MYTH OR FACT CARDS (FULL BLEED GAME STAGE) */}
          {screen === "quiz" && (
            <motion.div
              key="screen-quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1 flex flex-col justify-start"
            >
              <QuizProgressBar
                total={GAME_CONTENT.cards.length}
                current={currentCardIndex}
                onBack={handleBack}
              />

              <div className="w-full flex-1 flex flex-col items-center justify-center py-4">
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
              className="w-full max-w-5xl mx-auto flex flex-col gap-6"
            >
              <div className="flex items-center justify-between border-b border-[#E8DED1] pb-4">
                <SteerBadge text="CLINICAL READOUT" />
                <span className="text-sm font-bold text-[#E27D30]">{rank.badge}</span>
              </div>

              <GameCompanion
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
                <div className="lg:col-span-5 flex flex-col gap-5">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-6 bg-[#FBF8F3] rounded-3xl border border-[#E8DED1] flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#5A6560] uppercase tracking-wider">
                        Metabolic Status
                      </div>
                      <h2 className="font-serif text-2xl font-bold text-[#153A2D] mt-1">
                        {rank.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#5A6560] mt-1.5 leading-snug">
                        {rank.desc}
                      </p>
                    </div>

                    <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
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
                        <span className="text-base font-black text-[#153A2D]">{score}/6</span>
                      </div>
                    </div>
                  </motion.div>

                  <div className="p-6 bg-[#FBF8F3] rounded-3xl border border-[#E8DED1]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-[#153A2D]">
                        The DEXA Metric: Muscle vs Fat
                      </span>
                      <span className="text-xs text-[#E27D30] font-semibold">
                        Steer Protocol
                      </span>
                    </div>
                    <p className="text-xs text-[#5A6560] leading-relaxed mb-3">
                      {GAME_CONTENT.readoutStep.dexaConceptDesc}
                    </p>
                    <MuscleFatSplitIllustration className="w-full h-18" />
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="text-xs font-bold text-[#153A2D] uppercase tracking-wider">
                    Targeted Insights for Your Doubts
                  </div>

                  {chosenDoubts.map((doubtId) => {
                    const doubtObj = GAME_CONTENT.doubts.find((d) => d.id === doubtId);
                    if (!doubtObj) return null;
                    return (
                      <div
                        key={doubtObj.id}
                        className="p-5 bg-[#FBF8F3] rounded-2xl border-l-4 border-[#153A2D] border-[#E8DED1]"
                      >
                        <div className="flex items-center gap-2 text-base font-bold text-[#153A2D]">
                          {getDoubtIcon(doubtObj.id, false)}
                          <span>{doubtObj.readoutTitle}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#5A6560] mt-1.5 leading-relaxed">
                          {doubtObj.readoutTip}
                        </p>
                      </div>
                    );
                  })}

                  <div className="p-6 bg-[#F4ECE1] rounded-3xl border border-[#E27D30]/30 flex flex-col gap-2.5">
                    <div className="flex items-center gap-3">
                      <IndianThaliIllustration className="w-10 h-10 flex-shrink-0" />
                      <h3 className="font-serif text-base font-bold text-[#153A2D]">
                        {GAME_CONTENT.readoutStep.indianDietTipTitle}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#1E2220] leading-relaxed">
                      {GAME_CONTENT.readoutStep.indianDietTip}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-6 border-t border-[#E8DED1] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-sm text-[#5A6560] font-semibold hover:text-[#153A2D] transition-colors order-2 sm:order-1"
                >
                  ← Review Questions
                </button>

                <button
                  type="button"
                  onClick={handleGoToLead}
                  className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-[#153A2D] text-white font-bold text-base hover:bg-[#205743] active:scale-95 transition-all shadow-lg shine-sweep flex items-center justify-center gap-2 order-1 sm:order-2 cursor-pointer"
                >
                  <span>{GAME_CONTENT.readoutStep.ctaButton}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
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
              className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 flex flex-col">
                <SteerBadge text="DOCTOR-LED FIT ASSESSMENT" />

                <div className="my-4">
                  <GameCompanion
                    emotion="victory"
                    message="You've mastered the quiz! Let's connect you with a Steer physician to see if our medical roadmap fits your metabolic biology."
                    size="md"
                  />
                </div>

                <h2 className="font-serif text-3xl font-bold text-[#1E2220] leading-snug">
                  See if the Steer Programme Fits You
                </h2>
                <p className="text-sm text-[#5A6560] mt-2 leading-relaxed">
                  A Steer health advisor reviews your metabolic scorecard and explains how blood tests, DEXA scans, and doctor care come together.
                </p>

                <div className="mt-5 p-4 bg-[#FBF8F3] rounded-2xl border border-[#E8DED1] flex flex-col gap-2.5">
                  {GAME_CONTENT.leadStep.doctorGuarantee.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5A6560]">
                      <span className="text-[#153A2D] font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#FBF8F3] p-6 sm:p-8 rounded-3xl border border-[#E8DED1]">
                <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                  {formErrors.general && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                      {formErrors.general}
                    </div>
                  )}

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
                      <p className="text-xs text-red-600 mt-1 font-medium">{formErrors.name}</p>
                    )}
                  </div>

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
                      <p className="text-xs text-red-600 mt-1 font-medium">{formErrors.phone}</p>
                    )}
                  </div>

                  <p className="text-xs text-[#5A6560] leading-relaxed">
                    <span className="font-semibold text-[#153A2D]">Privacy Note (Draft for Review):</span> Steer guarantees strict medical privacy. Direct clinical discussions only. Zero spam.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-1 py-4 px-6 rounded-2xl bg-[#E27D30] text-white font-bold text-base hover:bg-[#C85E16] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#E27D30] disabled:opacity-70 cursor-pointer"
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

                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-xs text-[#5A6560] font-medium hover:text-[#153A2D] transition-colors"
                  >
                    ← Back to Scorecard
                  </button>
                  <p className="text-[10px] text-[#8C9893] text-right">
                    *Educational only. Doctor review mandatory.
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
              className="w-full max-w-2xl mx-auto py-8 text-center flex flex-col items-center justify-center"
            >
              <GameCompanion
                emotion="victory"
                message="Outstanding! Your quiz responses have reached our clinical team."
                size="lg"
              />

              <div className="mt-4">
                <SteerBadge text="ASSESSMENT CONFIRMED" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153A2D] mt-3">
                {GAME_CONTENT.thankyouStep.title}
              </h2>

              <p className="text-base text-[#5A6560] mt-3 leading-relaxed max-w-md">
                {GAME_CONTENT.thankyouStep.subtitle}
              </p>

              <div className="mt-6 p-5 bg-[#FBF8F3] rounded-2xl border border-[#E8DED1] text-left max-w-md w-full shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold text-[#153A2D] mb-1.5">
                  <svg className="w-5 h-5 text-[#153A2D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>What to Expect Next</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5A6560] leading-relaxed">
                  {GAME_CONTENT.thankyouStep.whatsAppNotice}
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full max-w-xs">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="w-full py-3.5 px-6 rounded-2xl bg-white border border-[#E8DED1] text-[#153A2D] font-bold text-sm hover:bg-[#F4ECE1] active:scale-95 transition-all shadow-sm cursor-pointer"
                >
                  Play Quiz Again
                </button>
              </div>

              <p className="text-xs text-[#8C9893] mt-6">
                Steer Metabolic Health Club • Doctor-Led Care
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
