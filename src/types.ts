export interface Category {
  id: string;
  name: string;
  icon: string;
  itemCount?: number;
}

export interface FoodItem {
  id: number;
  title: string;
  category: string;
  images: string[];
  details: string;
  price: string; // raw string like "1380", "700", "0", "000"
  numericPrice: number; // calculated numeric price in Tomans, e.g. 1380 -> 1380000
  videoUrl?: string;
  isAvailable: boolean;
  tags?: string[];
  isSpecial?: boolean;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  logo: string;
  phone: string;
  phoneRaw: string;
  address: string;
  city: string;
  mapUrl: string;
  workingHours: string;
  instagram?: string;
}

export interface CartItem {
  food: FoodItem;
  quantity: number;
  notes?: string;
}
