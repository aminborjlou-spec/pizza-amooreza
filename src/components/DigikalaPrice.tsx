import React from 'react';
import { toPersianDigits } from '../utils/formatters';

interface DigikalaPriceProps {
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'amber' | 'white' | 'emerald';
  align?: 'right' | 'left' | 'center' | 'between';
  className?: string;
  showZeroAsFree?: boolean;
}

export const DigikalaPrice: React.FC<DigikalaPriceProps> = ({
  price,
  oldPrice,
  discountPercent,
  size = 'md',
  theme = 'amber',
  align = 'right',
  className = '',
  showZeroAsFree = false,
}) => {
  if (price <= 0) {
    if (showZeroAsFree) {
      return (
        <span className={`text-xs font-bold text-emerald-400 ${className}`}>
          رایگان
        </span>
      );
    }
    return (
      <span className={`text-xs font-medium text-neutral-400 ${className}`}>
        تماس بگیرید
      </span>
    );
  }

  // Format with thousand separator commas in English digits first, then to Persian digits
  const formattedNumber = toPersianDigits(price.toLocaleString('en-US'));

  const sizeClasses = {
    xs: {
      number: 'text-xs font-bold',
      unit: 'text-[9px]',
      discount: 'text-[9px] px-1 py-0.5',
      oldPrice: 'text-[10px]',
    },
    sm: {
      number: 'text-sm font-extrabold',
      unit: 'text-[10px]',
      discount: 'text-[10px] px-1.5 py-0.5',
      oldPrice: 'text-xs',
    },
    md: {
      number: 'text-base sm:text-lg font-black',
      unit: 'text-[11px] sm:text-xs',
      discount: 'text-[11px] px-1.5 py-0.5',
      oldPrice: 'text-xs',
    },
    lg: {
      number: 'text-xl sm:text-2xl font-black',
      unit: 'text-xs sm:text-sm',
      discount: 'text-xs px-2 py-0.5',
      oldPrice: 'text-sm',
    },
    xl: {
      number: 'text-2xl sm:text-3xl font-black',
      unit: 'text-sm sm:text-base',
      discount: 'text-sm px-2.5 py-1',
      oldPrice: 'text-base',
    },
  }[size];

  const themeColors = {
    amber: 'text-amber-400',
    white: 'text-neutral-100',
    emerald: 'text-emerald-400',
  }[theme];

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Old price and Discount badge (Digikala style) */}
      {(oldPrice && oldPrice > price) || discountPercent ? (
        <div className="flex items-center gap-1.5 mb-0.5 justify-start">
          {discountPercent ? (
            <span
              className={`bg-rose-500 text-white font-black rounded-full leading-none flex items-center justify-center ${sizeClasses.discount}`}
            >
              {toPersianDigits(discountPercent)}٪
            </span>
          ) : null}
          {oldPrice && oldPrice > price ? (
            <span
              className={`text-neutral-500 line-through font-medium tracking-tight ${sizeClasses.oldPrice}`}
            >
              {toPersianDigits(oldPrice.toLocaleString('en-US'))}
            </span>
          ) : null}
        </div>
      ) : null}

      {/* Main Digikala Price Row: Number + تومان */}
      <div className={`inline-flex items-baseline gap-1.5 font-sans leading-none dir-rtl ${
        align === 'left' ? 'justify-end' : align === 'center' ? 'justify-center' : 'justify-start'
      }`}>
        {/* Persian Digikala Digits */}
        <span
          className={`tracking-tight font-black select-all ${themeColors} ${sizeClasses.number}`}
          style={{ letterSpacing: '-0.03em' }}
        >
          {formattedNumber}
        </span>

        {/* Currency Unit: تومان */}
        <span
          className={`text-neutral-400 font-semibold select-none ${sizeClasses.unit}`}
        >
          تومان
        </span>
      </div>
    </div>
  );
};
