import React from "react";
import Link from "next/link";
import { GameCompanion } from "@/components/GameCompanion";
import {
  Clock4PMRadial,
  IndianThaliIllustration,
  MuscleFatSplitIllustration,
  StomachBrainSignaling
} from "@/components/Illustrations";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-[#f5f1e4] text-[#2c2e2a] flex flex-col selection:bg-[#8ed462]/30">
      {/* MindMarket Style Floating Pill Navigation Bar */}
      <div className="w-full pt-4 sm:pt-6 px-4 sm:px-8 max-w-[1200px] mx-auto z-40">
        <header className="w-full bg-[#ffffff] rounded-[50px] px-5 sm:px-7 py-3 flex items-center justify-between border border-[#e0dbce]">
          {/* Brand Logo Container */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-[12px] bg-[#8ed462] flex items-center justify-center font-bold text-lg text-[#2c2e2a]">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base sm:text-lg tracking-tight text-[#2c2e2a]">
                Steer<span className="text-[#8ed462]">.</span>
              </span>
              <span className="text-[10px] text-[#80827f] font-medium -mt-1 hidden sm:inline">
                Metabolic Health Club
              </span>
            </div>
          </Link>

          {/* Navigation items */}
          <nav className="hidden md:flex items-center gap-1 text-[15px] font-medium text-[#2c2e2a]">
            <a href="#science" className="px-4 py-2 rounded-[50px] hover:bg-[#f5f1e4] transition-colors">
              The Science
            </a>
            <a href="#4pm-phenomenon" className="px-4 py-2 rounded-[50px] hover:bg-[#f5f1e4] transition-colors">
              4pm Biology
            </a>
            <a href="#how-it-works" className="px-4 py-2 rounded-[50px] hover:bg-[#f5f1e4] transition-colors">
              Doctor Care
            </a>
          </nav>

          {/* Right Action: Menu & Play CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/play"
              className="bg-[#f5f1e4] hover:bg-[#e0dbce] text-[#2c2e2a] text-[15px] font-medium px-5 sm:px-6 py-2.5 rounded-[50px] transition-all flex items-center gap-2 border border-[#e0dbce]"
            >
              <span>Play 4pm Game</span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#8ed462]" />
            </Link>

            <Link
              href="/play"
              className="hidden sm:flex bg-[#ff705d] hover:bg-[#e85b48] text-white text-[15px] font-medium px-5 py-2.5 rounded-[50px] transition-all items-center gap-2"
            >
              <span>Clinical Quiz</span>
              <div className="w-2 h-2 rounded-full bg-white" />
            </Link>
          </div>
        </header>
      </div>

      {/* Hero Display Block: MindMarket Massive Inter Headline on Cream Paper */}
      <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-16 flex flex-col items-start">

        {/* Oversized Inter Headline */}
        <h1 className="text-[#2c2e2a] text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-medium tracking-[-0.05em] leading-[0.98] max-w-5xl">
          Why hunger hits hard at 4pm, even after a full thali.
        </h1>

        {/* Subhead & Companion */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <p className="text-[#80827f] text-lg sm:text-xl font-normal leading-relaxed max-w-xl">
              Most Indian adults blame weak willpower for office afternoon cravings. Real metabolic biology reveals gut hormones, insulin dips, and body composition.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/play"
                className="bg-[#2c2e2a] hover:bg-[#1a1c18] text-[#ffffff] text-lg font-medium px-8 py-4 rounded-[50px] transition-all flex items-center justify-center gap-3 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Enter The 4pm Game</span>
                <div className="w-3 h-3 rounded-full bg-[#8ed462]" />
              </Link>

              <span className="text-[#80827f] text-sm self-center">
                60 seconds • 6 interactive cards • Instant doctor readout
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-[#ffffff] rounded-[50px] p-6 border border-[#e0dbce] flex flex-col gap-4">
              <GameCompanion
                emotion="idle"
                message="Hi! I'm Dr. Steer. Step inside our interactive game to test your metabolic intuition!"
                size="md"
              />
              <div className="text-xs text-[#80827f] pt-2 border-t border-[#f5f1e4]">
                Steer guides members through blood tests, gut microbiome analysis, and DEXA scans.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MindMarket Illustration Hero Panel: Paper-cut Character Art directly on Cream */}
      <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-10" id="4pm-phenomenon">
        <div className="bg-[#ffffff] rounded-[50px] p-8 sm:p-14 border border-[#e0dbce] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8ed462] uppercase tracking-wider">
              <span>Hormonal Axis</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#2c2e2a] leading-tight">
              A full Indian lunch doesn’t protect you from the 4pm drop.
            </h2>
            <p className="text-[#80827f] text-base leading-relaxed">
              Dal, 2 rotis, sabzi, curd... by 1:30pm you feel satisfied. But carbohydrate-driven glycemic spikes cause an insulin rebound. By 4pm, GLP-1 satiety signals diminish and ghrelin urges your brain toward tea and snacks.
            </p>
            <div className="pt-2">
              <Link
                href="/play"
                className="inline-flex items-center gap-2 text-[#2c2e2a] text-sm font-semibold border-b border-[#2c2e2a] pb-1 hover:text-[#8ed462] hover:border-[#8ed462] transition-colors"
              >
                <span>Play the 6-question quiz to test your habits</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex items-center justify-center gap-6 flex-wrap sm:flex-nowrap">
            <div className="flex flex-col items-center p-6 bg-[#f5f1e4] rounded-[50px] border border-[#e0dbce]">
              <Clock4PMRadial className="w-36 h-36" />
              <span className="text-xs font-bold text-[#2c2e2a] mt-3">4:00 PM Glucagon Spike</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-[#f5f1e4] rounded-[50px] border border-[#e0dbce]">
              <IndianThaliIllustration className="w-36 h-36" />
              <span className="text-xs font-bold text-[#2c2e2a] mt-3">Post-Thali Rebound</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Storybook Content Cards (MindMarket 50px rounded cards) */}
      <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-12" id="science">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#2c2e2a]">
            Doctor-led diagnostic care for lasting results.
          </h2>
          <p className="text-[#80827f] text-base mt-2">
            Steer is not a generic diet plan or a pill dispensary. We measure biochemistry first.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#ffffff] rounded-[50px] p-8 border border-[#e0dbce] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-[20px] bg-[#f5f1e4] flex items-center justify-center text-[#2c2e2a] mb-6">
                <StomachBrainSignaling className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-medium text-[#2c2e2a] tracking-tight">
                Gut & GLP-1 Biology
              </h3>
              <p className="text-[#80827f] text-sm leading-relaxed mt-3">
                Appetite is regulated by gut peptides and brain neurotransmitters. When clinically indicated, doctors guide therapy alongside gut microbiome testing.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#f5f1e4]">
              <span className="text-xs font-medium text-[#80827f]">Clinical review first</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#ffffff] rounded-[50px] p-8 border border-[#e0dbce] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-[20px] bg-[#f5f1e4] flex items-center justify-center text-[#2c2e2a] mb-6">
                <MuscleFatSplitIllustration className="w-12 h-6" />
              </div>
              <h3 className="text-2xl font-medium text-[#2c2e2a] tracking-tight">
                DEXA Muscle Protection
              </h3>
              <p className="text-[#80827f] text-sm leading-relaxed mt-3">
                South Asians naturally store more visceral fat. Steer tracks lean muscle with gold-standard DEXA scans so weight dropped is pure visceral fat.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#f5f1e4]">
              <span className="text-xs font-medium text-[#80827f]">Skeletal mass preserved</span>
            </div>
          </div>

          {/* Card 3 (Action Service Card with Coral Pop Button) */}
          <div className="bg-[#ffffff] rounded-[50px] p-8 border border-[#e0dbce] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-[20px] bg-[#8ed462]/20 flex items-center justify-center text-[#2c2e2a] font-bold text-lg mb-6">
                🎯
              </div>
              <h3 className="text-2xl font-medium text-[#2c2e2a] tracking-tight">
                Play The 4pm Game
              </h3>
              <p className="text-[#80827f] text-sm leading-relaxed mt-3">
                Six Myth or Fact cards that tackle safety, rebound, muscle retention, and Indian meal pacing in 60 seconds.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/play"
                className="w-full bg-[#ff705d] hover:bg-[#e85b48] text-white text-[15px] font-medium py-3 px-6 rounded-[50px] transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Quiz Game</span>
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MindMarket Sunshine Pop Closing Footer Band */}
      <footer className="w-full mt-auto bg-[#f5e211] text-[#2c2e2a] py-12 px-4 sm:px-8 border-t border-[#2c2e2a]">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col text-center sm:text-left">
            <span className="font-semibold text-xl tracking-tight">
              Steer Metabolic Health Club
            </span>
            <span className="text-xs text-[#2c2e2a]/80 mt-1 max-w-md">
              Doctor-led care • Blood diagnostics • DEXA composition tracking • Habit coaching. Educational experience only.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/play"
              className="bg-[#2c2e2a] text-white text-sm font-medium px-6 py-3 rounded-[50px] hover:bg-[#1a1c18] transition-all"
            >
              Start 4pm Game →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
