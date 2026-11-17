/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Check } from 'lucide-react';
import { LARDER_PRODUCTS, type LarderProduct } from './data/larderData';
import {
  parseHashToRoute,
  routeToHash,
  type AppRoute,
} from './types/routes';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { Navbar } from './components/Navbar';
import { CartDrawer, type CartItem } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CateringPage } from './pages/CateringPage';
import { ProvenancePage } from './pages/ProvenancePage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() =>
    parseHashToRoute(window.location.hash),
  );
  const [cart, setCart] = useState<CartItem[]>([
    { product: LARDER_PRODUCTS[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [dispatchEmail, setDispatchEmail] = useState('');
  const [dispatchSubscribed, setDispatchSubscribed] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHashToRoute(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((nextRoute: AppRoute) => {
    const nextHash = routeToHash(nextRoute);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    } else {
      setRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const totalBagCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const handleAddToCart = (product: LarderProduct, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { product, quantity }];
    });
    setToastMessage(`${product.title} added to bag`);
    window.setTimeout(() => {
      setToastMessage((current) =>
        current === `${product.title} added to bag` ? null : current,
      );
    }, 3200);
  };

  const handleUpdateQuantity = (productId: string, nextQty: number) => {
    if (nextQty <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: nextQty } : item,
      ),
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const renderPage = () => {
    switch (route.page) {
      case 'home':
        return (
          <HomePage
            cart={cart}
            onNavigate={navigate}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        );
      case 'provisions':
        return (
          <CatalogPage
            mode="provisions"
            cart={cart}
            onNavigate={navigate}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        );
      case 'pantry':
        return (
          <CatalogPage
            mode="pantry"
            cart={cart}
            onNavigate={navigate}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        );
      case 'product':
        return (
          <ProductDetailPage
            productId={route.productId}
            cart={cart}
            onNavigate={navigate}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        );
      case 'catering':
        return <CateringPage onNavigate={navigate} />;
      case 'provenance':
        return <ProvenancePage onNavigate={navigate} />;
      case 'contact':
        return <ContactPage onNavigate={navigate} />;
      case 'login':
        return <LoginPage onNavigate={navigate} />;
      case 'admin':
        return <AdminPage />;
    }
  };

  return (
    <AuthProvider>
      <div id="top" className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1E1E1C]">
      <Navbar
        currentRoute={route}
        onNavigate={navigate}
        cartCount={totalBagCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">{renderPage()}</main>

      {/* Editorial Footer */}
      <footer className="bg-[#F3EFEA] border-t border-[#E5DFD7] py-12 sm:py-16">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-3">
            <button
              type="button"
              onClick={() => navigate({ page: 'home' })}
              className="font-editorial text-2xl font-semibold text-[#1E1E1C] cursor-pointer text-left"
            >
              Maison Larder
            </button>
            <p className="text-[14px] text-[#56423D] leading-relaxed max-w-xs">
              12 Eziobodo · Kitchen &amp; Pantry Counter open Tuesday–Sunday, 10:00–19:00.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#56423D]">
              Pages
            </p>
            <ul className="space-y-2 text-[14px] text-[#1E1E1C]">
              <li>
                <button
                  type="button"
                  onClick={() => navigate({ page: 'provisions' })}
                  className="hover:text-[#9E3D24] transition-colors cursor-pointer"
                >
                  Chef Provisions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate({ page: 'pantry' })}
                  className="hover:text-[#9E3D24] transition-colors cursor-pointer"
                >
                  Artisanal Pantry
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate({ page: 'catering' })}
                  className="hover:text-[#9E3D24] transition-colors cursor-pointer"
                >
                  Private Catering
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate({ page: 'provenance' })}
                  className="hover:text-[#9E3D24] transition-colors cursor-pointer"
                >
                  Kitchen &amp; Provenance
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate({ page: 'contact' })}
                  className="hover:text-[#9E3D24] transition-colors cursor-pointer"
                >
                  Contact &amp; Counter Hours
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-5 space-y-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#56423D]">
              Weekly Harvest Dispatch
            </p>
            <p className="text-[14px] text-[#56423D]">
              Receive Thursday morning notes when fresh pasta batches and seasonal olive pressings open for reservation.
            </p>

            {dispatchSubscribed ? (
              <div className="inline-flex items-center gap-2 py-2.5 px-4 rounded-lg bg-[#FBF9F5] border border-[#4A5A3F] text-[13px] font-semibold text-[#4A5A3F]">
                <Check className="w-4 h-4" />
                <span>Added {dispatchEmail} to Thursday&apos;s harvest dispatch</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (dispatchEmail.includes('@')) {
                    setDispatchSubscribed(true);
                  }
                }}
                className="flex flex-col sm:flex-row gap-2.5 pt-1"
              >
                <label htmlFor="dispatch-email" className="sr-only">
                  Email for weekly harvest dispatch
                </label>
                <input
                  id="dispatch-email"
                  type="email"
                  required
                  value={dispatchEmail}
                  onChange={(e) => setDispatchEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 min-h-[44px] rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24]"
                />
                <button
                  type="submit"
                  className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[14px] font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  Join Dispatch
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 mt-10 pt-6 border-t border-[#E5DFD7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[12px] text-[#63615C]">
          <span>© 2026 Maison Larder Culinary Collective</span>
          <span>Cold-Chain Local Dispatch · Stoneware &amp; Glass Program</span>
        </div>
      </footer>

      {/* Subtle Add-to-Bag Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-16 md:bottom-4 right-4 z-40 max-w-sm rounded-xl bg-[#1E1E1C] text-[#FBF9F5] px-4 py-3 drawer-shadow flex items-center justify-between gap-4"
        >
          <span className="text-[13px] font-medium truncate">{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setIsCartOpen(true);
            }}
            className="text-[12px] font-semibold text-[#FFB4A2] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
          >
            Open Bag
          </button>
        </div>
      )}

      {/* Slide-Over Larder Bag & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
      />
      </div>
    </AuthProvider>
  );
}

