import React, { useState } from 'react';
import { FoodItem } from '../types';
import { Plus, Minus, Heart, Sparkles, Phone, Eye } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';
import { DigikalaPrice } from './DigikalaPrice';

interface FoodCardProps {
  food: FoodItem;
  quantityInCart: number;
  onAddToCart: (food: FoodItem) => void;
  onRemoveFromCart: (foodId: number) => void;
  onOpenDetails: (food: FoodItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (foodId: number) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  food,
  quantityInCart,
  onAddToCart,
  onRemoveFromCart,
  onOpenDetails,
  isFavorite,
  onToggleFavorite,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const mainImage = food.images[0] || 'https://api.rhinomenu.com/members/images/fftfq6yb/oizooh.png';
  const isLogoPlaceholder = mainImage.includes('oizooh.png');

  return (
    <div
      id={`food-card-${food.id}`}
      className="group relative bg-neutral-900/90 rounded-3xl border border-neutral-800/80 hover:border-neutral-700/80 shadow-lg hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Food Image Container */}
      <div
        className="relative w-full aspect-[16/11] bg-neutral-800/70 overflow-hidden cursor-pointer"
        onClick={() => onOpenDetails(food)}
      >
        <img
          src={imgError ? 'https://api.rhinomenu.com/members/images/fftfq6yb/oizooh.png' : mainImage}
          alt={food.title}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
          draggable={false}
          className={`w-full h-full select-none pointer-events-none ${
            isLogoPlaceholder ? 'object-contain p-6 bg-neutral-950/60' : 'object-cover'
          } transition-transform duration-500 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-40'
          }`}
          loading="lazy"
        />

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/30 pointer-events-none" />

        {/* Category Pill on image */}
        <span className="absolute bottom-2.5 right-2.5 bg-neutral-950/80 backdrop-blur-md text-neutral-300 text-[11px] font-medium px-2.5 py-1 rounded-xl border border-neutral-800">
          {food.category}
        </span>

        {/* Quick view button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <span className="flex items-center gap-1.5 bg-neutral-900/90 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-xl border border-amber-500/40 shadow-md">
            <Eye className="w-3.5 h-3.5" />
            مشاهده جزئیات
          </span>
        </div>

        {/* Badges: Special */}
        {food.isSpecial && (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-gradient-to-r from-amber-600 to-amber-500 text-neutral-950 text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-md">
            <Sparkles className="w-3 h-3" />
            <span>ویژه</span>
          </div>
        )}

        {/* Favorite button */}
        <button
          id={`fav-btn-${food.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(food.id);
          }}
          className="absolute top-2.5 left-2.5 p-2 rounded-full bg-neutral-950/70 backdrop-blur-md border border-neutral-700/60 text-neutral-300 hover:text-white transition-transform active:scale-90"
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-neutral-300 hover:text-rose-400'
            }`}
          />
        </button>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3
              onClick={() => onOpenDetails(food)}
              className="text-base sm:text-lg font-bold text-neutral-100 group-hover:text-amber-400 transition-colors cursor-pointer"
            >
              {food.title}
            </h3>
          </div>

          {food.details ? (
            <p className="text-xs text-neutral-400 leading-relaxed mt-1 line-clamp-2">
              {food.details}
            </p>
          ) : (
            <p className="text-xs text-neutral-600 mt-1 italic">
              تهیه شده با مواد اولیه درجه یک و تازه
            </p>
          )}
        </div>

        {/* Price & Action Area */}
        <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-2">
          <div>
            <DigikalaPrice
              price={food.numericPrice}
              size="md"
              theme="amber"
            />
          </div>

          {/* Cart Controls */}
          {food.numericPrice > 0 ? (
            quantityInCart > 0 ? (
              <div className="flex items-center gap-2 bg-neutral-800 border border-amber-500/40 rounded-2xl p-1 shadow-sm">
                <button
                  id={`remove-item-${food.id}`}
                  onClick={() => onRemoveFromCart(food.id)}
                  className="w-7 h-7 rounded-xl bg-neutral-700/80 hover:bg-neutral-700 text-white flex items-center justify-center transition active:scale-90"
                  aria-label="کاهش تعداد"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-amber-400 text-sm min-w-[20px] text-center">
                  {toPersianDigits(quantityInCart)}
                </span>
                <button
                  id={`add-item-${food.id}`}
                  onClick={() => onAddToCart(food)}
                  className="w-7 h-7 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center justify-center font-bold transition active:scale-90"
                  aria-label="افزایش تعداد"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id={`add-cart-btn-${food.id}`}
                onClick={() => onAddToCart(food)}
                className="flex items-center gap-1.5 bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200 border border-neutral-700 hover:border-amber-500 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all active:scale-95 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>افزودن</span>
              </button>
            )
          ) : (
            <a
              href="tel:02166222321"
              className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-2.5 py-1.5 rounded-2xl border border-neutral-700 transition"
            >
              استعلام
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
