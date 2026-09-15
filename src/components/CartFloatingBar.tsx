import React from 'react';
import { ShoppingBag, ChevronLeft } from 'lucide-react';
import { CartItem } from '../types';
import { toPersianDigits } from '../utils/formatters';
import { DigikalaPrice } from './DigikalaPrice';

interface CartFloatingBarProps {
  cart: CartItem[];
  onOpenCart: () => void;
}

export const CartFloatingBar: React.FC<CartFloatingBarProps> = ({ cart, onOpenCart }) => {
  if (cart.length === 0) return null;

  const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.food.numericPrice * i.quantity, 0);

  return (
    <div className="fixed bottom-4 inset-x-4 max-w-xl mx-auto z-40 animate-slideUp">
      <div
        id="cart-floating-bar"
        onClick={onOpenCart}
        className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-neutral-950 p-3 sm:p-3.5 rounded-2xl shadow-2xl shadow-amber-500/30 flex items-center justify-between cursor-pointer border border-amber-300/40 hover:scale-[1.01] active:scale-98 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-neutral-950 text-amber-400 flex items-center justify-center shadow">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-neutral-950">
              {toPersianDigits(totalCount)}
            </span>
          </div>

          <div>
            <div className="font-extrabold text-sm sm:text-base leading-tight text-neutral-950">
              مشاهده و تکمیل سفارش
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-bold text-neutral-900">جمع کل:</span>
              <DigikalaPrice
                price={totalPrice}
                size="sm"
                theme="white"
                className="[&_span]:!text-neutral-950"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-neutral-950 text-amber-400 px-3 py-2 rounded-xl text-xs font-bold shadow-sm">
          <span>ثبت سفارش</span>
          <ChevronLeft className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

