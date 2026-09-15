import React, { useRef, useState, useEffect } from 'react';
import { FoodItem } from '../types';
import { FoodCard } from './FoodCard';
import { ChevronRight, ChevronLeft, Layers } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface SlidingMenuRowProps {
  title?: string;
  icon?: string;
  badge?: string | number;
  foods: FoodItem[];
  onSelectCategory?: () => void;
  getCartQuantity: (id: string) => number;
  onAddToCart: (food: FoodItem) => void;
  onRemoveFromCart: (foodId: string) => void;
  onOpenDetails: (food: FoodItem) => void;
  isFavorite: (foodId: string) => boolean;
  onToggleFavorite: (foodId: string) => void;
  id?: string;
}

export const SlidingMenuRow: React.FC<SlidingMenuRowProps> = ({
  title,
  icon,
  badge,
  foods,
  onSelectCategory,
  getCartQuantity,
  onAddToCart,
  onRemoveFromCart,
  onOpenDetails,
  isFavorite,
  onToggleFavorite,
  id,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(true);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll positions
  const checkScroll = () => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    // In RTL, scrollLeft can be negative or positive depending on engine
    const maxScroll = el.scrollWidth - el.clientWidth;
    const current = Math.abs(el.scrollLeft);
    setCanScrollRight(current > 10);
    setCanScrollLeft(current < maxScroll - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = sliderRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [foods]);

  // Slide left/right smoothly
  const slide = (direction: 'next' | 'prev') => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    // For RTL layout: Next = scroll to the left (negative in RTL or positive in standard)
    // Moving items leftwards moves forward in RTL
    const step = 320;
    // Determine sign: in RTL, scrolling towards left means decrementing scroll
    const scrollAmount = direction === 'next' ? -step : step;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  if (foods.length === 0) return null;

  return (
    <section id={id} className="space-y-3 relative group">
      {/* Row Header */}
      {title && (
        <div className="flex items-center justify-between bg-neutral-900/90 backdrop-blur-md border border-neutral-800/90 rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 mb-3 shadow-md">
          <div className="flex items-center gap-2.5">
            {icon ? (
              <div className="w-8 h-8 rounded-xl overflow-hidden bg-neutral-800/90 border border-neutral-700/60 p-1 shrink-0 flex items-center justify-center">
                <img
                  src={icon}
                  alt={title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Layers className="w-4 h-4" />
              </div>
            )}
            <h2 className="text-sm sm:text-base font-black text-neutral-100 flex items-center gap-2">
              <span>{title}</span>
              {badge !== undefined && (
                <span className="text-[10px] sm:text-[11px] text-amber-400 bg-amber-500/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-amber-500/20 font-bold">
                  {typeof badge === 'number' ? toPersianDigits(badge) : badge} آیتم
                </span>
              )}
            </h2>
          </div>

          {/* Controls: Slider navigation arrows and category view */}
          <div className="flex items-center gap-1.5">
            {onSelectCategory && (
              <button
                onClick={onSelectCategory}
                className="text-xs text-neutral-400 hover:text-amber-400 font-medium ml-2 hidden sm:flex items-center gap-1 transition-colors"
              >
                <span>مشاهده دسته‌بندی</span>
              </button>
            )}

            {/* Slide Right button (Previous items in RTL) */}
            <button
              onClick={() => slide('prev')}
              className="w-8 h-8 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 active:bg-amber-500 active:text-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-300 flex items-center justify-center transition-all shadow-sm"
              title="آیتم‌های قبلی"
              aria-label="آیتم‌های قبلی"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Slide Left button (Next items in RTL) */}
            <button
              onClick={() => slide('next')}
              className="w-8 h-8 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 active:bg-amber-500 active:text-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-300 flex items-center justify-center transition-all shadow-sm"
              title="آیتم‌های بعدی"
              aria-label="آیتم‌های بعدی"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Sliding Row Container with Smooth Right-to-Left entrance animation */}
      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none snap-x snap-mandatory scroll-smooth touch-pan-x touch-pan-y"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {foods.map((food, index) => (
            <div
              key={food.id}
              className="snap-start shrink-0 w-[275px] sm:w-[295px] md:w-[315px] animate-slide-rtl"
              style={{
                animationDelay: `${Math.min(index * 65, 500)}ms`,
              }}
            >
              <FoodCard
                food={food}
                quantityInCart={getCartQuantity(food.id)}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
                onOpenDetails={onOpenDetails}
                isFavorite={isFavorite(food.id)}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
