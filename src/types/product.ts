export interface ProductVariant {
  name: string;
  options: string[];
}

export interface Product {
  id: number ;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  description: string;
  brand: string;
  title: string;
  thumbnail: string;
  variants?: ProductVariant[];
  selectedVariant: {
    name: string;
    value: string;
  };
  stock?: number;
  reviews: { reviewerName: string; comment: string; rating: number; date: string }[];
  availabilityStatus: string;
  discountPercentage: number;
}

// src/types/cart.ts
export interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  selectedVariant?: {
    name: string;
    value: string;
  };
  images: string[];
  thumbnail: string;
}

export interface Cart {
  items: CartItemType[];
  discount: number;
  promoCode?: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  orderId?: string | number;
  trackingNumber?: string | number,
  deliveryDate?:  string
}