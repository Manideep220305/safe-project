// ─── Product ──────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  image: string;
  badge?: string; // e.g. "BESTSELLER"
  variant: 'basic' | 'advanced' | 'premium';
}

// ─── Cart ─────────────────────────────────────────────────────
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// ─── Wishlist ─────────────────────────────────────────────────
export interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  image: string;
}

// ─── Order ────────────────────────────────────────────────────
export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  address: ShippingAddress;
}

// ─── Shipping ─────────────────────────────────────────────────
export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

// ─── Contact ──────────────────────────────────────────────────
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── Static product data (used until API is connected) ────────
export const PRODUCTS: Product[] = [
  {
    id: 'basic',
    name: 'Protect Pendant Basic',
    price: 1999,
    variant: 'basic',
    description: 'Essential safety at your fingertips. Lightweight, always-on SOS pendant for everyday peace of mind.',
    features: ['SOS Alert', '24-hour battery', 'Lightweight design'],
    image: '/products/basic.png',
  },
  {
    id: 'advanced',
    name: 'Protect Pendant Advanced',
    price: 2799,
    variant: 'advanced',
    badge: 'BESTSELLER',
    description: 'Our most popular model. GPS-powered protection that works completely without a smartphone.',
    features: ['SOS + GPS Tracking', 'Works without phone', '36-hour battery'],
    image: '/products/advanced.png',
  },
  {
    id: 'premium',
    name: 'Protect Pendant Premium',
    price: 3499,
    variant: 'premium',
    description: 'The complete safety system. Fall detection, microphone recording, and two days of battery life.',
    features: ['SOS + GPS + Fall Detection', 'Microphone recording', '48-hour battery'],
    image: '/products/premium.png',
  },
];
