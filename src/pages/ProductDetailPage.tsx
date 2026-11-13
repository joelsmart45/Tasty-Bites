import { useState, useEffect } from 'react';
import { Minus, Plus, ArrowLeft } from 'lucide-react';
import { LARDER_PRODUCTS, type LarderProduct } from '../data/larderData';
import type { AppRoute } from '../types/routes';
import { ResilientImage } from '../components/ResilientImage';
import { ProductCard } from '../components/ProductCard';
import type { CartItem } from '../components/CartDrawer';

interface ProductDetailPageProps {
  productId: string;
  cart: CartItem[];
  onNavigate: (route: AppRoute) => void;
  onAddToCart: (product: LarderProduct, quantity?: number) => void;
  onUpdateQuantity: (productId: string, nextQty: number) => void;
}

export function ProductDetailPage({
  productId,
  cart,
  onNavigate,
  onAddToCart,
  onUpdateQuantity,
}: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);

  const product =
    LARDER_PRODUCTS.find((item) => item.id === productId) ?? LARDER_PRODUCTS[0];
  const pairings = LARDER_PRODUCTS.filter((item) => item.id !== product.id).slice(0, 3);

  useEffect(() => {
    setQuantity(1);
  }, [productId]);

  const getItemQuantity = (id: string) =>
    cart.find((item) => item.product.id === id)?.quantity ?? 0;

  return (
    <div className="py-8 sm:py-14 pb-24 md:pb-16">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 space-y-14">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="text-[13px] text-[#63615C] flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'home' })}
              className="hover:text-[#1E1E1C] cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              onClick={() =>
                onNavigate({
                  page: product.category === 'Chef Provisions' ? 'provisions' : 'pantry',
                })
              }
              className="hover:text-[#1E1E1C] cursor-pointer"
            >
              {product.category}
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#1E1E1C] font-medium truncate max-w-[24ch] sm:max-w-none">
              {product.title}
            </span>
          </nav>

          <button
            type="button"
            onClick={() =>
              onNavigate({
                page: product.category === 'Chef Provisions' ? 'provisions' : 'pantry',
              })
            }
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#56423D] hover:text-[#1E1E1C] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {product.category}</span>
          </button>
        </div>

        {/* Contiguous Sticky Left Gallery + Sticky Right Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-6">
            <div className="overflow-hidden rounded-2xl border border-[#E5DFD7] bg-[#F3EFEA] aspect-[4/3]">
              <ResilientImage
                src={product.image}
                alt={product.imageAlt}
                titleFallback={product.title}
                priority
                className="w-full h-full object-cover"
              />
            </div>

            {/* Kitchen Preparation & Serving Box */}
            <div className="p-6 rounded-2xl bg-[#F3EFEA] border border-[#E5DFD7] space-y-2">
              <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
                Kitchen Preparation &amp; Serving Notes
              </p>
              <p className="text-[15px] text-[#1E1E1C] leading-relaxed">
                {product.heatingNotes}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="space-y-3 pb-6 border-b border-[#E5DFD7]">
              <div className="flex flex-wrap items-center gap-x-2 text-[12px] font-medium text-[#4A5A3F]">
                <span className="uppercase tracking-[0.05em] font-semibold">
                  {product.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{product.availabilityNote}</span>
              </div>

              <h1
                className="font-editorial text-3xl sm:text-[38px] font-semibold text-[#1E1E1C] leading-[1.15] tracking-[-0.015em]"
                style={{ textWrap: 'balance' }}
              >
                {product.title}
              </h1>

              <div className="flex items-baseline justify-between gap-4 pt-1">
                <span className="text-2xl font-semibold text-[#9E3D24] tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-[13px] text-[#56423D]">
                  {product.servingSpec} · {product.prepTime}
                </span>
              </div>

              <p className="text-[15px] text-[#56423D] leading-relaxed pt-2">
                {product.description}
              </p>

              {product.dietary.length > 0 && (
                <p className="text-[13px] font-medium text-[#4A5A3F]">
                  Dietary profile: {product.dietary.join(' · ')}
                </p>
              )}
            </div>

            {/* Purchase Controls */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center rounded-full border border-[#E5DFD7] bg-[#F3EFEA] px-1.5 py-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-10 h-10 inline-flex items-center justify-center rounded-full text-[#1E1E1C] hover:bg-[#E5DFD7]/60 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-[15px] font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(12, q + 1))}
                    aria-label="Increase quantity"
                    className="w-10 h-10 inline-flex items-center justify-center rounded-full text-[#1E1E1C] hover:bg-[#E5DFD7]/60 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onAddToCart(product, quantity)}
                  className="flex-1 min-h-[46px] px-7 py-3 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[14px] font-semibold transition-colors cursor-pointer tabular-nums whitespace-nowrap"
                >
                  Add to Bag — ${(product.price * quantity).toFixed(2)}
                </button>
              </div>
              <p className="text-[12px] text-[#63615C]">
                Complimentary cold-chain delivery on orders over $120 · Glass &amp; stoneware vessels.
              </p>
            </div>

            {/* Ingredient & Provenance Breakdown */}
            <div className="pt-4">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#56423D] mb-2">
                Ingredient &amp; Estate Provenance
              </h2>
              <ul className="divide-y divide-[#E5DFD7] border-y border-[#E5DFD7]">
                {product.ingredients.map((item) => (
                  <li
                    key={item.name}
                    className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
                  >
                    <span className="text-[14px] font-semibold text-[#1E1E1C]">
                      {item.name}
                    </span>
                    <span className="text-[13px] text-[#63615C]">{item.origin}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Complementary Larder Pairings */}
        <section className="pt-12 border-t border-[#E5DFD7] space-y-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-editorial text-2xl sm:text-[30px] font-medium text-[#1E1E1C]">
              Pairs seamlessly on the table
            </h2>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'provisions' })}
              className="text-[14px] font-semibold text-[#9E3D24] hover:underline cursor-pointer"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {pairings.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                inBagQty={getItemQuantity(item.id)}
                onOpenProduct={(id) => onNavigate({ page: 'product', productId: id })}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Compact Mobile Bottom Sticky Buy Bar (< md only, <= 64px height) */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-30 bg-[#FBF9F5]/95 backdrop-blur-sm border-t border-[#E5DFD7] px-5 py-2.5 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[#1E1E1C] truncate">
            {product.title}
          </p>
          <p className="text-[13px] font-semibold text-[#9E3D24] tabular-nums">
            ${(product.price * quantity).toFixed(2)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onAddToCart(product, quantity)}
          className="min-h-[42px] px-5 py-2 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[13px] font-semibold whitespace-nowrap shrink-0 cursor-pointer"
        >
          + Add ({quantity})
        </button>
      </div>
    </div>
  );
}
