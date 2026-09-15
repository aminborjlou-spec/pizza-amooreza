import React, { useRef } from 'react';
import { Category } from '../types';
import { Utensils, ChevronRight, ChevronLeft } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  totalCount,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -180 : 180;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[86px] sm:top-[98px] z-20 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 py-2.5 px-2 sm:px-4">
      <div className="max-w-5xl mx-auto relative flex items-center">
        {/* Scroll Left Button */}
        <button
          onClick={() => scroll('left')}
          className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full bg-neutral-800/80 text-neutral-300 hover:text-white hover:bg-neutral-700 transition absolute left-0 z-10 shadow-md"
          aria-label="اسکرول چپ"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Categories Bar */}
        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full px-1 sm:px-8 py-1 touch-pan-x touch-pan-y"
        >
          {/* "All" Category Pill */}
          <button
            id="cat-all-btn"
            onClick={() => onSelectCategory(null)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl whitespace-nowrap text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
              selectedCategory === null
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/25 font-bold scale-[1.02]'
                : 'bg-neutral-900/90 text-neutral-300 hover:bg-neutral-800/80 hover:text-white border border-neutral-800'
            }`}
          >
            <span className={`w-6 h-6 rounded-xl flex items-center justify-center ${selectedCategory === null ? 'bg-neutral-950/15' : 'bg-neutral-800 text-amber-400'}`}>
              <Utensils className="w-3.5 h-3.5" />
            </span>
            <span>تمام منو</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                selectedCategory === null
                  ? 'bg-neutral-950/20 text-neutral-950'
                  : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              {toPersianDigits(totalCount)}
            </span>
          </button>

          {/* Specific Categories */}
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            const count = categoryCounts[cat.name] || 0;

            return (
              <button
                key={cat.id}
                id={`cat-${cat.id}-btn`}
                onClick={() => onSelectCategory(cat.name)}
                className={`flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-2xl whitespace-nowrap text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/25 font-bold scale-[1.02]'
                    : 'bg-neutral-900/90 text-neutral-300 hover:bg-neutral-800/80 hover:text-white border border-neutral-800'
                }`}
              >
                <div className="w-6 h-6 rounded-lg overflow-hidden bg-neutral-800/90 flex items-center justify-center shrink-0 border border-neutral-700/60 p-0.5">
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-neutral-950/20 text-neutral-950 font-bold'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {toPersianDigits(count)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => scroll('right')}
          className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full bg-neutral-800/80 text-neutral-300 hover:text-white hover:bg-neutral-700 transition absolute right-0 z-10 shadow-md"
          aria-label="اسکرول راست"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
