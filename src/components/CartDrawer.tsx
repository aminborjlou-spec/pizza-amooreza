import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, Phone, Copy, Check, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';
import { formatPrice, formatPriceKilo, toPersianDigits } from '../utils/formatters';
import { DigikalaPrice } from './DigikalaPrice';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (foodId: number, delta: number) => void;
  onRemoveItem: (foodId: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'dinein'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.food.numericPrice * item.quantity,
    0
  );

  const generateInvoiceText = () => {
    let text = `🍕 سفارش جدید - ${STORE_INFO.name}\n`;
    text += `━━━━━━━━━━━━━━━━━━\n`;
    text += `نوع سفارش: ${orderType === 'delivery' ? 'ارسال با پیک / بیرون‌بر' : 'میل در سالن'}\n`;
    if (customerName) text += `نام مشتری: ${customerName}\n`;
    if (customerPhone) text += `شماره تماس: ${customerPhone}\n`;
    if (customerAddress && orderType === 'delivery') text += `آدرس: ${customerAddress}\n`;
    text += `━━━━━━━━━━━━━━━━━━\n`;
    text += `اقلام سفارش:\n`;

    cart.forEach((item, idx) => {
      text += `${idx + 1}. ${item.food.title} (${item.food.category}) × ${item.quantity} = ${formatPrice(item.food.numericPrice * item.quantity)}\n`;
      if (item.notes) {
        text += `   یادداشت: ${item.notes}\n`;
      }
    });

    text += `━━━━━━━━━━━━━━━━━━\n`;
    text += `جمع کل: ${formatPrice(totalPrice)} ${formatPriceKilo(totalPrice)}\n`;
    text += `تلفن رستوران: ${STORE_INFO.phone}\n`;
    text += `آدرس: ${STORE_INFO.address}\n`;
    return text;
  };

  const handleCopyInvoice = () => {
    const text = generateInvoiceText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectCall = () => {
    window.location.href = `tel:${STORE_INFO.phoneRaw}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-neutral-900 border-r border-neutral-800 shadow-2xl flex flex-col h-full">
          {/* Header */}
          <div className="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-100 text-base">پیش‌فاکتور سفارش</h3>
                <span className="text-xs text-neutral-400">
                  {toPersianDigits(totalItemsCount)} آیتم انتخاب شده
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded-lg hover:bg-rose-500/10 transition"
                  title="خالی کردن سبد"
                >
                  حذف همه
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition"
                aria-label="بستن"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cart Content */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-3xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-500 mb-4">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h4 className="text-base font-bold text-neutral-200 mb-1">
                سبد سفارش شما خالی است
              </h4>
              <p className="text-xs text-neutral-400 max-w-xs mb-6">
                از بین پیتزاها، برگرها، ساندویچ‌های پرملات و پیش‌غذاهای منو آیتم‌های مورد علاقه خود را انتخاب کنید.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-2xl text-xs transition"
              >
                مشاهده منوی غذاها
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Order items list */}
              <div className="space-y-2.5">
                {cart.map((item) => (
                  <div
                    key={item.food.id}
                    className="bg-neutral-850 border border-neutral-800 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-neutral-100 text-sm truncate">
                          {item.food.title}
                        </span>
                        <span className="text-[10px] text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded">
                          {item.food.category}
                        </span>
                      </div>
                      <div className="mt-1">
                        <DigikalaPrice
                          price={item.food.numericPrice * item.quantity}
                          size="sm"
                          theme="amber"
                        />
                      </div>
                      {item.notes && (
                        <div className="text-[11px] text-neutral-400 bg-neutral-800/60 p-1 rounded mt-1">
                          یادداشت: {item.notes}
                        </div>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-neutral-800 rounded-xl p-1 shrink-0 border border-neutral-700">
                      <button
                        onClick={() => onUpdateQuantity(item.food.id, -1)}
                        className="w-7 h-7 rounded-lg bg-neutral-700 text-white flex items-center justify-center hover:bg-neutral-600 transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-amber-400 text-xs min-w-[18px] text-center">
                        {toPersianDigits(item.quantity)}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.food.id, 1)}
                        className="w-7 h-7 rounded-lg bg-amber-500 text-neutral-950 font-bold flex items-center justify-center hover:bg-amber-400 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveItem(item.food.id)}
                      className="text-neutral-500 hover:text-rose-400 p-1 transition"
                      title="حذف آیتم"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Options */}
              <div className="bg-neutral-850 border border-neutral-800 rounded-2xl p-3.5 space-y-3">
                <div className="text-xs font-bold text-neutral-300">نحوه تحویل سفارش:</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      orderType === 'delivery'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/60'
                        : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                    }`}
                  >
                    ارسال پیک / بیرون‌بر
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('dinein')}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      orderType === 'dinein'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/60'
                        : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                    }`}
                  >
                    میل در سالن / حضوری
                  </button>
                </div>

                {/* Customer fields */}
                <div className="space-y-2 pt-1 text-xs">
                  <input
                    type="text"
                    placeholder="نام و نام خانوادگی شما (اختیاری)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 focus:border-amber-500 rounded-xl text-neutral-200 outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="شماره تماس جهت هماهنگی"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 focus:border-amber-500 rounded-xl text-neutral-200 outline-none text-left dir-ltr"
                  />
                  {orderType === 'delivery' && (
                    <textarea
                      rows={2}
                      placeholder="آدرس دقیق و طبقه/واحد جهت ارسال پیک"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 focus:border-amber-500 rounded-xl text-neutral-200 outline-none resize-none"
                    />
                  )}
                </div>
              </div>

              {/* Order total card */}
              <div className="bg-gradient-to-br from-neutral-800 to-neutral-850 border border-amber-500/30 rounded-2xl p-4 shadow-md">
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
                  <span>تعداد اقلام:</span>
                  <span>{toPersianDigits(totalItemsCount)} عدد</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-neutral-200 mb-2">
                  <span>هزینه بسته‌بندی:</span>
                  <span className="text-emerald-400">رایگان</span>
                </div>
                <div className="border-t border-neutral-700 pt-2 flex items-baseline justify-between">
                  <span className="font-extrabold text-neutral-100 text-sm">مبلغ کل فاکتور:</span>
                  <div className="text-left">
                    <DigikalaPrice
                      price={totalPrice}
                      size="lg"
                      theme="amber"
                      align="left"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Checkout actions */}
          {cart.length > 0 && (
            <div className="p-4 bg-neutral-950 border-t border-neutral-800 space-y-2">
              <button
                onClick={handleDirectCall}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition"
              >
                <Phone className="w-4 h-4" />
                <span>تماس فوری برای ثبت سفارش ({STORE_INFO.phone})</span>
              </button>

              <button
                onClick={handleCopyInvoice}
                className="w-full py-2.5 px-4 rounded-2xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-bold flex items-center justify-center gap-2 border border-neutral-700 transition"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">متن فاکتور با موفقیت کپی شد!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-400" />
                    <span>کپی پیش‌فاکتور برای ارسال در پیامک / پیام‌رسان</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
