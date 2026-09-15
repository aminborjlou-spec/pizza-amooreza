import React, { useState } from 'react';
import { FoodItem } from '../types';
import { Plus, Minus, Heart, Sparkles, Phone } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';
import { DigikalaPrice } from './DigikalaPrice';

interface FoodListItemProps {
  food: FoodItem;
  quantityInCart: number;
  onAddToCart: (food: FoodItem) => void;
  onRemoveFromCart: (foodId: number) => void;
  onOpenDetails: (food: FoodItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (foodId: number) => void;
}

export const FoodListItem: React.FC<FoodListItemProps> = ({
  food,
  quantityInCart,
  onAddToCart,
  onRemoveFromCart,
  onOpenDetails,
  isFavorite,
  onToggleFavorite,
}) => {
  const [imgError, setImgError] = useState(false);
  const mainImage = food.images[0] || 'https://api.rhinomenu.com/members/images/fftfq6yb/oizooh.png';
  const isLogoPlaceholder = mainImage.includes('oizooh.png');

  return (
    <div
      id={`food-list-item-${food.id}`}
      className="group bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800/80 hover:border-neutral-700/80 rounded-2xl p-3 flex items-center gap-3 sm:gap-4 transition-all"
    >
      {/* Thumbnail */}
      <div
        onClick={() => onOpenDetails(food)}
        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-neutral-800 shrink-0 cursor-pointer border border-neutral-700/50"
      >
        <img
          src={imgError ? 'https://api.rhinomenu.com/members/images/fftfq6yb/oizooh.png' : mainImage}
          alt={food.title}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
          className={`w-full h-full ${
            isLogoPlaceholder ? 'object-contain p-2 bg-neutral-950/60' : 'object-cover'
          } group-hover:scale-105 transition-transform duration-300`}
          loading="lazy"
        />
        {food.isSpecial && (
          <span className="absolute top-1 right-1 bg-amber-500 text-neutral-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow">
            ویژه
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0" onClick={() => onOpenDetails(food)}>
        <div className="flex items-center gap-2">
          <h3 className="text-sm sm:text-base font-bold text-neutral-100 group-hover:text-amber-400 transition-colors truncate cursor-pointer">
            {food.title}
          </h3>
          <span className="text-[10px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-md shrink-0">
            {food.category}
          </span>
        </div>

        <p className="text-xs text-neutral-400 mt-1 line-clamp-1 sm:line-clamp-2">
          {food.details || 'تهیه شده از مواد اولیه درجه یک'}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <DigikalaPrice
            price={food.numericPrice}
            size="sm"
            theme="amber"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <button
          onClick={() => onToggleFavorite(food.id)}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-neutral-400'
            }`}
          />
        </button>

        {food.numericPrice > 0 && (
          quantityInCart > 0 ? (
            <div className="flex items-center gap-1.5 bg-neutral-800 border border-amber-500/40 rounded-xl p-0.5">
              <button
                onClick={() => onRemoveFromCart(food.id)}
                className="w-6 h-6 rounded-lg bg-neutral-700 text-white flex items-center justify-center transition active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-bold text-amber-400 text-xs min-w-[16px] text-center">
                {toPersianDigits(quantityInCart)}
              </span>
              <button
                onClick={() => onAddToCart(food)}
                className="w-6 h-6 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-bold transition active:scale-90"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(food)}
              className="w-8 h-8 rounded-xl bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200 border border-neutral-700 hover:border-amber-500 flex items-center justify-center transition active:scale-90"
              title="افزودن به سفارش"
            >
              <Plus className="w-4 h-4" />
            </button>
          )
        )}
      </div>
    </div>
  );
};
