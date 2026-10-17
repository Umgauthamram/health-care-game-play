import React from "react";
import Image from "next/image";
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
            <div className="w-10 h-10 rounded-[14px] bg-[#8ed462] flex items-center justify-center font-bold text-lg text-[#2c2e2a]">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base sm:text-lg tracking-tight text-[#2c2e2a]">
                Steer<span className="text-[#8ed462]">.</span>
              </span>
              <span className="text-[10px] text-[#80827f] font-medium -mt-1 hidden sm:inline">
                Doctor-Led Metabolic Health
              </span>
            </div>
          </Link>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-1 text-[15px] font-medium text-[#2c2e2a]">
            <a href="#clinical-team" className="px-4 py-2 rounded-[50px] hover:bg-[#f5f1e4] transition-colors">
              Our Doctors
            </a>
            <a href="#4pm-phenomenon" className="px-4 py-2 rounded-[50px] hover:bg-[#f5f1e4] transition-colors">
              4pm Biology
            </a>
            <a href="#science" className="px-4 py-2 rounded-[50px] hover:bg-[#f5f1e4] transition-colors">
              Diagnostics
            </a>
          </nav>

          {/* Right Action: Play Game CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/play"
              className="bg-[#2c2e2a] hover:bg-[#1a1c18] text-[#ffffff] text-[15px] font-medium px-6 py-2.5 rounded-[50px] transition-all flex items-center gap-2.5 shadow-sm"
            >
              <span>Play 4pm Game</span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#8ed462]" />
            </Link>
          </div>
        </header>
      </div>

      {/* Hero Display Block: MindMarket Massive Headline + Doctor Character Stage */}
      <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 pt-10 sm:pt-16 pb-14 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[50px] bg-[#ffffff] border border-[#e0dbce] text-xs font-semibold text-[#2c2e2a] mb-5">
              <span className="w-2 h-2 rounded-full bg-[#8ed462] animate-pulse" />
              Doctor-Led Clinical Quiz Game
            </div>

            <h1 className="text-[#2c2e2a] text-4xl sm:text-6xl md:text-7xl lg:text-[82px] font-medium tracking-[-0.05em] leading-[0.98]">
              Why hunger hits hard at 4pm, even after a full thali.
            </h1>

            <p className="mt-5 text-[#80827f] text-base sm:text-xl font-normal leading-relaxed max-w-xl">
              Most Indian adults blame weak willpower for office afternoon cravings. Real metabolic biology reveals gut hormones, insulin dips, and body composition.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
              <Link
                href="/play"
                className="bg-[#ff705d] hover:bg-[#e85b48] text-[#ffffff] text-lg font-medium px-8 py-4 rounded-[50px] transition-all flex items-center justify-center gap-3 shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Choose Your Doctor & Play</span>
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              </Link>

              <span className="text-[#80827f] text-xs sm:text-sm self-center">
                60s interactive game • 6 cards • Real doctor feedback
              </span>
            </div>
          </div>

          {/* Right Hero Stage: Real Doctor Illustration Banner */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full bg-[#ffffff] rounded-[50px] p-6 sm:p-8 border border-[#e0dbce] shadow-sm flex flex-col items-center">
              <div className="relative w-48 sm:w-56 h-72 sm:h-80 drop-shadow-md">
                <Image
                  src="/images/female doctor.jpg"
                  alt="Dr. Meera • Steer Health Guide"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Dynamic Game Callout */}
              <div className="w-full mt-4 bg-[#f5f1e4] p-4 rounded-[28px] border border-[#e0dbce]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#2c2e2a]">Dr. Meera • Lead Physician</span>
                  <span className="text-[10px] bg-[#8ed462] text-[#2c2e2a] px-2 py-0.5 rounded-full font-bold">READY</span>
                </div>
                <p className="text-xs text-[#80827f] leading-snug">
                  &ldquo;I’ll guide you through 6 real metabolic cards to see if GLP-1 and our clinical roadmap fit your routine.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Select Your Clinical Guide Section */}
      <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-10" id="clinical-team">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-[#8ed462] uppercase tracking-wider">Meet The Game Guides</span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#2c2e2a] mt-1">
              Choose your doctor mentor
            </h2>
          </div>
          <p className="text-sm text-[#80827f] max-w-md">
            Pick who guides your quiz session. Each doctor provides real-time reactions and commentary as you swipe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Guide 1: Female Doctor */}
          <div className="bg-[#ffffff] rounded-[50px] p-6 border border-[#e0dbce] flex flex-col items-center text-center justify-between hover:border-[#8ed462] transition-all group">
            <div className="relative w-36 h-52 my-2">
              <Image
                src="/images/female doctor.jpg"
                alt="Dr. Meera"
                fill
                className="object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="w-full pt-4 border-t border-[#f5f1e4]">
              <h3 className="text-xl font-medium text-[#2c2e2a]">Dr. Meera</h3>
              <p className="text-xs text-[#80827f] mt-0.5">Metabolic Physiology & Satiety Pacing</p>
              <Link
                href="/play?doc=female"
                className="w-full mt-4 bg-[#f5f1e4] group-hover:bg-[#8ed462] text-[#2c2e2a] text-xs font-semibold py-3 px-4 rounded-[50px] transition-all flex items-center justify-center gap-1.5"
              >
                <span>Select Dr. Meera</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Guide 2: Male Doctor */}
          <div className="bg-[#ffffff] rounded-[50px] p-6 border border-[#e0dbce] flex flex-col items-center text-center justify-between hover:border-[#8ed462] transition-all group">
            <div className="relative w-36 h-52 my-2">
              <Image
                src="/images/male doctor.jpg"
                alt="Dr. Aryan"
                fill
                className="object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="w-full pt-4 border-t border-[#f5f1e4]">
              <h3 className="text-xl font-medium text-[#2c2e2a]">Dr. Aryan</h3>
              <p className="text-xs text-[#80827f] mt-0.5">DEXA Scanning & Muscle Preservation</p>
              <Link
                href="/play?doc=male"
                className="w-full mt-4 bg-[#f5f1e4] group-hover:bg-[#8ed462] text-[#2c2e2a] text-xs font-semibold py-3 px-4 rounded-[50px] transition-all flex items-center justify-center gap-1.5"
              >
                <span>Select Dr. Aryan</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Guide 3: Both Male and Female Clinical Board */}
          <div className="bg-[#ffffff] rounded-[50px] p-6 border border-[#e0dbce] flex flex-col items-center text-center justify-between hover:border-[#8ed462] transition-all group">
            <div className="relative w-44 h-52 my-2">
              <Image
                src="/images/both male and female doctor.jpg"
                alt="Steer Clinical Board"
                fill
                className="object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="w-full pt-4 border-t border-[#f5f1e4]">
              <h3 className="text-xl font-medium text-[#2c2e2a]">Clinical Review Board</h3>
              <p className="text-xs text-[#80827f] mt-0.5">Endocrinology & Nutrition Synergy</p>
              <Link
                href="/play?doc=team"
                className="w-full mt-4 bg-[#f5f1e4] group-hover:bg-[#8ed462] text-[#2c2e2a] text-xs font-semibold py-3 px-4 rounded-[50px] transition-all flex items-center justify-center gap-1.5"
              >
                <span>Select Clinical Board</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4pm Phenomenon: MindMarket Content Panel */}
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

      {/* 3 Storybook Content Cards */}
      <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-10" id="science">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#2c2e2a]">
            Doctor-led diagnostic care for lasting results.
          </h2>
          <p className="text-[#80827f] text-base mt-2">
            Steer is not a generic diet plan or a pill dispensary. We measure biochemistry first.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          <div className="bg-[#ffffff] rounded-[50px] p-8 border border-[#e0dbce] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-[20px] bg-[#8ed462]/20 flex items-center justify-center text-[#2c2e2a] font-bold text-lg mb-6">
                ★
              </div>
              <h3 className="text-2xl font-medium text-[#2c2e2a] tracking-tight">
                Interactive Quiz Arena
              </h3>
              <p className="text-[#80827f] text-sm leading-relaxed mt-3">
                Swipe Myth or Fact with instant feedback, live streaks, and doctor-evaluated scorecards.
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

      {/* MindMarket Sunshine Pop Closing Footer */}
      <footer className="w-full mt-auto bg-[#f5e211] text-[#2c2e2a] py-12 px-4 sm:px-8 border-t border-[#2c2e2a]">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col text-center sm:text-left">
            <span className="font-semibold text-xl tracking-tight">
              Steer Metabolic Health Club
            </span>
            <span className="text-xs text-[#2c2e2a]/80 mt-1 max-w-md">
              Doctor-led care • Blood diagnostics • DEXA composition tracking • Habit coaching. Educational game experience only.
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
