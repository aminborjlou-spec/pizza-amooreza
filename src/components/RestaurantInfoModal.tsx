import React from 'react';
import { X, Phone, MapPin, Clock, ExternalLink, ShieldCheck, HeartHandshake, Compass, Copy } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';

interface RestaurantInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyPhone: () => void;
}

export const RestaurantInfoModal: React.FC<RestaurantInfoModalProps> = ({ isOpen, onClose, onCopyPhone }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-neutral-800 p-1 border border-amber-500/40 overflow-hidden">
              <img
                src={STORE_INFO.logo}
                alt={STORE_INFO.name}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-black text-neutral-100 text-base">{STORE_INFO.name}</h3>
              <p className="text-xs text-amber-400">پیتزا و فست فود اصیل</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition"
            aria-label="بستن"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs sm:text-sm">
          {/* About box */}
          <div className="bg-neutral-800/60 p-4 rounded-2xl border border-neutral-800 leading-relaxed text-neutral-300">
            <div className="font-bold text-amber-400 text-sm mb-1.5 flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4" />
              <span>درباره پیتزا عمورضا</span>
            </div>
            {STORE_INFO.tagline}. استفاده از گوشت تازه راسته و فیله مرغ مرینیت شده، سس‌های اختصاصی و مواد اولیه باکیفیت و تازه، ویژگی بارز تمام آیتم‌های پیتزا عمورضاست.
          </div>

          {/* Contact Details */}
          <div className="space-y-2.5">
            {/* Phone */}
            <div className="flex items-center justify-between p-3 bg-neutral-850 rounded-2xl border border-neutral-800">
              <div className="flex items-center gap-2 text-neutral-300">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>تلفن سفارشات:</span>
              </div>
              <button
                onClick={onCopyPhone}
                className="flex items-center gap-2 font-bold text-amber-400 hover:text-amber-300 text-sm bg-neutral-800/90 hover:bg-neutral-800 px-3 py-1.5 rounded-xl border border-neutral-750 transition cursor-pointer group"
                title="کلیک برای کپی شماره تلفن"
              >
                <span dir="ltr" className="font-mono tracking-wider">
                  {STORE_INFO.phone}
                </span>
                <Copy className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
              </button>
            </div>

            {/* Working Hours */}
            <div className="flex items-center justify-between p-3 bg-neutral-850 rounded-2xl border border-neutral-800">
              <div className="flex items-center gap-2 text-neutral-300">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>ساعات کاری:</span>
              </div>
              <span className="font-medium text-neutral-200">
                {STORE_INFO.workingHours}
              </span>
            </div>

            {/* Address */}
            <div className="p-3 bg-neutral-850 rounded-2xl border border-neutral-800 space-y-2">
              <div className="flex items-start gap-2 text-neutral-300">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-neutral-200">آدرس شعبه:</span>
                  <span className="text-neutral-400 text-xs mt-0.5 block">
                    {STORE_INFO.address}
                  </span>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="pt-2 border-t border-neutral-800 flex gap-2">
                <a
                  href={STORE_INFO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-semibold border border-neutral-700 transition"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>مسیریابی با گوگل مپ</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Quality Guarantee badge */}
          <div className="flex items-center gap-2 text-[11px] text-neutral-400 bg-neutral-950/60 p-3 rounded-2xl border border-neutral-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>تضمین سلامت، مواد اولیه روزانه و رعایت کامل استانداردهای بهداشتی پخت</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800">
          <a
            href={`tel:${STORE_INFO.phoneRaw}`}
            onClick={onCopyPhone}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition"
          >
            <Phone className="w-4 h-4" />
            <span>تماس تلفنی با پیتزا عمورضا</span>
            <span dir="ltr" className="text-[11px] opacity-80 font-mono">({STORE_INFO.phone})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
