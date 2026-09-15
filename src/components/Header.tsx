import React from 'react';
import { Phone, MapPin, Clock, Info, Heart, Copy } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';
import { toPersianDigits } from '../utils/formatters';

interface HeaderProps {
  onOpenInfo: () => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  favoritesCount: number;
  onCopyPhone: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenInfo,
  showFavoritesOnly,
  onToggleFavorites,
  favoritesCount,
  onCopyPhone,
}) => {
  return (
    <header className="relative bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800/80 sticky top-0 z-30">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-neutral-950 text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2 shadow-sm">
        <span className="inline-block w-2 h-2 rounded-full bg-neutral-950 animate-pulse"></span>
        <button
          onClick={onCopyPhone}
          className="inline-flex items-center gap-1.5 cursor-pointer hover:underline transition group"
          title="کلیک برای کپی شماره تلفن"
        >
          <span>سفارش تلفنی مستقیم:</span>
          <span
            dir="ltr"
            className="font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-neutral-950/20 group-hover:bg-neutral-950/30 transition inline-block"
          >
            {STORE_INFO.phone}
          </span>
          <Copy className="w-3 h-3 opacity-70 group-hover:opacity-100" />
          <span>— ارسال سریع در محدوده</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Brand title */}
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer" onClick={onOpenInfo}>
              <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-neutral-800 p-1 border-2 border-amber-500/60 shadow-lg shadow-amber-500/10 overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <img
                  src={STORE_INFO.logo}
                  alt={STORE_INFO.name}
                  className="w-full h-full object-contain"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // fallback if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-neutral-900 shadow" title="پذیرش سفارش فعال"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-hasti text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 drop-shadow-[0_2px_10px_rgba(245,158,11,0.25)] flex items-center gap-2">
                  <span>{STORE_INFO.name}</span>
                </h1>
                <span className="bg-amber-500/15 text-amber-400 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30 whitespace-nowrap">
                  شعبه اصلی
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5 hidden sm:block">
                {STORE_INFO.tagline}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-neutral-400 mt-1">
                <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  سفارش‌گیری فعال
                </span>
                <span className="text-neutral-600">•</span>
                <span className="inline-flex items-center gap-1 text-neutral-300">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {STORE_INFO.workingHours}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action controls */}
          <div className="flex items-center gap-2">
            {/* Call button with copy interaction */}
            <button
              id="call-store-btn"
              onClick={onCopyPhone}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 px-3 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
              title="کلیک برای کپی شماره تلفن و ثبت سفارش"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden md:inline">تماس:</span>
              <span dir="ltr" className="font-mono font-bold tracking-wider">
                {STORE_INFO.phone}
              </span>
              <Copy className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* Favorites filter toggle */}
            <button
              id="toggle-favorites-btn"
              onClick={onToggleFavorites}
              className={`relative p-2 rounded-xl border transition-all ${
                showFavoritesOnly
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/50'
                  : 'bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 border-neutral-700/60'
              }`}
              title="علاقه‌مندی‌ها"
            >
              <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {toPersianDigits(favoritesCount)}
                </span>
              )}
            </button>

            {/* Info modal button */}
            <button
              id="open-info-btn"
              onClick={onOpenInfo}
              className="p-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 border border-neutral-700/60 transition-colors"
              title="اطلاعات رستوران و آدرس"
            >
              <Info className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
