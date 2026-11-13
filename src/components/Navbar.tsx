import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import type { AppRoute } from '../types/routes';

interface NavbarProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_ITEMS: { label: string; route: AppRoute }[] = [
  { label: 'Provisions', route: { page: 'provisions' } },
  { label: 'Pantry', route: { page: 'pantry' } },
  { label: 'Catering', route: { page: 'catering' } },
  { label: 'Provenance', route: { page: 'provenance' } },
];

export function Navbar({
  currentRoute,
  onNavigate,
  cartCount,
  onOpenCart,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = (route: AppRoute) => {
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-[#E5DFD7]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleLinkClick({ page: 'home' })}
          className="font-editorial text-xl sm:text-2xl font-semibold tracking-tight text-[#1E1E1C] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24] rounded-sm"
        >
          Maison Larder
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute.page === item.route.page;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleLinkClick(item.route)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-[14px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] after:bg-[#9E3D24] after:origin-left after:transition-transform after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24] rounded-sm ${
                  isActive
                    ? 'text-[#1E1E1C] after:scale-x-100'
                    : 'text-[#56423D] hover:text-[#1E1E1C] after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action (+ mobile menu drawer toggle) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open larder bag, ${cartCount} items`}
            className="inline-flex items-center justify-center gap-2 min-h-[40px] px-4 py-2 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[13px] font-semibold tracking-wide transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9E3D24]"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
            <span>Larder Bag</span>
            {cartCount > 0 && (
              <span className="tabular-nums pl-1 border-l border-[#FBF9F5]/30">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E5DFD7] bg-[#F3EFEA] text-[#1E1E1C] hover:border-[#D1C7BC] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-[#FBF9F5] border-t border-[#E5DFD7] px-5 py-6 flex flex-col justify-between overflow-y-auto">
          <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-[#E5DFD7]">
            {[
              { label: 'Home', route: { page: 'home' } as AppRoute },
              ...NAV_ITEMS,
              { label: 'Contact & Hours', route: { page: 'contact' } as AppRoute },
            ].map((item) => {
              const isActive = currentRoute.page === item.route.page;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleLinkClick(item.route)}
                  className={`py-4 font-editorial text-2xl font-medium transition-colors min-h-[44px] flex items-center justify-between text-left cursor-pointer ${
                    isActive
                      ? 'text-[#9E3D24]'
                      : 'text-[#1E1E1C] hover:text-[#9E3D24]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-sm font-sans text-[#63615C]">→</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-[#E5DFD7] space-y-4">
            <p className="text-[13px] text-[#56423D] leading-relaxed">
              42 Rue des Martyrs · Kitchen &amp; Larder Counter open Tuesday through Sunday, 10:00–19:00.
            </p>
            <button
              type="button"
              onClick={() => handleLinkClick({ page: 'catering' })}
              className="w-full inline-flex items-center justify-center min-h-[44px] px-5 py-3 rounded-lg border border-[#4A5A3F] text-[#4A5A3F] text-[14px] font-semibold hover:bg-[#4A5A3F]/8 transition-colors cursor-pointer"
            >
              Inquire for Private Catering
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
