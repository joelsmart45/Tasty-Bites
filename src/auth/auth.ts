import type { LarderProduct, CateringTier } from '../data/larderData';

export type { LarderProduct, CateringTier };
export type UserRole = 'customer' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Session {
  user: AuthUser;
  token: string;
}

const STORAGE_KEY = 'ml_session';

const DEMO_USERS: AuthUser[] = [
  {
    id: 'cust-1',
    name: 'Valerie Customer',
    email: 'customer@maisonlarder.com',
    role: 'customer',
  },
  {
    id: 'admin-1',
    name: 'Admin Manager',
    email: 'admin@maisonlarder.com',
    role: 'admin',
  },
];

const DEMO_PASSWORD = 'password123';

export function loadSession(): Session | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as Session;
    if (!session || !session.user || !session.token) return null;
    return session;
  } catch {
    return null;
  }
}

export function saveSession(session: Session): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function authenticate(
  email: string,
  password: string,
): { user: AuthUser; token: string } | null {
  const user = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;
  if (password !== DEMO_PASSWORD) return null;
  const token = `ml_${user.id}_${Date.now()}`;
  return { user, token };
}

export interface StoredProduct extends LarderProduct {}
export interface StoredCateringTier extends CateringTier {}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: { productId: string; productTitle: string; quantity: number; price: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: string;
}

const PRODUCTS_KEY = 'ml_products';
const CATERING_KEY = 'ml_catering';
const ORDERS_KEY = 'ml_orders';

export function getStoredProducts(): LarderProduct[] {
  try {
    const raw = window.localStorage.getItem(PRODUCTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LarderProduct[];
  } catch {
    return [];
  }
}

export function saveStoredProducts(products: LarderProduct[]): void {
  window.localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function getStoredCateringTiers(): CateringTier[] {
  try {
    const raw = window.localStorage.getItem(CATERING_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CateringTier[];
  } catch {
    return [];
  }
}

export function saveStoredCateringTiers(tiers: CateringTier[]): void {
  window.localStorage.setItem(CATERING_KEY, JSON.stringify(tiers));
}

export function getStoredOrders(): Order[] {
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

export function saveStoredOrders(orders: Order[]): void {
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function seedDemoData(): void {
  if (window.localStorage.getItem(PRODUCTS_KEY)) return;
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify([]));
}
