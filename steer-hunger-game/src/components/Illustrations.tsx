import React from "react";

export function Clock4PMRadial({ className = "w-28 h-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-label="Clock pointing to 4 PM" role="img">
      <defs>
        <radialGradient id="clockGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="90%" stopColor="#F5EFE6" />
          <stop offset="100%" stopColor="#EADECF" />
        </radialGradient>
      </defs>
      {/* Outer rim */}
      <circle cx="60" cy="60" r="54" fill="url(#clockGlow)" stroke="#153A2D" strokeWidth="4" />
      <circle cx="60" cy="60" r="49" fill="none" stroke="#E27D30" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />
      
      {/* Hour marks */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="60"
          y1="12"
          x2="60"
          y2={deg % 90 === 0 ? "18" : "15"}
          stroke={deg === 120 ? "#E27D30" : "#153A2D"}
          strokeWidth={deg === 120 ? "3.5" : deg % 90 === 0 ? "2.5" : "1.5"}
          strokeLinecap="round"
          transform={`rotate(${deg} 60 60)`}
        />
      ))}

      {/* 4 PM highlight badge */}
      <circle cx="94" cy="80" r="8" fill="#E27D30" opacity="0.25" />
      <circle cx="94" cy="80" r="4.5" fill="#E27D30" />

      {/* Minute hand pointing to 12 */}
      <line
        x1="60"
        y1="60"
        x2="60"
        y2="20"
        stroke="#153A2D"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Hour hand pointing to 4 */}
      <line
        x1="60"
        y1="60"
        x2="86"
        y2="75"
        stroke="#E27D30"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Center cap */}
      <circle cx="60" cy="60" r="5" fill="#153A2D" />
      <circle cx="60" cy="60" r="2" fill="#FAF6EE" />
    </svg>
  );
}

export function IndianThaliIllustration({ className = "w-36 h-36" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-label="Indian Thali illustration" role="img">
      <defs>
        <radialGradient id="thaliSilver" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F0EBE1" />
          <stop offset="100%" stopColor="#DFD6C7" />
        </radialGradient>
      </defs>
      {/* Outer steel rim */}
      <circle cx="80" cy="80" r="74" fill="url(#thaliSilver)" stroke="#AFA393" strokeWidth="3" />
      <circle cx="80" cy="80" r="70" fill="none" stroke="#D3C9BC" strokeWidth="1.5" />
      <circle cx="80" cy="80" r="66" fill="#FBF8F3" stroke="#E6DDD0" strokeWidth="1" />

      {/* Dal katori */}
      <circle cx="108" cy="46" r="21" fill="#EADCCB" stroke="#B8A995" strokeWidth="1.5" />
      <circle cx="108" cy="46" r="18" fill="#F0A638" />
      <path d="M 98 44 Q 108 38 118 45 Q 112 52 102 50 Z" fill="#D98A1E" opacity="0.6" />

      {/* Sabzi katori */}
      <circle cx="52" cy="46" r="21" fill="#EADCCB" stroke="#B8A995" strokeWidth="1.5" />
      <circle cx="52" cy="46" r="18" fill="#2E6B48" />
      <rect x="44" y="42" width="6" height="6" rx="1" fill="#FFFDF8" />
      <rect x="53" y="47" width="5" height="5" rx="1" fill="#FFFDF8" />

      {/* Dahi / Curd katori */}
      <circle cx="48" cy="110" r="19" fill="#EADCCB" stroke="#B8A995" strokeWidth="1.5" />
      <circle cx="48" cy="110" r="16" fill="#FFFFFF" />
      <path d="M 44 108 Q 48 106 52 109" stroke="#92714D" strokeWidth="1" strokeDasharray="1.5 1.5" />

      {/* Salad / Cucumber */}
      <circle cx="112" cy="108" r="17" fill="#EADCCB" stroke="#B8A995" strokeWidth="1.5" />
      <circle cx="112" cy="108" r="14" fill="#EFE8DC" />
      <circle cx="108" cy="106" r="7" fill="#93C87A" stroke="#5D8B49" strokeWidth="1" />
      <circle cx="116" cy="111" r="6" fill="#E86C3A" stroke="#B44B1F" strokeWidth="0.8" />

      {/* Center: Roti / Rice */}
      <ellipse cx="80" cy="80" rx="20" ry="18" fill="#FDFBF7" stroke="#ECE4D8" strokeWidth="1" />
      <circle cx="77" cy="79" r="18" fill="#DEC29B" stroke="#BFA075" strokeWidth="1.5" />
      <circle cx="82" cy="81" r="16" fill="#E8D1B0" stroke="#C9AD85" strokeWidth="1.2" />
    </svg>
  );
}

export function MuscleFatSplitIllustration({ className = "w-full max-w-[280px] h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 80" className={className} aria-label="Muscle vs Fat composition split" role="img">
      <defs>
        <linearGradient id="muscleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#153A2D" />
          <stop offset="100%" stopColor="#256B52" />
        </linearGradient>
        <linearGradient id="fatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E27D30" />
          <stop offset="100%" stopColor="#F5A25D" />
        </linearGradient>
      </defs>
      <rect x="10" y="24" width="260" height="28" rx="14" fill="#EFE8DE" />
      <rect x="10" y="24" width="160" height="28" rx="14" fill="url(#muscleGrad)" />
      <rect x="174" y="24" width="96" height="28" rx="14" fill="url(#fatGrad)" />

      <text x="30" y="16" fill="#153A2D" fontSize="11" fontWeight="700" fontFamily="sans-serif">
        Lean Muscle (Preserve)
      </text>
      <text x="180" y="16" fill="#C85E16" fontSize="11" fontWeight="700" fontFamily="sans-serif">
        Visceral Fat (Target)
      </text>

      <text x="80" y="42" fill="#FFFFFF" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
        Lean Mass
      </text>
      <text x="222" y="42" fill="#FFFFFF" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
        DEXA Verified
      </text>
    </svg>
  );
}

export function StomachBrainSignaling({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 140" className={className} aria-label="Gut brain hormonal signaling axis" role="img">
      {/* Brain node */}
      <circle cx="70" cy="28" r="18" fill="#F3ECE0" stroke="#153A2D" strokeWidth="2.5" />
      <path d="M 64 22 Q 70 18 76 22 Q 82 26 77 34 Q 70 38 63 32 Z" fill="#153A2D" opacity="0.15" />
      <text x="70" y="32" fill="#153A2D" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
        BRAIN
      </text>

      {/* Stomach / Gut node */}
      <circle cx="70" cy="112" r="18" fill="#FBEFE3" stroke="#E27D30" strokeWidth="2.5" />
      <text x="70" y="116" fill="#C85E16" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
        GUT
      </text>

      {/* Signals */}
      <path d="M 60 48 C 50 65 50 75 60 92" fill="none" stroke="#E27D30" strokeWidth="2.5" strokeDasharray="4 3" />
      <polygon points="60,94 56,87 63,88" fill="#E27D30" />

      <path d="M 80 92 C 90 75 90 65 80 48" fill="none" stroke="#153A2D" strokeWidth="2.5" strokeDasharray="4 3" />
      <polygon points="80,46 84,53 77,52" fill="#153A2D" />

      <rect x="42" y="60" width="56" height="20" rx="10" fill="#153A2D" />
      <text x="70" y="74" fill="#FBF8F3" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
        GLP-1 Axis
      </text>
    </svg>
  );
}

export function SteerBadge({ text = "STEER DOCTOR-LED" }: { text?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#143026] border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-semibold tracking-wider uppercase shadow-sm">
      <svg className="w-3.5 h-3.5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      {text}
    </span>
  );
}

// Crisp Vector Game Icons for Doubts & Features (replacing unformatted raw emojis)
export function GameIconShield({ className = "w-4 h-4 text-[#153A2D]" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

export function GameIconBicep({ className = "w-4 h-4 text-[#153A2D]" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

export function GameIconRefresh({ className = "w-4 h-4 text-[#153A2D]" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

export function GameIconMicroscope({ className = "w-4 h-4 text-[#153A2D]" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );
}

export function GameIconTarget({ className = "w-4 h-4 text-[#153A2D]" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
