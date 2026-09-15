/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { CATEGORIES, FOOD_ITEMS, STORE_INFO } from './data/menuData';
import { FoodItem, CartItem } from './types';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { SearchBar } from './components/SearchBar';
import { FoodCard } from './components/FoodCard';
import { FoodDetailModal } from './components/FoodDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { RestaurantInfoModal } from './components/RestaurantInfoModal';
import { CartFloatingBar } from './components/CartFloatingBar';
import { MinimalFastFoodBackground } from './components/MinimalFastFoodBackground';
import { SlidingMenuRow } from './components/SlidingMenuRow';
import { Phone, MapPin, Clock, Heart, Search, Utensils, Sparkles, ChevronLeft, Copy, Check } from 'lucide-react';
import { toPersianDigits } from './utils/formatters';
import { copyToClipboard } from './utils/clipboard';

export default function App() {
  // Category selection
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [filterSpecial, setFilterSpecial] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Toast notification for copy action
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyPhone = async () => {
    await copyToClipboard(STORE_INFO.phoneRaw);
    setToastMessage(`شماره تماس ${STORE_INFO.phone} با موفقیت کپی شد!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Favorites state
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('amooreza_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('amooreza_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [selectedFoodForDetail, setSelectedFoodForDetail] = useState<FoodItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem('amooreza_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('amooreza_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Toggle favorite
  const handleToggleFavorite = (foodId: number) => {
    setFavorites((prev) =>
      prev.includes(foodId) ? prev.filter((id) => id !== foodId) : [...prev, foodId]
    );
  };

  // Cart actions
  const handleAddToCart = (food: FoodItem, count = 1, notes?: string) => {
    if (food.numericPrice <= 0) return;
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.food.id === food.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + count,
          notes: notes !== undefined ? notes : updated[existingIndex].notes,
        };
        return updated;
      }
      return [...prev, { food, quantity: count, notes }];
    });
  };

  const handleUpdateQuantity = (foodId: number, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.food.id === foodId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (foodId: number) => {
    setCart((prev) => prev.filter((item) => item.food.id !== foodId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Cart quantity helper for a specific food
  const getCartQuantity = (foodId: number) => {
    const found = cart.find((item) => item.food.id === foodId);
    return found ? found.quantity : 0;
  };

  // Compute counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    FOOD_ITEMS.forEach((f) => {
      counts[f.category] = (counts[f.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter and Sort foods
  const filteredFoods = useMemo(() => {
    let result = [...FOOD_ITEMS];

    // Filter by Category
    if (selectedCategory) {
      result = result.filter((f) => f.category === selectedCategory);
    }

    // Filter by Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.details.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
      );
    }

    // Filter by Specials
    if (filterSpecial) {
      result = result.filter((f) => f.isSpecial);
    }

    // Filter by Favorites
    if (showFavoritesOnly) {
      result = result.filter((f) => favorites.includes(f.id));
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => {
        if (a.numericPrice === 0) return 1;
        if (b.numericPrice === 0) return -1;
        return a.numericPrice - b.numericPrice;
      });
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.numericPrice - a.numericPrice);
    }

    return result;
  }, [selectedCategory, searchQuery, filterSpecial, showFavoritesOnly, favorites, sortBy]);

  // Group foods by category when "تمام منو" is selected (no single category selected) and no search/filter active
  const isGroupedView = !selectedCategory && !searchQuery.trim() && !filterSpecial && !showFavoritesOnly && sortBy === 'default';

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col font-sans relative selection:bg-amber-500/30 selection:text-amber-950 overflow-x-hidden">
      {/* Minimalist Line-Art Fast-Food Animated Background (From User Reference Image) */}
      <MinimalFastFoodBackground />

      {/* Header */}
      <Header
        onOpenInfo={() => setIsInfoOpen(true)}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly((prev) => !prev)}
        favoritesCount={favorites.length}
        onCopyPhone={handleCopyPhone}
      />

      {/* Category Navigation Bar */}
      <CategoryNav
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (showFavoritesOnly) setShowFavoritesOnly(false);
        }}
        categoryCounts={categoryCounts}
        totalCount={FOOD_ITEMS.length}
      />

      {/* Search and Filters */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        filterSpecial={filterSpecial}
        onToggleFilterSpecial={() => setFilterSpecial((prev) => !prev)}
        resultCount={filteredFoods.length}
      />

      {/* Active Category Header Banner (when a single category is selected) */}
      {selectedCategory && (
        <div className="max-w-5xl mx-auto px-4 mt-3 w-full">
          <div className="bg-gradient-to-r from-neutral-900 via-neutral-850 to-neutral-900 border border-neutral-800 rounded-2xl p-3 sm:p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              {(() => {
                const currentCat = CATEGORIES.find((c) => c.name === selectedCategory);
                return (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-neutral-800/90 border border-amber-500/40 p-1 shrink-0 flex items-center justify-center shadow-inner">
                    <img
                      src={currentCat?.icon}
                      alt={selectedCategory}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                );
              })()}
              <div>
                <h2 className="text-base sm:text-lg font-black text-neutral-100 flex items-center gap-2">
                  <span>{selectedCategory}</span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    {toPersianDigits(categoryCounts[selectedCategory] || 0)} آیتم
                  </span>
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  پخت روز با گوشت تازه و مواد اولیه درجه یک
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-1 transition"
            >
              <span>مشاهده تمام دسته‌ها</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Foods Content */}
      <main className="max-w-5xl mx-auto px-4 py-4 w-full flex-1 pb-24">
        {filteredFoods.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900/60 rounded-3xl border border-neutral-800/80 p-8 my-6">
            <div className="w-16 h-16 rounded-full bg-neutral-800 text-neutral-500 mx-auto flex items-center justify-center mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-neutral-200 mb-1">
              موردی با مشخصات درخواستی پیدا نشد
            </h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-5">
              {showFavoritesOnly
                ? 'هنوز غذایی به لیست علاقه‌مندی‌های خود اضافه نکرده‌اید. با کلیک بر روی آیکون قلب، غذاهای مورد نظرتان را ذخیره کنید.'
                : 'لطفاً عبارت دیگری را جستجو کنید یا فیلترها را حذف نمایید.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                setFilterSpecial(false);
                setShowFavoritesOnly(false);
                setSortBy('default');
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold rounded-xl transition shadow-md"
            >
              نمایش همه منو
            </button>
          </div>
        ) : isGroupedView ? (
          /* Grouped by categories - Exclusively Sliding Rows */
          <div className="space-y-8">
            {CATEGORIES.map((cat) => {
              const catFoods = FOOD_ITEMS.filter((f) => f.category === cat.name);
              if (catFoods.length === 0) return null;

              return (
                <SlidingMenuRow
                  key={cat.id}
                  id={`category-section-${cat.id}`}
                  title={cat.name}
                  icon={cat.icon}
                  badge={catFoods.length}
                  foods={catFoods}
                  onSelectCategory={() => setSelectedCategory(cat.name)}
                  getCartQuantity={getCartQuantity}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                  onOpenDetails={setSelectedFoodForDetail}
                  isFavorite={(id) => favorites.includes(id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              );
            })}
          </div>
        ) : (
          /* Filtered or Selected Category View - Exclusively Sliding Carousel */
          <div className="space-y-6">
            <SlidingMenuRow
              title={
                selectedCategory
                  ? `منوی کشویی ${selectedCategory}`
                  : searchQuery
                  ? `نتایج جستجو (${filteredFoods.length} مورد)`
                  : showFavoritesOnly
                  ? 'غذاهای برگزیده شما'
                  : 'لیست غذاها'
              }
              badge={filteredFoods.length}
              foods={filteredFoods}
              getCartQuantity={getCartQuantity}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onOpenDetails={setSelectedFoodForDetail}
              isFavorite={(id) => favorites.includes(id)}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        )}
      </main>

      {/* Floating Bottom Cart Bar */}
      <CartFloatingBar cart={cart} onOpenCart={() => setIsCartOpen(true)} />

      {/* Food Detail Modal */}
      <FoodDetailModal
        food={selectedFoodForDetail}
        onClose={() => setSelectedFoodForDetail(null)}
        quantityInCart={selectedFoodForDetail ? getCartQuantity(selectedFoodForDetail.id) : 0}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        isFavorite={selectedFoodForDetail ? favorites.includes(selectedFoodForDetail.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Restaurant Info & Map Modal */}
      <RestaurantInfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        onCopyPhone={handleCopyPhone}
      />

      {/* Footer */}
      <footer className="bg-neutral-900 border-t border-neutral-800 text-neutral-400 text-xs py-8 px-4 mt-auto z-10 relative">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-right">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 p-1 border border-neutral-700 shrink-0">
                <img
                  src={STORE_INFO.logo}
                  alt={STORE_INFO.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-black text-neutral-100 text-sm block">
                  {STORE_INFO.name}
                </span>
                <span className="text-neutral-500 text-[11px]">
                  {STORE_INFO.tagline}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyPhone}
                className="flex items-center gap-1.5 px-3 py-2 bg-neutral-800 hover:bg-neutral-750 text-neutral-200 rounded-xl border border-neutral-700 transition cursor-pointer group"
                title="کلیک برای کپی شماره تلفن"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span dir="ltr" className="font-mono font-bold tracking-wider">{STORE_INFO.phone}</span>
                <Copy className="w-3 h-3 text-neutral-400 group-hover:text-amber-400 transition" />
              </button>
              <a
                href={STORE_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-neutral-800 hover:bg-neutral-750 text-neutral-200 rounded-xl border border-neutral-700 transition"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>مسیریابی روی نقشه</span>
              </a>
            </div>
          </div>

          <div className="border-t border-neutral-800/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-400 text-[11px]">
            <span>آدرس: {STORE_INFO.address}</span>
            <span>پیتزا عمورضا © تمام حقوق محفوظ است</span>
          </div>

          {/* Designer Credit */}
          <div className="pt-2 border-t border-neutral-800/50 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-800/90 border border-neutral-700/80 text-neutral-300 text-xs sm:text-sm font-medium shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>طراحی شده توسط <strong className="text-amber-400 font-bold">محمد امین برجلو</strong></span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Copy Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-900/95 text-white border border-amber-500/60 px-4 py-2.5 rounded-2xl shadow-2xl shadow-black/70 flex items-center gap-3 text-xs sm:text-sm font-bold backdrop-blur-md animate-bounce-short">
          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </span>
          <span>{toastMessage}</span>
          <a
            href={`tel:${STORE_INFO.phoneRaw}`}
            className="mr-2 px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition flex items-center gap-1 shrink-0"
          >
            <Phone className="w-3 h-3" />
            <span>تماس</span>
          </a>
        </div>
      )}
    </div>
  );
}
