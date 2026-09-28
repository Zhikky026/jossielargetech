import React from 'react';

interface JLLogoProps {
  className?: string;
  variant?: 'header' | 'full' | 'mark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const JLLogo: React.FC<JLLogoProps> = ({
  className = '',
  variant = 'header',
  size = 'md',
}) => {
  // Dimension scales
  const markSize = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20',
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 3D JL Monogram with Orbital Ring */}
      <div className={`relative shrink-0 ${markSize} flex items-center justify-center`}>
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full overflow-visible drop-shadow-[0_2px_12px_rgba(0,132,255,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="JL Technologies Official Emblem"
        >
          <defs>
            {/* Blue J Gradients */}
            <linearGradient id="jl-blue-front" x1="20" y1="20" x2="80" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="40%" stopColor="#0084FF" />
              <stop offset="100%" stopColor="#004AD6" />
            </linearGradient>
            
            <linearGradient id="jl-blue-side" x1="40" y1="40" x2="90" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="60%" stopColor="#004AD6" />
              <stop offset="100%" stopColor="#00216B" />
            </linearGradient>

            <linearGradient id="jl-blue-highlight" x1="30" y1="20" x2="70" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#0084FF" />
            </linearGradient>

            {/* Silver L Gradients */}
            <linearGradient id="jl-silver-front" x1="70" y1="20" x2="130" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>

            <linearGradient id="jl-silver-side" x1="80" y1="20" x2="140" y2="130" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="50%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Orbital Ring Gradient */}
            <linearGradient id="jl-orbit-grad" x1="10" y1="110" x2="150" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0066FF" stopOpacity="0.2" />
              <stop offset="25%" stopColor="#00A3FF" />
              <stop offset="55%" stopColor="#38BDF8" />
              <stop offset="85%" stopColor="#0084FF" />
              <stop offset="100%" stopColor="#0055D4" stopOpacity="0.1" />
            </linearGradient>

            {/* Filter for subtle glow */}
            <filter id="jl-orbit-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* BACK HALF OF ORBITAL RING (Passes behind L and upper stem) */}
          <path
            d="M 125 72 C 145 66 150 56 138 50 C 122 43 92 48 64 57"
            stroke="url(#jl-orbit-grad)"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* 3D "J" SHAPE */}
          {/* J Side facet (depth) */}
          <path
            d="M 52 24 L 66 36 L 66 98 C 66 116 54 126 38 126 C 26 126 18 120 18 120 L 22 108 C 22 108 28 114 36 114 C 44 114 50 108 50 96 L 50 44 L 32 44 L 28 34 L 52 24 Z"
            fill="url(#jl-blue-side)"
          />

          {/* J Front Face */}
          <path
            d="M 44 32 L 60 42 L 60 94 C 60 110 50 120 36 120 C 26 120 20 115 20 115 L 24 105 C 24 105 28 109 34 109 C 42 109 46 103 46 92 L 46 48 L 30 48 L 26 40 L 44 32 Z"
            fill="url(#jl-blue-front)"
          />

          {/* J Top Bevel Highlight */}
          <path
            d="M 44 32 L 60 42 L 54 44 L 36 36 Z"
            fill="url(#jl-blue-highlight)"
            opacity="0.9"
          />

          {/* 3D "L" SHAPE */}
          {/* L Side facet (depth) */}
          <path
            d="M 76 22 L 90 32 L 90 92 L 132 92 L 136 102 L 80 102 L 76 96 L 76 22 Z"
            fill="url(#jl-silver-side)"
          />

          {/* L Front Face */}
          <path
            d="M 80 24 L 92 34 L 92 88 L 128 88 L 124 98 L 84 98 L 80 92 L 80 24 Z"
            fill="url(#jl-silver-front)"
          />

          {/* L Corner Highlight */}
          <path
            d="M 80 24 L 92 34 L 88 36 L 78 27 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />

          {/* FRONT SWEEPING HALF OF THE ORBITAL RING */}
          <path
            d="M 12 94 C 10 108 26 116 54 114 C 92 110 134 94 148 76 C 154 68 148 62 136 64 C 114 68 76 86 42 98 C 26 103 14 101 12 94 Z"
            fill="url(#jl-orbit-grad)"
            filter="url(#jl-orbit-glow)"
          />

          {/* Core high-intensity arc on orbit */}
          <path
            d="M 22 98 C 48 94 88 84 130 68"
            stroke="#BAE6FD"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Typography: JossieLarge TECHNOLOGIES */}
      {variant !== 'mark' && (
        <div className="flex flex-col tracking-tight">
          <div className="flex items-baseline font-bold leading-none text-lg md:text-xl font-display">
            <span className="text-white font-extrabold tracking-tight">Jossie</span>
            <span className="text-[#0084FF] font-extrabold tracking-tight">Large</span>
          </div>

          <div className="flex items-center justify-between text-[8px] md:text-[9.5px] font-semibold tracking-[0.28em] text-slate-300 uppercase mt-0.5">
            <span>T</span>
            <span>E</span>
            <span>C</span>
            <span>H</span>
            <span>N</span>
            <span>O</span>
            <span>L</span>
            <span>O</span>
            <span>G</span>
            <span>I</span>
            <span>E</span>
            <span>S</span>
          </div>

          {variant === 'full' && (
            <div className="text-[10px] text-slate-400 font-medium tracking-normal mt-1 hidden sm:flex items-center gap-1.5">
              <span>Digital Marketing</span>
              <span className="text-slate-600">·</span>
              <span>AI</span>
              <span className="text-slate-600">·</span>
              <span>Software</span>
              <span className="text-slate-600">·</span>
              <span>Automation</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
