import { ArrowRight } from 'lucide-react';
import {
  HERO_IMAGE,
  CATERING_HERO_IMAGE,
  LARDER_PRODUCTS,
  PROVENANCE_LEDGER,
  TESTIMONIALS,
  type LarderProduct,
} from '../data/larderData';
import type { AppRoute } from '../types/routes';
import { ResilientImage } from '../components/ResilientImage';
import { ProductCard } from '../components/ProductCard';
import type { CartItem } from '../components/CartDrawer';

interface HomePageProps {
  cart: CartItem[];
  onNavigate: (route: AppRoute) => void;
  onAddToCart: (product: LarderProduct, quantity?: number) => void;
  onUpdateQuantity: (productId: string, nextQty: number) => void;
}

const HERO_PROVENANCE_STRIP = [
  { label: 'Kitchen Cadence', value: 'Prepared Fresh Weekly' },
  { label: 'Regional Cold Chain', value: '48-Hour Insulated Delivery' },
  { label: 'Packaging Standard', value: 'Glass, Linen & Stoneware' },
  { label: 'Harvest Window', value: 'Single-Estate Seasonal Lots' },
];

export function HomePage({
  cart,
  onNavigate,
  onAddToCart,
  onUpdateQuantity,
}: HomePageProps) {
  const featuredGrid = LARDER_PRODUCTS.filter((item) => item.featuredInGrid);
  const supperSpotlight = LARDER_PRODUCTS.find((item) => !item.featuredInGrid);

  const getItemQuantity = (productId: string) =>
    cart.find((item) => item.product.id === productId)?.quantity ?? 0;

  return (
    <>
      {/* Hero Split Showcase */}
      <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#4A5A3F]">
                Artisanal Larder · Chef Provisions · Private Dining
              </p>

              <h1
                className="font-editorial text-[38px] sm:text-[48px] lg:text-[56px] font-semibold text-[#1E1E1C] leading-[1.12] tracking-[-0.02em]"
                style={{ textWrap: 'balance' }}
              >
                A European gourmet larder, cooked for your table
              </h1>

              <p className="text-[16px] sm:text-[18px] text-[#56423D] leading-[1.6] max-w-[46ch]">
                Small-batch pantry staples, ready-to-heat chef suppers, and full-service private banquets sourced directly from regional estates and family mills.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'provisions' })}
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-7 py-3 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[14px] font-semibold transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9E3D24]"
                >
                  <span>Explore Provisions</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'catering' })}
                  className="inline-flex items-center justify-center min-h-[46px] px-6 py-3 rounded-lg border-[1.5px] border-[#4A5A3F] text-[#4A5A3F] hover:bg-[#4A5A3F]/8 text-[14px] font-semibold transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A5A3F]"
                >
                  Plan Private Catering
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="h-full min-h-[240px] sm:min-h-[360px] lg:min-h-[440px] overflow-hidden rounded-2xl border border-[#E5DFD7] bg-[#F3EFEA]">
                <ResilientImage
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  titleFallback="Maison Larder Table"
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Full-Width Provenance Spec Strip */}
          <div className="mt-10 sm:mt-14 pt-6 border-t border-[#E5DFD7] grid grid-cols-2 lg:grid-cols-4 gap-6">
            {HERO_PROVENANCE_STRIP.map((spec) => (
              <div key={spec.label}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#63615C]">
                  {spec.label}
                </p>
                <p className="mt-1 text-[15px] font-semibold text-[#1E1E1C]">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-14 sm:py-20 border-t border-[#E5DFD7] bg-[#FBF9F5]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
                This Week&apos;s Larder Selection
              </p>
              <h2
                className="font-editorial text-3xl sm:text-[40px] font-medium text-[#1E1E1C] leading-[1.18] tracking-[-0.015em]"
                style={{ textWrap: 'balance' }}
              >
                Provisions &amp; artisanal pantry goods
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate({ page: 'provisions' })}
                className="text-[14px] font-semibold text-[#9E3D24] hover:text-[#7E260F] underline underline-offset-4 cursor-pointer whitespace-nowrap"
              >
                All Chef Provisions →
              </button>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'pantry' })}
                className="text-[14px] font-semibold text-[#4A5A3F] hover:text-[#1E1E1C] underline underline-offset-4 cursor-pointer whitespace-nowrap"
              >
                All Pantry Goods →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredGrid.map((product) => (
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

          {/* Weekly Supper Spotlight */}
          {supperSpotlight && (
            <article className="rounded-2xl bg-[#F3EFEA] border border-[#E5DFD7] p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center card-hover-warm">
              <button
                type="button"
                onClick={() =>
                  onNavigate({ page: 'product', productId: supperSpotlight.id })
                }
                aria-label={`Inspect ${supperSpotlight.title}`}
                className="lg:col-span-6 overflow-hidden rounded-xl border border-[#E5DFD7] bg-[#EBE8E4] aspect-[16/9] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24]"
              >
                <ResilientImage
                  src={supperSpotlight.image}
                  alt={supperSpotlight.imageAlt}
                  titleFallback={supperSpotlight.title}
                  className="w-full h-full object-cover"
                />
              </button>

              <div className="lg:col-span-6 space-y-4">
                <div className="flex flex-wrap items-center gap-x-2 text-[12px] font-medium text-[#56423D]">
                  <span className="uppercase tracking-[0.05em] font-semibold text-[#4A5A3F]">
                    {supperSpotlight.availabilityNote}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{supperSpotlight.servingSpec}</span>
                  <span aria-hidden="true">·</span>
                  <span>{supperSpotlight.prepTime}</span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-[28px] font-medium text-[#1E1E1C] leading-snug">
                  {supperSpotlight.title}
                </h3>

                <p className="text-[15px] text-[#56423D] leading-relaxed">
                  {supperSpotlight.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#E5DFD7]">
                  <div>
                    <span className="text-xl font-semibold text-[#1E1E1C] tabular-nums">
                      ${supperSpotlight.price.toFixed(2)}
                    </span>
                    <span className="ml-2 text-[13px] text-[#63615C]">
                      Includes hearth sourdough boule
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate({ page: 'product', productId: supperSpotlight.id })
                      }
                      className="px-3 py-2 text-[13px] font-medium text-[#1E1E1C] underline decoration-[#D1C7BC] underline-offset-4 hover:decoration-[#9E3D24] transition-colors cursor-pointer"
                    >
                      View Product
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddToCart(supperSpotlight, 1)}
                      className="min-h-[44px] px-6 py-2.5 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[14px] font-semibold transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24]"
                    >
                      + Add Supper Box
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* Catering Editorial Preview */}
      <section className="py-16 sm:py-24 border-t border-[#E5DFD7] bg-[#F3EFEA]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-[#E5DFD7] bg-[#EBE8E4]">
            <div className="relative h-full min-h-[280px] sm:min-h-[380px]">
              <ResilientImage
                src={CATERING_HERO_IMAGE.src}
                alt={CATERING_HERO_IMAGE.alt}
                titleFallback="Bespoke Private Dining & Estate Catering"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-[#1E1E1C]/80 via-[#1E1E1C]/35 to-transparent text-[#FBF9F5]">
                <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#FFDDb4]">
                  Private Gatherings · 12 to 90 Guests
                </p>
                <p className="font-editorial text-xl sm:text-2xl font-medium mt-1 max-w-xl">
                  Stoneware platters, beeswax tapers, and seasonal courses cooked at peak harvest.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
              Bespoke Catering Collective
            </p>
            <h2
              className="font-editorial text-3xl sm:text-[40px] font-medium text-[#1E1E1C] leading-[1.18] tracking-[-0.015em]"
              style={{ textWrap: 'balance' }}
            >
              Unfussy, deeply hospitable banquets for private tables
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#56423D] leading-relaxed">
              Explore our three curated banquet tiers—from drop-off stoneware harvest suppers to full-service estate dinners with low-intervention wine pairings.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate({ page: 'catering' })}
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-7 py-3 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[14px] font-semibold transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Explore Banquet Menus</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'contact' })}
                className="text-[14px] font-semibold text-[#1E1E1C] underline decoration-[#D1C7BC] underline-offset-4 hover:decoration-[#9E3D24] cursor-pointer"
              >
                Book a Tasting Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Provenance & Client Proof */}
      <section className="py-16 sm:py-24 border-t border-[#E5DFD7] bg-[#FBF9F5]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="space-y-2">
                <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
                  Kitchen Craft &amp; Sourcing Ledger
                </p>
                <h2
                  className="font-editorial text-3xl sm:text-[36px] font-medium text-[#1E1E1C] leading-[1.18] tracking-[-0.015em]"
                  style={{ textWrap: 'balance' }}
                >
                  Every jar traced to its estate
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'provenance' })}
                className="text-[14px] font-semibold text-[#9E3D24] hover:text-[#7E260F] underline underline-offset-4 cursor-pointer whitespace-nowrap"
              >
                Read Sourcing Story →
              </button>
            </div>

            <ul className="divide-y divide-[#E5DFD7] border-y border-[#E5DFD7]">
              {PROVENANCE_LEDGER.slice(0, 4).map((row) => (
                <li
                  key={row.ingredient}
                  className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                >
                  <div>
                    <p className="text-[15px] font-semibold text-[#1E1E1C]">
                      {row.ingredient}
                    </p>
                    <p className="text-[13px] text-[#63615C] mt-0.5">
                      {row.producer} · {row.region}
                    </p>
                  </div>
                  <p className="text-[13px] font-medium text-[#4A5A3F] sm:text-right">
                    {row.harvestSpec}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#56423D]">
                From Private Hosts &amp; Weekly Tables
              </p>
              <h3 className="font-editorial text-2xl sm:text-[28px] font-medium text-[#1E1E1C]">
                Hosts who dine with our kitchen
              </h3>
            </div>

            <div className="space-y-5">
              {TESTIMONIALS.map((t) => (
                <blockquote
                  key={t.id}
                  className="p-6 rounded-2xl bg-[#F3EFEA] border border-[#E5DFD7] space-y-3"
                >
                  <p className="text-[15px] text-[#1E1E1C] leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="pt-3 border-t border-[#E5DFD7]">
                    <p className="text-[14px] font-semibold text-[#1E1E1C]">
                      {t.role}
                    </p>
                    <p className="text-[12px] text-[#63615C] mt-0.5">{t.context}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
