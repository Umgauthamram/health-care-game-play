import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock4PMRadial,
  IndianThaliIllustration,
  MuscleFatSplitIllustration,
  StomachBrainSignaling
} from "@/components/Illustrations";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-[#0D1612] text-[#F7F5F0] flex flex-col selection:bg-[#D4AF37]/30">
      {/* Top Floating Glassmorphic Header */}
      <div className="w-full pt-5 px-4 sm:px-8 max-w-[1360px] mx-auto z-40">
        <header className="w-full bg-[#143026]/80 backdrop-blur-xl rounded-[24px] px-6 sm:px-8 py-3.5 flex items-center justify-between border border-[#D4AF37]/25 shadow-2xl">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#D4AF37] to-[#8F7020] flex items-center justify-center font-bold text-xl text-[#0D1612] shadow-md group-hover:scale-105 transition-transform">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-serif italic text-2xl tracking-wide text-white group-hover:text-[#D4AF37] transition-colors leading-none">
                Steer<span className="text-[#D4AF37] not-italic">.</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4AF37]/90 mt-1">
                Private Metabolic Club
              </span>
            </div>
          </Link>

          {/* Luxury Editorial Nav */}
          <nav className="hidden md:flex items-center gap-2 text-[14px] font-medium text-[#F7F5F0]/80">
            <a
              href="#physicians"
              className="px-4 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all tracking-wide"
            >
              Faculty Physicians
            </a>
            <a
              href="#metabolic-science"
              className="px-4 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all tracking-wide"
            >
              The 4:00 PM Biology
            </a>
            <a
              href="#diagnostics"
              className="px-4 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all tracking-wide"
            >
              DEXA & Diagnostics
            </a>
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/play"
              className="relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0D1612] text-sm font-bold tracking-wide shadow-lg hover:shadow-[#D4AF37]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Play 4pm Assessment</span>
              <span className="w-2 h-2 rounded-full bg-[#0D1612] animate-ping" />
            </Link>
          </div>
        </header>
      </div>

      {/* Hero Display: High Fashion / Luxury Clinic Editorial */}
      <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-16 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#143026] border border-[#D4AF37]/35 text-xs font-semibold tracking-wider uppercase text-[#D4AF37] mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              Doctor-Led Precision Endocrinology
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.05]">
              Why hunger hits hard at <span className="italic text-[#D4AF37]">4:00 PM</span>, even after a full Indian thali.
            </h1>

            <p className="mt-6 text-[#F7F5F0]/75 text-base sm:text-xl font-light leading-relaxed max-w-2xl">
              Most professionals blame weak willpower for afternoon cravings. Clinical science reveals an intricate cascade of gut peptides, rapid post-carb glucose rebounds, and visceral adiposity.
            </p>

            {/* Premium CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
              <Link
                href="/play"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C58A38] text-[#0D1612] text-base font-bold tracking-wide shadow-xl hover:shadow-[#D4AF37]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Select Your Physician & Begin Assessment</span>
                <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
              </Link>

              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#F7F5F0]/60 self-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>60-second interactive clinical game</span>
              </div>
            </div>

            {/* Medical Metrics Ticker */}
            <div className="mt-12 w-full pt-8 border-t border-white/10 grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-serif text-[#D4AF37] italic">100%</div>
                <div className="text-xs text-[#F7F5F0]/60 uppercase tracking-wider mt-1">Doctor-Prescribed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif text-[#D4AF37] italic">DEXA</div>
                <div className="text-xs text-[#F7F5F0]/60 uppercase tracking-wider mt-1">Muscle Scan Standard</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif text-[#D4AF37] italic">0 Regain</div>
                <div className="text-xs text-[#F7F5F0]/60 uppercase tracking-wider mt-1">Tapering Protocol</div>
              </div>
            </div>
          </div>

          {/* Right Hero Stage: Featured Physician Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full bg-gradient-to-b from-[#143026] to-[#0D1612] rounded-[36px] p-8 border border-[#D4AF37]/30 shadow-2xl flex flex-col items-center overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Physician Image Showcase */}
              <div className="relative w-56 sm:w-64 h-80 sm:h-96 drop-shadow-2xl z-10">
                <Image
                  src="/images/female doctor.jpg"
                  alt="Dr. Meera • Lead Metabolic Physician"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Floating Physician Badge */}
              <div className="w-full mt-4 bg-[#0D1612]/90 backdrop-blur-md p-5 rounded-[24px] border border-[#D4AF37]/30 z-20">
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">Dr. Meera, MD</h3>
                    <p className="text-[11px] text-[#D4AF37] uppercase tracking-wider font-semibold">Chief of Metabolic Physiology</p>
                  </div>
                  <span className="text-[10px] bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] px-2.5 py-1 rounded-full font-bold">
                    ON DUTY
                  </span>
                </div>
                <p className="text-xs text-[#F7F5F0]/75 leading-relaxed mt-2 italic font-serif">
                  &ldquo;I review your 6 quiz answers, DEXA muscle metrics, and gut satiety markers to build your custom protocol.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Physician Faculty Selection Grid */}
      <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-16" id="physicians">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
              <span>Clinical Mentorship</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-white mt-2">
              Choose your physician mentor
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#F7F5F0]/70 max-w-md font-light">
            Every Steer patient is paired with certified endocrinologists and metabolic physicians. Select who guides your interactive assessment:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Doctor 1: Dr. Meera */}
          <div className="bg-[#143026]/70 rounded-[32px] p-7 border border-[#D4AF37]/25 flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all group backdrop-blur-sm">
            <div className="relative w-full h-64 sm:h-72 flex items-center justify-center">
              <div className="relative w-44 sm:w-52 h-full">
                <Image
                  src="/images/female doctor.jpg"
                  alt="Dr. Meera"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="w-full pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-white">Dr. Meera, MD</h3>
                <span className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">AIIMS FELLOW</span>
              </div>
              <p className="text-xs text-[#D4AF37] font-medium tracking-wide mt-1">
                Metabolic Physiology & Satiety Pacing
              </p>
              <p className="text-xs text-[#F7F5F0]/65 mt-2 leading-relaxed">
                Specialises in overcoming post-lunch glucose crashes and GLP-1 hormone receptor responsiveness.
              </p>
              <Link
                href="/play?doc=female"
                className="w-full mt-5 bg-gradient-to-r from-[#D4AF37] to-[#B38F25] text-[#0D1612] text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-full transition-all flex items-center justify-center gap-2 hover:brightness-110 shadow-md"
              >
                <span>Select Dr. Meera</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Doctor 2: Dr. Aryan */}
          <div className="bg-[#143026]/70 rounded-[32px] p-7 border border-[#D4AF37]/25 flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all group backdrop-blur-sm">
            <div className="relative w-full h-64 sm:h-72 flex items-center justify-center">
              <div className="relative w-44 sm:w-52 h-full">
                <Image
                  src="/images/male doctor.jpg"
                  alt="Dr. Aryan"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="w-full pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-white">Dr. Aryan, MD</h3>
                <span className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">DEXA SPECIALIST</span>
              </div>
              <p className="text-xs text-[#D4AF37] font-medium tracking-wide mt-1">
                DEXA Body Composition & Muscle Shield
              </p>
              <p className="text-xs text-[#F7F5F0]/65 mt-2 leading-relaxed">
                Guarantees visceral adipose tissue reduction while shielding lean muscle and skeletal mass.
              </p>
              <Link
                href="/play?doc=male"
                className="w-full mt-5 bg-gradient-to-r from-[#D4AF37] to-[#B38F25] text-[#0D1612] text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-full transition-all flex items-center justify-center gap-2 hover:brightness-110 shadow-md"
              >
                <span>Select Dr. Aryan</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Doctor 3: Joint Clinical Board */}
          <div className="bg-[#143026]/70 rounded-[32px] p-7 border border-[#D4AF37]/25 flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all group backdrop-blur-sm">
            <div className="relative w-full h-64 sm:h-72 flex items-center justify-center">
              <div className="relative w-52 sm:w-60 h-full">
                <Image
                  src="/images/both male and female doctor.jpg"
                  alt="Steer Clinical Board"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="w-full pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-white">Clinical Review Board</h3>
                <span className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">SYNERGY TEAM</span>
              </div>
              <p className="text-xs text-[#D4AF37] font-medium tracking-wide mt-1">
                Dual Endocrinology & Clinical Nutrition
              </p>
              <p className="text-xs text-[#F7F5F0]/65 mt-2 leading-relaxed">
                Comprehensive panel evaluation reviewing gut microbiome, blood biomarkers, and sustainable habits.
              </p>
              <Link
                href="/play?doc=team"
                className="w-full mt-5 bg-gradient-to-r from-[#D4AF37] to-[#B38F25] text-[#0D1612] text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-full transition-all flex items-center justify-center gap-2 hover:brightness-110 shadow-md"
              >
                <span>Select Clinical Board</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The 4pm Phenomenon: Medical Science Panel */}
      <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-14" id="metabolic-science">
        <div className="bg-gradient-to-br from-[#143026] via-[#1B4D3E]/60 to-[#0D1612] rounded-[36px] p-8 sm:p-14 border border-[#D4AF37]/30 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
              <span>Clinical Endocrinology</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-white leading-tight">
              A full Indian lunch doesn’t protect you from the 4:00 PM drop.
            </h2>
            <p className="text-[#F7F5F0]/75 text-base sm:text-lg leading-relaxed font-light">
              Dal, 2 rotis, sabzi, curd... by 1:30 PM you feel replete. Yet by 4:00 PM, carbohydrate-induced glycemic spikes trigger an insulin rebound. GLP-1 satiety signals decay, and ghrelin floods the hypothalamus, creating intense cravings for tea and snacks.
            </p>
            <div className="pt-2">
              <Link
                href="/play"
                className="inline-flex items-center gap-2.5 text-[#D4AF37] text-sm font-semibold tracking-wide border-b border-[#D4AF37] pb-1 hover:text-white hover:border-white transition-colors"
              >
                <span>Play the 6-question quiz to test your metabolic response</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center gap-6 flex-wrap sm:flex-nowrap">
            <div className="flex flex-col items-center p-6 bg-[#0D1612]/70 rounded-[28px] border border-[#D4AF37]/30 shadow-lg">
              <Clock4PMRadial className="w-32 h-32" />
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mt-3">4:00 PM Glucagon Spike</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-[#0D1612]/70 rounded-[28px] border border-[#D4AF37]/30 shadow-lg">
              <IndianThaliIllustration className="w-32 h-32" />
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mt-3">Post-Thali Rebound</span>
            </div>
          </div>
        </div>
      </section>

      {/* Precision Diagnostic Pillars */}
      <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-16" id="diagnostics">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-2">
            <span>Hospital-Grade Protocols</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white">
            Diagnostic care designed for lasting results.
          </h2>
          <p className="text-[#F7F5F0]/70 text-base mt-2 font-light max-w-xl">
            Steer is neither a generic calorie app nor a rapid pill dispenser. We measure and rebalance human biochemistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-[#143026]/60 rounded-[32px] p-8 border border-[#D4AF37]/25 flex flex-col justify-between hover:border-[#D4AF37] transition-all">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6">
                <StomachBrainSignaling className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-white">
                Gut & GLP-1 Biology
              </h3>
              <p className="text-[#F7F5F0]/70 text-sm leading-relaxed mt-3 font-light">
                Appetite is coordinated by gut peptides and brain neurotransmitters. When clinically indicated, physicians supervise therapy alongside microbiome diagnostics.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">Clinical Physician Supervised</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#143026]/60 rounded-[32px] p-8 border border-[#D4AF37]/25 flex flex-col justify-between hover:border-[#D4AF37] transition-all">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6">
                <MuscleFatSplitIllustration className="w-12 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-white">
                DEXA Muscle Shield
              </h3>
              <p className="text-[#F7F5F0]/70 text-sm leading-relaxed mt-3 font-light">
                South Asians naturally accumulate high visceral adiposity. Steer monitors lean tissue via gold-standard DEXA scans to ensure weight lost is pure visceral fat.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">Lean Skeletal Preservation</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#143026]/60 rounded-[32px] p-8 border border-[#D4AF37]/25 flex flex-col justify-between hover:border-[#D4AF37] transition-all">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6">
                <span className="font-serif text-2xl italic font-bold">60s</span>
              </div>
              <h3 className="font-serif text-2xl text-white">
                Interactive Assessment Arena
              </h3>
              <p className="text-[#F7F5F0]/70 text-sm leading-relaxed mt-3 font-light">
                Swipe Myth or Fact with instant feedback, live streaks, and physician-evaluated personal scorecards.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/play"
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B38F25] text-[#0D1612] text-sm font-bold uppercase tracking-wider py-4 px-6 rounded-full transition-all flex items-center justify-center gap-2 hover:brightness-110 shadow-lg"
              >
                <span>Launch Quiz Game</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Prestigious Editorial Footer */}
      <footer className="w-full mt-auto bg-[#070C0A] text-[#F7F5F0] py-14 px-4 sm:px-8 border-t border-[#D4AF37]/20">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col text-center md:text-left">
            <span className="font-serif italic text-2xl tracking-wide text-white">
              Steer<span className="text-[#D4AF37] not-italic">.</span> Metabolic Health Club
            </span>
            <span className="text-xs text-[#F7F5F0]/60 mt-2 max-w-lg leading-relaxed">
              Doctor-led care • Clinical blood panels • DEXA body composition • Neuro-habit coaching. Educational interactive game. Not a substitute for formal diagnosis.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/play"
              className="bg-gradient-to-r from-[#D4AF37] to-[#C58A38] text-[#0D1612] text-sm font-bold px-7 py-3 rounded-full hover:scale-105 transition-all shadow-md"
            >
              Start 4pm Game →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
