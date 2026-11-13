import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import {
  LARDER_PRODUCTS,
  DELIVERY_ZONES,
  type LarderProduct,
  type ProductCategory,
  type DietaryTag,
} from '../data/larderData';
import type { AppRoute } from '../types/routes';
import { ProductCard } from '../components/ProductCard';
import type { CartItem } from '../components/CartDrawer';

interface CatalogPageProps {
  mode: 'provisions' | 'pantry';
  cart: CartItem[];
  onNavigate: (route: AppRoute) => void;
  onAddToCart: (product: LarderProduct, quantity?: number) => void;
  onUpdateQuantity: (productId: string, nextQty: number) => void;
}

const DIETARY_FILTERS: DietaryTag[] = [
  'Vegetarian',
  'Gluten-Free',
  'Organic',
  'Dairy-Free',
];

export function CatalogPage({
  mode,
  cart,
  onNavigate,
  onAddToCart,
  onUpdateQuantity,
}: CatalogPageProps) {
  const [activeDietary, setActiveDietary] = useState<DietaryTag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [includeAllCategories, setIncludeAllCategories] = useState(false);

  const defaultCategory: ProductCategory =
    mode === 'provisions' ? 'Chef Provisions' : 'Artisanal Pantry';

  const toggleDietary = (tag: DietaryTag) => {
    setActiveDietary((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag],
    );
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return LARDER_PRODUCTS.filter((item) => {
      if (!includeAllCategories && item.category !== defaultCategory) {
        return false;
      }
      if (
        activeDietary.length > 0 &&
        !activeDietary.every((tag) => item.dietary.includes(tag))
      ) {
        return false;
      }
      if (query) {
        const haystack =
          `${item.title} ${item.category} ${item.description} ${item.originLabel}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [includeAllCategories, defaultCategory, activeDietary, searchQuery]);

  const getItemQuantity = (productId: string) =>
    cart.find((item) => item.product.id === productId)?.quantity ?? 0;

  const pageMeta =
    mode === 'provisions'
      ? {
          kicker: 'Ready-to-Heat Chef Provisions',
          title: 'Kitchen suppers & bronze-die pastas',
          description:
            'Prepared fresh every Thursday and Friday in our 12 Eziobodo kitchen. Packed chilled in glass and terracotta for effortless 15-minute finishing at home.',
          otherLabel: 'Browse Shelf-Stable Pantry →',
          otherRoute: { page: 'pantry' } as AppRoute,
        }
      : {
          kicker: 'Single-Estate Artisanal Pantry',
          title: 'Oils, raw honeys & cellar staples',
          description:
            'Small-lot pantry essentials bottled directly at partner groves, mountain apiaries, and family mills across Europe and California.',
          otherLabel: 'Browse Chilled Chef Provisions →',
          otherRoute: { page: 'provisions' } as AppRoute,
        };

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
        {/* Breadcrumb + Editorial Page Header */}
        <div className="space-y-6 pb-8 border-b border-[#E5DFD7]">
          <nav aria-label="Breadcrumb" className="text-[13px] text-[#63615C] flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'home' })}
              className="hover:text-[#1E1E1C] cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#1E1E1C] font-medium">
              {mode === 'provisions' ? 'Chef Provisions' : 'Artisanal Pantry'}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="lg:col-span-8 space-y-3">
              <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
                {pageMeta.kicker}
              </p>
              <h1
                className="font-editorial text-4xl sm:text-[48px] font-semibold text-[#1E1E1C] leading-[1.12] tracking-[-0.02em]"
                style={{ textWrap: 'balance' }}
              >
                {pageMeta.title}
              </h1>
              <p className="text-[16px] text-[#56423D] leading-relaxed max-w-2xl">
                {pageMeta.description}
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                type="button"
                onClick={() => {
                  setIncludeAllCategories(false);
                  setActiveDietary([]);
                  setSearchQuery('');
                  onNavigate(pageMeta.otherRoute);
                }}
                className="text-[14px] font-semibold text-[#9E3D24] hover:text-[#7E260F] underline underline-offset-4 cursor-pointer whitespace-nowrap"
              >
                {pageMeta.otherLabel}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIncludeAllCategories((prev) => !prev)}
              aria-pressed={includeAllCategories}
              className={`px-4 py-2 rounded-lg text-[13px] font-semibold border transition-colors whitespace-nowrap cursor-pointer ${
                includeAllCategories
                  ? 'bg-[#1E1E1C] border-[#1E1E1C] text-[#FBF9F5]'
                  : 'bg-[#F3EFEA] border-[#E5DFD7] text-[#1E1E1C] hover:border-[#D1C7BC]'
              }`}
            >
              {includeAllCategories ? 'Showing Full Larder' : `Only ${defaultCategory}`}
            </button>

            {DIETARY_FILTERS.map((tag) => {
              const selected = activeDietary.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleDietary(tag)}
                  className={`px-3.5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.06em] border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selected
                      ? 'bg-[#4A5A3F] border-[#4A5A3F] text-[#FBF9F5]'
                      : 'bg-[#F3EFEA] border-[#E5DFD7] text-[#4A5A3F] hover:border-[#4A5A3F]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <label htmlFor="catalog-search" className="sr-only">
              Search catalog
            </label>
            <Search
              className="w-4 h-4 text-[#63615C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="catalog-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by ingredient..."
              className="w-full min-h-[44px] rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] pl-10 pr-4 py-2 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24]"
            />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 px-6 rounded-2xl bg-[#F3EFEA] border border-[#E5DFD7] text-center space-y-4">
            <p className="font-editorial text-2xl text-[#1E1E1C]">
              No matching {mode === 'provisions' ? 'provisions' : 'pantry goods'}
            </p>
            <p className="text-[14px] text-[#56423D] max-w-md mx-auto">
              Clear your dietary filters or toggle &ldquo;Showing Full Larder&rdquo; to explore all weekly releases.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveDietary([]);
                setSearchQuery('');
                setIncludeAllCategories(true);
              }}
              className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[14px] font-semibold transition-colors cursor-pointer"
            >
              Show Full Larder
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                inBagQty={getItemQuantity(product.id)}
                onOpenProduct={(id) => onNavigate({ page: 'product', productId: id })}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
        )}

        {/* Cold-Chain & Pickup Schedule Reference */}
        <div className="pt-8 border-t border-[#E5DFD7] grid grid-cols-1 md:grid-cols-3 gap-6">
          {DELIVERY_ZONES.map((zone) => (
            <div
              key={zone.zone}
              className="p-5 rounded-xl bg-[#F3EFEA] border border-[#E5DFD7] space-y-1.5"
            >
              <p className="text-[14px] font-semibold text-[#1E1E1C]">{zone.zone}</p>
              <p className="text-[13px] text-[#56423D]">{zone.schedule}</p>
              <p className="text-[12px] font-medium text-[#4A5A3F]">{zone.cutoff}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
