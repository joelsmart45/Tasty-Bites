import { Minus, Plus } from 'lucide-react';
import type { LarderProduct } from '../data/larderData';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: LarderProduct;
  inBagQty: number;
  onOpenProduct: (productId: string) => void;
  onAddToCart: (product: LarderProduct, qty?: number) => void;
  onUpdateQuantity: (productId: string, nextQty: number) => void;
}

export function ProductCard({
  product,
  inBagQty,
  onOpenProduct,
  onAddToCart,
  onUpdateQuantity,
}: ProductCardProps) {
  return (
    <article className="rounded-2xl bg-[#F3EFEA] border border-[#E5DFD7] p-4 flex flex-col justify-between card-hover-warm">
      <div>
        <button
          type="button"
          onClick={() => onOpenProduct(product.id)}
          className="block w-full overflow-hidden rounded-xl border border-[#E5DFD7]/80 bg-[#EBE8E4] aspect-[4/3] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24]"
          aria-label={`View ${product.title} details and ingredients`}
        >
          <ResilientImage
            src={product.image}
            alt={product.imageAlt}
            titleFallback={product.title}
            className="w-full h-full object-cover"
          />
        </button>

        <div className="pt-4 space-y-2">
          <div className="flex flex-wrap items-center gap-x-2 text-[12px] font-medium text-[#56423D]">
            <span className="uppercase tracking-[0.04em] font-semibold text-[#4A5A3F]">
              {product.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{product.servingSpec}</span>
          </div>

          <button
            type="button"
            onClick={() => onOpenProduct(product.id)}
            className="text-left block w-full cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24] rounded-sm"
          >
            <h3 className="font-editorial text-[22px] font-semibold text-[#1E1E1C] group-hover:text-[#9E3D24] transition-colors leading-snug">
              {product.title}
            </h3>
          </button>

          <p className="text-[14px] text-[#56423D] leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {product.dietary.length > 0 && (
            <p className="text-[12px] text-[#63615C] pt-1">
              {product.dietary.join(' · ')}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-[#E5DFD7] flex items-center justify-between gap-3">
        <span className="text-[17px] font-semibold text-[#1E1E1C] tabular-nums">
          ${product.price.toFixed(2)}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenProduct(product.id)}
            className="px-3 py-2 text-[13px] font-medium text-[#1E1E1C] underline decoration-[#D1C7BC] underline-offset-4 hover:decoration-[#9E3D24] transition-colors cursor-pointer"
          >
            Details
          </button>

          {inBagQty > 0 ? (
            <div className="inline-flex items-center rounded-lg border border-[#9E3D24] bg-[#FBF9F5] px-1 py-0.5">
              <button
                type="button"
                onClick={() => onUpdateQuantity(product.id, inBagQty - 1)}
                aria-label={`Remove one ${product.title}`}
                className="w-8 h-8 inline-flex items-center justify-center text-[#9E3D24] hover:bg-[#9E3D24]/10 rounded-md cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center text-[13px] font-semibold text-[#1E1E1C] tabular-nums">
                {inBagQty}
              </span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(product.id, inBagQty + 1)}
                aria-label={`Add one more ${product.title}`}
                className="w-8 h-8 inline-flex items-center justify-center text-[#9E3D24] hover:bg-[#9E3D24]/10 rounded-md cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onAddToCart(product, 1)}
              className="min-h-[40px] px-4 py-2 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[13px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24]"
            >
              + Add to Bag
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
