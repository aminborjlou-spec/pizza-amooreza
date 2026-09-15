import React from 'react';

/**
 * Minimalist Line-Art Fast Food Icons from the reference image:
 * - Sausage on a fork
 * - Steaming hot dog with zigzag mustard
 * - Multi-layer burger with cheese & waves
 * - Taco / wrap with wavy filling
 * - Triple-layer club sandwich toast
 * - Grilled steak with grill marks & bone
 * - Curved sausage with tied ends
 * - Hot dog with diagonal grill marks and steam
 * - Classic cheeseburger with sesame
 */

// 1. Sausage on Fork
export const SausageOnForkIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Sausage body */}
    <path d="M 24,38 C 30,56 70,56 76,38 C 82,24 64,30 50,32 C 36,30 18,24 24,38 Z" />
    {/* Left tied end */}
    <path d="M 18,24 L 14,18 L 22,22 L 20,14" />
    {/* Right tied end */}
    <path d="M 82,24 L 86,18 L 78,22 L 80,14" />
    {/* Fork tines */}
    <path d="M 42,46 L 42,66" />
    <path d="M 47,48 L 47,66" />
    <path d="M 53,48 L 53,66" />
    <path d="M 58,46 L 58,66" />
    {/* Fork base & handle */}
    <path d="M 40,66 C 40,78 60,78 60,66" />
    <path d="M 50,78 L 50,110 C 50,115 47,118 45,118 C 43,118 46,110 46,104" />
  </svg>
);

// 2. Steaming Hot Dog with Wavy Mustard
export const SteamingHotDogIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Steam waves */}
    <path d="M 40,10 Q 36,18 42,24" />
    <path d="M 50,8 Q 46,16 52,22" />
    <path d="M 60,10 Q 56,18 62,24" />
    {/* Top Bun rim */}
    <path d="M 16,42 C 16,35 84,35 84,42" />
    {/* Sausage */}
    <rect x="10" y="44" width="80" height="18" rx="9" />
    {/* Wavy Mustard line */}
    <path d="M 18,53 Q 26,46 34,53 Q 42,60 50,53 Q 58,46 66,53 Q 74,60 82,53" />
    {/* Bottom Bun */}
    <path d="M 18,62 C 18,78 82,78 82,62" />
    <path d="M 12,68 C 12,86 88,86 88,68" />
  </svg>
);

// 3. Layered Burger
export const LayeredBurgerIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Top Bun */}
    <path d="M 18,36 C 18,12 82,12 82,36 Z" />
    {/* Wavy Lettuce / sauce */}
    <path d="M 18,44 Q 26,49 34,44 Q 42,49 50,44 Q 58,49 66,44 Q 74,49 82,44" />
    {/* Patty */}
    <rect x="20" y="50" width="60" height="10" rx="5" />
    {/* Cheese Corner Triangle */}
    <polygon points="30,60 70,60 50,70" />
    {/* Bottom Bun */}
    <path d="M 22,72 C 22,86 78,86 78,72 Z" />
  </svg>
);

// 4. Taco / Folded Wrap
export const TacoIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Taco outer shell arc */}
    <path d="M 15,65 C 15,22 85,22 85,65 L 15,65 Z" />
    {/* Inner wavy filling along left curve */}
    <path d="M 24,65 C 24,58 28,54 28,48 C 28,42 34,38 38,32 C 44,26 55,26 62,32" />
    {/* Wavy lettuce scallops inside taco */}
    <path d="M 20,62 Q 26,56 22,50 Q 28,44 26,38 Q 32,32 38,30" />
  </svg>
);

// 5. Triple-layer Club Sandwich / Toast
export const ClubSandwichIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Top Bread Slice (Isometric) */}
    <polygon points="40,16 85,24 65,42 20,34" />
    {/* Seeds on top */}
    <circle cx="42" cy="24" r="1.5" fill="currentColor" />
    <circle cx="56" cy="28" r="1.5" fill="currentColor" />
    <circle cx="70" cy="30" r="1.5" fill="currentColor" />
    <circle cx="48" cy="33" r="1.5" fill="currentColor" />
    {/* Middle filling waves */}
    <path d="M 20,38 Q 30,46 42,42 Q 54,48 65,44 L 65,50" />
    {/* Second Bread Slice */}
    <polygon points="20,44 65,50 62,58 18,52" />
    {/* Bottom filling */}
    <path d="M 18,56 Q 30,64 42,58 Q 54,66 62,60" />
    {/* Bottom Bread Slice */}
    <polygon points="18,62 62,68 58,78 14,72" />
    {/* Side crust shading lines */}
    <path d="M 22,64 L 20,72" />
    <path d="M 28,65 L 26,73" />
    <path d="M 34,66 L 32,74" />
  </svg>
);

// 6. Grilled Steak with Grill Marks & Marrow
export const GrilledSteakIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Steak Cut Outline */}
    <path d="M 30,30 C 55,20 85,32 80,60 C 76,76 45,85 28,76 C 16,68 18,40 30,30 Z" />
    {/* 3D lower thickness rim */}
    <path d="M 18,54 C 18,74 42,88 74,78" />
    {/* Bone Marrow Ring */}
    <ellipse cx="34" cy="46" rx="6" ry="4" />
    {/* Parallel Diagonal Grill Marks */}
    <line x1="48" y1="34" x2="42" y2="52" />
    <line x1="58" y1="36" x2="50" y2="58" />
    <line x1="68" y1="40" x2="60" y2="64" />
    <line x1="76" y1="48" x2="70" y2="68" />
  </svg>
);

// 7. Curved Sausage with Tied Ends
export const CurvedSausageIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Curved sausage body */}
    <path d="M 24,32 C 32,56 68,56 76,32 C 84,14 62,22 50,24 C 38,22 16,14 24,32 Z" />
    {/* Left tied wrapper end */}
    <path d="M 16,22 L 10,16 L 18,20 L 16,12" />
    {/* Right tied wrapper end */}
    <path d="M 84,22 L 90,16 L 82,20 L 84,12" />
  </svg>
);

// 8. Hot Dog with Diagonal Grill Marks & Steam
export const HotDogGrillIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Steam lines */}
    <path d="M 42,10 Q 38,18 44,24" />
    <path d="M 52,8 Q 48,16 54,22" />
    <path d="M 62,10 Q 58,18 64,24" />
    {/* Top Bun rim */}
    <path d="M 20,38 C 20,32 80,32 80,38" />
    {/* Sausage body */}
    <rect x="12" y="42" width="76" height="16" rx="8" />
    {/* Diagonal Grill Slits */}
    <line x1="28" y1="46" x2="34" y2="54" />
    <line x1="38" y1="46" x2="44" y2="54" />
    <line x1="48" y1="46" x2="54" y2="54" />
    <line x1="58" y1="46" x2="64" y2="54" />
    <line x1="68" y1="46" x2="74" y2="54" />
    {/* Bottom Bun */}
    <path d="M 16,62 C 16,78 84,78 84,62" />
  </svg>
);

// 9. Classic Burger with Sesame & Cheese
export const ClassicCheeseburgerIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Round Top Bun */}
    <path d="M 20,38 C 20,14 80,14 80,38 Z" />
    {/* Sesame seeds */}
    <circle cx="40" cy="24" r="1.5" fill="currentColor" />
    <circle cx="56" cy="20" r="1.5" fill="currentColor" />
    <circle cx="66" cy="28" r="1.5" fill="currentColor" />
    {/* Wavy Lettuce */}
    <path d="M 20,44 Q 28,49 35,44 Q 42,49 50,44 Q 58,49 65,44 Q 72,49 80,44" />
    {/* Hanging triangular cheese slice */}
    <polygon points="26,52 74,52 42,66" />
    {/* Patty */}
    <rect x="22" y="52" width="56" height="10" rx="5" />
    {/* Bottom Bun */}
    <path d="M 24,68 C 24,82 76,82 76,68 Z" />
  </svg>
);

/**
 * MinimalFastFoodBackground
 * Floats the exact minimalist line-art vector icons from the user's reference image
 * across the background with soft floating animations and subtle amber/neutral styling.
 */
export const MinimalFastFoodBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Orange Halos / Warm Atmospheric Glows over White Canvas */}
      {/* 1. Large Top Center/Right Orange Halo */}
      <div className="absolute -top-36 right-[15%] w-[680px] h-[680px] bg-gradient-to-br from-orange-500/25 via-amber-400/20 to-transparent rounded-full blur-[110px]" />

      {/* 2. Middle Left Warm Orange Aura */}
      <div className="absolute top-[28%] -left-36 w-[600px] h-[600px] bg-gradient-to-tr from-orange-500/20 via-amber-500/25 to-transparent rounded-full blur-[120px]" />

      {/* 3. Middle Right Rich Orange Halo */}
      <div className="absolute top-[52%] -right-32 w-[580px] h-[580px] bg-orange-500/20 rounded-full blur-[110px]" />

      {/* 4. Bottom Left Soft Amber/Orange Halo */}
      <div className="absolute bottom-10 left-[8%] w-[550px] h-[550px] bg-gradient-to-t from-orange-400/20 via-amber-400/15 to-transparent rounded-full blur-[100px]" />

      {/* 5. Deep Center Warm Diffusion */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-amber-500/10 rounded-full blur-[140px]" />

      {/* 1. Sausage on Fork - Floating Top Right */}
      <div
        className="absolute top-16 right-[4%] sm:right-[8%] animate-float-1 text-neutral-400/40 drop-shadow-[0_2px_8px_rgba(249,115,22,0.15)]"
        style={{ animationDuration: '9s' }}
      >
        <SausageOnForkIcon className="w-16 h-16 sm:w-20 sm:h-20" />
      </div>

      {/* 2. Steaming Hot Dog - Floating Top Left */}
      <div
        className="absolute top-24 left-[3%] sm:left-[6%] animate-float-2 text-neutral-500/40 drop-shadow-[0_2px_8px_rgba(249,115,22,0.15)]"
        style={{ animationDuration: '11s', animationDelay: '-2s' }}
      >
        <SteamingHotDogIcon className="w-16 h-16 sm:w-20 sm:h-20" />
      </div>

      {/* 3. Layered Burger - Upper Center Right */}
      <div
        className="absolute top-[38%] right-[2%] sm:right-[5%] animate-float-3 text-orange-600/35 drop-shadow-[0_2px_10px_rgba(249,115,22,0.2)]"
        style={{ animationDuration: '10s', animationDelay: '-4s' }}
      >
        <LayeredBurgerIcon className="w-16 h-16 sm:w-20 sm:h-20" />
      </div>

      {/* 4. Taco / Folded Wrap - Middle Left */}
      <div
        className="absolute top-[45%] left-[2%] sm:left-[5%] animate-float-4 text-neutral-500/40 drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
        style={{ animationDuration: '12s', animationDelay: '-1s' }}
      >
        <TacoIcon className="w-16 h-16 sm:w-20 sm:h-20" />
      </div>

      {/* 5. Triple-layer Club Sandwich - Lower Right */}
      <div
        className="absolute bottom-[28%] right-[5%] sm:right-[9%] animate-float-2 text-amber-600/40 drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)]"
        style={{ animationDuration: '13s', animationDelay: '-5s' }}
      >
        <ClubSandwichIcon className="w-16 h-16 sm:w-20 sm:h-20" />
      </div>

      {/* 6. Grilled Steak with Grill Marks - Lower Left */}
      <div
        className="absolute bottom-[24%] left-[4%] sm:left-[8%] animate-float-1 text-neutral-500/40 drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
        style={{ animationDuration: '10s', animationDelay: '-3s' }}
      >
        <GrilledSteakIcon className="w-16 h-16 sm:w-20 sm:h-20" />
      </div>

      {/* 7. Curved Sausage with Tied Ends - Bottom Center Left */}
      <div
        className="absolute bottom-8 left-[18%] sm:left-[22%] animate-float-3 text-orange-500/35"
        style={{ animationDuration: '14s', animationDelay: '-6s' }}
      >
        <CurvedSausageIcon className="w-14 h-14 sm:w-16 sm:h-16" />
      </div>

      {/* 8. Hot Dog with Diagonal Grill Marks & Steam - Bottom Center Right */}
      <div
        className="absolute bottom-10 right-[16%] sm:right-[20%] animate-float-4 text-neutral-500/40"
        style={{ animationDuration: '11s', animationDelay: '-2s' }}
      >
        <HotDogGrillIcon className="w-14 h-14 sm:w-16 sm:h-16" />
      </div>

      {/* 9. Classic Cheeseburger - Subtle Deep Background Accent */}
      <div
        className="absolute top-[20%] left-[20%] animate-float-1 text-orange-500/25 filter blur-[0.5px]"
        style={{ animationDuration: '15s', animationDelay: '-7s' }}
      >
        <ClassicCheeseburgerIcon className="w-12 h-12 sm:w-14 sm:h-14" />
      </div>
    </div>
  );
};
