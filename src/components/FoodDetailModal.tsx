import React, { useState } from 'react';
import { FoodItem } from '../types';
import { X, Plus, Minus, Heart, Phone, ShoppingBag, Check } from 'lucide-react';
import { formatPrice, toPersianDigits } from '../utils/formatters';
import { DigikalaPrice } from './DigikalaPrice';

interface FoodDetailModalProps {
  food: FoodItem | null;
  onClose: () => void;
  quantityInCart: number;
  onAddToCart: (food: FoodItem, count?: number, note?: string) => void;
  onRemoveFromCart: (foodId: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (foodId: number) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  food,
  onClose,
  quantityInCart,
  onAddToCart,
  onRemoveFromCart,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!food) return null;

  const [orderCount, setOrderCount] = useState<number>(quantityInCart > 0 ? quantityInCart : 1);
  const [note, setNote] = useState<string>('');
  const [imgError, setImgError] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const mainImage = food.images[0] || 'https://api.rhinomenu.com/members/images/fftfq6yb/oizooh.png';
  const isLogoPlaceholder = mainImage.includes('oizooh.png');

  const handleApplyOrder = () => {
    onAddToCart(food, orderCount, note);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-700/60 text-neutral-300 hover:text-white flex items-center justify-center transition"
          aria-label="بستن پنجره"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(food.id)}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-700/60 text-neutral-300 hover:text-white flex items-center justify-center transition"
          aria-label="علاقه‌مندی"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-neutral-300'}`} />
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-56 sm:h-64 bg-neutral-950 flex items-center justify-center overflow-hidden">
          <img
            src={imgError ? 'https://api.rhinomenu.com/members/images/fftfq6yb/oizooh.png' : mainImage}
            alt={food.title}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className={`w-full h-full ${
              isLogoPlaceholder ? 'object-contain p-8' : 'object-cover'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-medium">
                {food.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-neutral-100 mt-1.5">
                {food.title}
              </h2>
            </div>

            {/* Price display */}
            <div className="text-left">
              <DigikalaPrice
                price={food.numericPrice}
                size="lg"
                theme="amber"
                align="left"
              />
            </div>
          </div>

          {/* Details / Ingredients */}
          <div className="bg-neutral-800/60 rounded-2xl p-4 border border-neutral-800">
            <h4 className="text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <span>ترکیبات و مشخصات غذا</span>
            </h4>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {food.details || 'تهیه شده از تازه‌ترین و باکیفیت‌ترین مواد اولیه، پخت روز با فرمول اصیل عمورضا.'}
            </p>
          </div>

          {/* Order custom note (optional) */}
          {food.numericPrice > 0 && (
            <div>
              <label htmlFor="item-note" className="block text-xs font-medium text-neutral-400 mb-1.5">
                توضیحات و یادداشت برای این غذا (اختیاری):
              </label>
              <input
                id="item-note"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="مثال: بدون پیاز، سس فرانسوی اضافه، پخت برشته‌تر..."
                className="w-full px-3.5 py-2.5 bg-neutral-800/80 border border-neutral-700 focus:border-amber-500 rounded-xl text-xs text-neutral-200 placeholder-neutral-500 outline-none transition"
              />
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-neutral-950/90 border-t border-neutral-800 flex items-center justify-between gap-3">
          {food.numericPrice > 0 ? (
            <>
              {/* Counter */}
              <div className="flex items-center gap-3 bg-neutral-800 border border-neutral-700 rounded-2xl p-1.5">
                <button
                  onClick={() => setOrderCount(Math.max(1, orderCount - 1))}
                  className="w-8 h-8 rounded-xl bg-neutral-700 hover:bg-neutral-600 text-white flex items-center justify-center transition active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-extrabold text-amber-400 text-base min-w-[24px] text-center">
                  {toPersianDigits(orderCount)}
                </span>
                <button
                  onClick={() => setOrderCount(orderCount + 1)}
                  className="w-8 h-8 rounded-xl bg-neutral-700 hover:bg-neutral-600 text-white flex items-center justify-center transition active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleApplyOrder}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm transition-all shadow-lg active:scale-98 ${
                  addedSuccess
                    ? 'bg-emerald-500 text-neutral-950'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 shadow-amber-500/20'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>به سفارش اضافه شد!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      افزودن به فاکتور ({formatPrice(food.numericPrice * orderCount)})
                    </span>
                  </>
                )}
              </button>
            </>
          ) : (
            <a
              href="tel:02166222321"
              className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-2xl text-sm font-bold transition"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>تماس با رستوران جهت سفارش و قیمت روز</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
