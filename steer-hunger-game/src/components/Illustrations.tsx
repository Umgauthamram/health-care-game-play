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
        <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" floodColor="#153A2D" />
        </filter>
      </defs>
      {/* Outer rim */}
      <circle cx="60" cy="60" r="54" fill="url(#clockGlow)" stroke="#153A2D" strokeWidth="4" filter="url(#shadow)" />
      <circle cx="60" cy="60" r="49" fill="none" stroke="#E27D30" strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />
      
      {/* Hour marks */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="60"
          y1="12"
          x2="60"
          y2={deg % 90 === 0 ? "18" : "15"}
          stroke={deg === 120 ? "#E27D30" : "#153A2D"}
          strokeWidth={deg === 120 ? "3" : deg % 90 === 0 ? "2.5" : "1.5"}
          strokeLinecap="round"
          transform={`rotate(${deg} 60 60)`}
        />
      ))}

      {/* 4 PM highlight badge */}
      <circle cx="94" cy="80" r="8" fill="#E27D30" opacity="0.2" />
      <circle cx="94" cy="80" r="4" fill="#E27D30" />

      {/* Minute hand pointing to 12 */}
      <line
        x1="60"
        y1="60"
        x2="60"
        y2="20"
        stroke="#153A2D"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Hour hand pointing to 4 (120 deg) with smooth sweep class */}
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

      {/* Katoris (Bowls) around */}
      {/* 1. Dal katori (top right, saffron-yellow) */}
      <circle cx="108" cy="46" r="21" fill="#EADCCB" stroke="#B8A995" strokeWidth="1.5" />
      <circle cx="108" cy="46" r="18" fill="#F0A638" />
      <path d="M 98 44 Q 108 38 118 45 Q 112 52 102 50 Z" fill="#D98A1E" opacity="0.6" />
      <circle cx="105" cy="42" r="1.5" fill="#5A2E12" /> {/* mustard seed */}
      <circle cx="112" cy="47" r="1.2" fill="#5A2E12" />

      {/* 2. Sabzi katori (top left, deep greens & paneer) */}
      <circle cx="52" cy="46" r="21" fill="#EADCCB" stroke="#B8A995" strokeWidth="1.5" />
      <circle cx="52" cy="46" r="18" fill="#2E6B48" />
      {/* Paneer cubes */}
      <rect x="44" y="42" width="6" height="6" rx="1" fill="#FFFDF8" />
      <rect x="53" y="47" width="5" height="5" rx="1" fill="#FFFDF8" />
      <rect x="52" y="38" width="6" height="5" rx="1" fill="#FFFDF8" />

      {/* 3. Dahi / Curd katori (bottom left, fresh white) */}
      <circle cx="48" cy="110" r="19" fill="#EADCCB" stroke="#B8A995" strokeWidth="1.5" />
      <circle cx="48" cy="110" r="16" fill="#FFFFFF" />
      <circle cx="48" cy="110" r="12" fill="#FBFBFA" />
      {/* pinch of roasted cumin */}
      <path d="M 44 108 Q 48 106 52 109" stroke="#92714D" strokeWidth="1" strokeDasharray="1.5 1.5" />

      {/* 4. Salad / Nimbu (bottom right) */}
      <circle cx="112" cy="108" r="17" fill="#EADCCB" stroke="#B8A995" strokeWidth="1.5" />
      <circle cx="112" cy="108" r="14" fill="#EFE8DC" />
      {/* Cucumber & carrot slices */}
      <circle cx="108" cy="106" r="7" fill="#93C87A" stroke="#5D8B49" strokeWidth="1" />
      <circle cx="116" cy="111" r="6" fill="#E86C3A" stroke="#B44B1F" strokeWidth="0.8" />

      {/* Center: Rotis stacked over rice */}
      {/* Rice base */}
      <ellipse cx="80" cy="80" rx="20" ry="18" fill="#FDFBF7" stroke="#ECE4D8" strokeWidth="1" />
      {/* Roti 1 */}
      <circle cx="77" cy="79" r="18" fill="#DEC29B" stroke="#BFA075" strokeWidth="1.5" />
      <circle cx="73" cy="76" r="1.5" fill="#8C663B" opacity="0.6" />
      <circle cx="81" cy="82" r="2" fill="#8C663B" opacity="0.5" />
      {/* Roti 2 slightly offset */}
      <circle cx="82" cy="81" r="16" fill="#E8D1B0" stroke="#C9AD85" strokeWidth="1.2" />
      <circle cx="85" cy="80" r="1.8" fill="#9C7749" opacity="0.5" />
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
      {/* Track Background */}
      <rect x="10" y="24" width="260" height="28" rx="14" fill="#EFE8DE" />

      {/* Muscle bar (Left 65%) */}
      <rect x="10" y="24" width="160" height="28" rx="14" fill="url(#muscleGrad)" />
      
      {/* Fat bar (Right 35% overlap) */}
      <rect x="174" y="24" width="96" height="28" rx="14" fill="url(#fatGrad)" />

      {/* Labels */}
      <text x="30" y="16" fill="#153A2D" fontSize="11" fontWeight="700" fontFamily="sans-serif">
        Lean Muscle (Target: Retain)
      </text>
      <text x="180" y="16" fill="#C85E16" fontSize="11" fontWeight="700" fontFamily="sans-serif">
        Visceral Fat (Burn)
      </text>

      {/* Internal icons or numbers */}
      <text x="80" y="42" fill="#FFFFFF" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
        68% Lean Mass
      </text>
      <text x="222" y="42" fill="#FFFFFF" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
        DEXA Tracked
      </text>

      {/* Indicator needle */}
      <polygon points="167,56 173,56 170,62" fill="#153A2D" />
      <text x="170" y="74" fill="#4B5851" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
        Gold-standard balance
      </text>
    </svg>
  );
}

export function StomachBrainSignaling({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 140" className={className} aria-label="Gut brain hormonal signaling axis" role="img">
      {/* Brain node (top) */}
      <circle cx="70" cy="28" r="18" fill="#F3ECE0" stroke="#153A2D" strokeWidth="2.5" />
      <path d="M 64 22 Q 70 18 76 22 Q 82 26 77 34 Q 70 38 63 32 Z" fill="#153A2D" opacity="0.15" />
      <text x="70" y="32" fill="#153A2D" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
        BRAIN
      </text>

      {/* Stomach / Gut node (bottom) */}
      <circle cx="70" cy="112" r="18" fill="#FBEFE3" stroke="#E27D30" strokeWidth="2.5" />
      <path d="M 62 108 Q 72 100 78 109 Q 78 120 68 120 Z" fill="#E27D30" opacity="0.2" />
      <text x="70" y="116" fill="#C85E16" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
        GUT
      </text>

      {/* Two-way neural / hormonal signal paths */}
      <path
        d="M 60 48 C 50 65 50 75 60 92"
        fill="none"
        stroke="#E27D30"
        strokeWidth="2.5"
        strokeDasharray="4 3"
      />
      <polygon points="60,94 56,87 63,88" fill="#E27D30" />

      <path
        d="M 80 92 C 90 75 90 65 80 48"
        fill="none"
        stroke="#153A2D"
        strokeWidth="2.5"
        strokeDasharray="4 3"
      />
      <polygon points="80,46 84,53 77,52" fill="#153A2D" />

      {/* Center Hormone Badge: GLP-1 */}
      <rect x="42" y="60" width="56" height="20" rx="10" fill="#153A2D" />
      <text x="70" y="74" fill="#FBF8F3" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
        GLP-1 Axis
      </text>
    </svg>
  );
}

export function SteerBadge({ text = "STEER DOCTOR-LED" }: { text?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#153A2D]/10 border border-[#153A2D]/20 text-[#153A2D] text-xs font-semibold tracking-wider uppercase">
      <svg className="w-3.5 h-3.5 text-[#153A2D]" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      {text}
    </span>
  );
}
