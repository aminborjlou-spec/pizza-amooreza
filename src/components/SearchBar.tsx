import React from 'react';
import { Search, X, Sparkles, ArrowDownUp } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'default' | 'price-asc' | 'price-desc';
  onSortChange: (sort: 'default' | 'price-asc' | 'price-desc') => void;
  filterSpecial: boolean;
  onToggleFilterSpecial: () => void;
  resultCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  filterSpecial,
  onToggleFilterSpecial,
  resultCount,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-3 pb-1">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Search input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-neutral-400">
            <Search className="w-4 h-4 text-amber-500" />
          </div>
          <input
            id="menu-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="جستجوی نام غذا یا ترکیبات (مانند گوشت، فیله مرغ، پپرونی، برگر...)"
            className="w-full pl-9 pr-10 py-2.5 bg-neutral-900/90 border border-neutral-800 focus:border-amber-500 rounded-2xl text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400 hover:text-white"
              aria-label="پاک کردن جستجو"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filters / Sorters */}
        <div className="flex items-center gap-2">
          {/* Special / Chef filter */}
          <button
            id="filter-special-btn"
            onClick={onToggleFilterSpecial}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all shrink-0 cursor-pointer border ${
              filterSpecial
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>ویژه و سرآشپز</span>
          </button>

          {/* Sort Selector */}
          <div className="relative shrink-0">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="appearance-none bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs rounded-2xl py-2.5 pr-3 pl-7 outline-none cursor-pointer hover:border-neutral-700 transition"
            >
              <option value="default">پیش‌فرض منو</option>
              <option value="price-asc">ارزان‌ترین</option>
              <option value="price-desc">گران‌ترین</option>
            </select>
            <ArrowDownUp className="w-3.5 h-3.5 text-neutral-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Info indicator */}
      <div className="flex items-center justify-between text-[11px] text-neutral-400 px-1 mt-2">
        <span>
          نمایش {toPersianDigits(resultCount)} غذا و پیش‌غذا
        </span>
        {searchQuery && (
          <span className="text-amber-400">
            نتایج جستجو برای: «{searchQuery}»
          </span>
        )}
      </div>
    </div>
  );
};
