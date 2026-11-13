import { useState, useEffect, type FormEvent } from 'react';
import { X, Minus, Plus, Trash2, Check, Truck } from 'lucide-react';
import type { LarderProduct, DeliverySlot } from '../data/larderData';
import { DELIVERY_SLOTS } from '../data/larderData';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  product: LarderProduct;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

const FREE_DELIVERY_THRESHOLD = 120;
const DELIVERY_FEE = 14;

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [selectedSlotId, setSelectedSlotId] = useState<string>(DELIVERY_SLOTS[0].id);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    slot: DeliverySlot;
    total: number;
    recipient: string;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const qualifiesFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryCost = items.length === 0 || qualifiesFreeDelivery ? 0 : DELIVERY_FEE;
  const grandTotal = subtotal + deliveryCost;
  const amountToFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const selectedSlot =
    DELIVERY_SLOTS.find((s) => s.id === selectedSlotId) ?? DELIVERY_SLOTS[0];

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim() || !postalCode.trim()) {
      setFormError('Please complete your name, phone, street address, and postal code.');
      return;
    }
    setFormError('');
    const orderNum = `ML-${Math.floor(1040 + Math.random() * 890)}`;
    setConfirmedOrder({
      orderNumber: orderNum,
      slot: selectedSlot,
      total: grandTotal,
      recipient: customerName.trim(),
    });
    onClearCart();
  };

  const handleResetAndClose = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1E1E1C]/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Larder Bag and Checkout"
      onClick={handleResetAndClose}
    >
      <div
        className="w-full max-w-lg h-full bg-[#FBF9F5] border-l border-[#E5DFD7] drawer-shadow flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#E5DFD7] flex items-center justify-between">
          <div>
            <h2 className="font-editorial text-2xl font-medium text-[#1E1E1C]">
              Larder Bag
            </h2>
            <p className="text-[13px] text-[#56423D] tabular-nums">
              {items.reduce((acc, i) => acc + i.quantity, 0)} provisions selected
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close larder bag"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E5DFD7] bg-[#F3EFEA] text-[#1E1E1C] hover:border-[#D1C7BC] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {confirmedOrder ? (
            <div className="p-6 rounded-2xl bg-[#F3EFEA] border border-[#E5DFD7] space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#4A5A3F] text-[#FBF9F5] flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
                  Cold-Chain Dispatch Scheduled
                </p>
                <h3 className="font-editorial text-2xl font-medium text-[#1E1E1C]">
                  Order #{confirmedOrder.orderNumber} Confirmed
                </h3>
              </div>
              <p className="text-[14px] text-[#56423D] leading-relaxed">
                Thank you, {confirmedOrder.recipient}. Our kitchen has reserved your small-batch provisions for insulated delivery on{' '}
                <strong className="font-semibold text-[#1E1E1C]">
                  {confirmedOrder.slot.dayShort}, {confirmedOrder.slot.monthLabel}{' '}
                  {confirmedOrder.slot.dateLabel} ({confirmedOrder.slot.windowLabel})
                </strong>
                .
              </p>
              <div className="pt-3 border-t border-[#E5DFD7] flex items-center justify-between text-[14px]">
                <span className="text-[#56423D]">Total Paid on Dispatch</span>
                <span className="font-semibold text-[#1E1E1C] tabular-nums">
                  ${confirmedOrder.total.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full min-h-[44px] px-5 py-3 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[14px] font-semibold transition-colors cursor-pointer"
              >
                Return to Larder
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <p className="font-editorial text-2xl text-[#1E1E1C]">
                Your larder bag is empty
              </p>
              <p className="text-[14px] text-[#56423D] max-w-xs mx-auto leading-relaxed">
                Explore our chilled chef provisions and single-estate pantry staples prepared fresh each week.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-lg border border-[#4A5A3F] text-[#4A5A3F] text-[14px] font-semibold hover:bg-[#4A5A3F]/8 transition-colors cursor-pointer"
              >
                Browse Provisions
              </button>
            </div>
          ) : (
            <>
              {/* Free Cold-Chain Delivery Threshold Bar */}
              <div className="p-4 rounded-xl bg-[#F3EFEA] border border-[#E5DFD7] space-y-2">
                <div className="flex items-center justify-between gap-2 text-[13px]">
                  <span className="inline-flex items-center gap-2 font-medium text-[#1E1E1C]">
                    <Truck className="w-4 h-4 text-[#4A5A3F]" aria-hidden="true" />
                    {qualifiesFreeDelivery
                      ? 'Complimentary cold-chain delivery unlocked'
                      : `Add $${amountToFree.toFixed(2)} for complimentary cold-chain delivery`}
                  </span>
                  <span className="text-[#56423D] tabular-nums">
                    ${Math.min(subtotal, FREE_DELIVERY_THRESHOLD).toFixed(0)} / ${FREE_DELIVERY_THRESHOLD}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#E5DFD7] overflow-hidden">
                  <div
                    className="h-full bg-[#4A5A3F] transition-all duration-200"
                    style={{
                      width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Itemized List */}
              <ul className="divide-y divide-[#E5DFD7] border-b border-[#E5DFD7]">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="py-4 flex gap-4">
                    <div className="w-20 h-16 rounded-lg overflow-hidden border border-[#E5DFD7] bg-[#F3EFEA] shrink-0">
                      <ResilientImage
                        src={product.image}
                        alt={product.imageAlt}
                        titleFallback={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-editorial text-[16px] font-medium text-[#1E1E1C] leading-snug">
                          {product.title}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id)}
                          aria-label={`Remove ${product.title}`}
                          className="p-1.5 text-[#63615C] hover:text-[#9E3D24] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[12px] text-[#63615C] mt-0.5">
                        {product.servingSpec}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-[#E5DFD7] bg-[#F3EFEA] px-1 py-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                            aria-label={`Decrease ${product.title} quantity`}
                            className="w-7 h-7 inline-flex items-center justify-center rounded-full text-[#1E1E1C] hover:bg-[#E5DFD7]/60 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-[13px] font-semibold tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            aria-label={`Increase ${product.title} quantity`}
                            className="w-7 h-7 inline-flex items-center justify-center rounded-full text-[#1E1E1C] hover:bg-[#E5DFD7]/60 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-[14px] font-semibold text-[#1E1E1C] tabular-nums">
                          ${(product.price * quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Delivery Date Calendar Tiles (Olive & Linen styling) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                    Select Delivery Window
                  </span>
                  <span className="text-[12px] text-[#4A5A3F] font-medium">
                    {selectedSlot.windowLabel}
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {DELIVERY_SLOTS.map((slot) => {
                    const isSelected = slot.id === selectedSlotId;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={`py-2.5 px-2 rounded-lg border text-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24] ${
                          !slot.available
                            ? 'bg-[#EBE8E4] border-[#E5DFD7] text-[#63615C]/60 cursor-not-allowed line-through'
                            : isSelected
                              ? 'bg-[#4A5A3F] border-[#4A5A3F] text-[#FBF9F5]'
                              : 'bg-[#FBF9F5] border-[#E5DFD7] text-[#1E1E1C] hover:border-[#4A5A3F]'
                        }`}
                      >
                        <span className="block text-[11px] uppercase tracking-wider opacity-80">
                          {slot.dayShort}
                        </span>
                        <span className="block text-[16px] font-semibold tabular-nums mt-0.5">
                          {slot.dateLabel}
                        </span>
                        <span className="block text-[11px] opacity-80">
                          {slot.monthLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Customer Delivery Verification Form */}
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-3 pt-2">
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                  Recipient &amp; Dispatch Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="checkout-name" className="sr-only">
                      Full Name
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      placeholder="Full Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24]"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-phone" className="sr-only">
                      Phone Number
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label htmlFor="checkout-address" className="sr-only">
                      Street Address
                    </label>
                    <input
                      id="checkout-address"
                      type="text"
                      placeholder="Street Address & Apt"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24]"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-postal" className="sr-only">
                      Postal Code
                    </label>
                    <input
                      id="checkout-postal"
                      type="text"
                      placeholder="Postal Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24]"
                    />
                  </div>
                </div>
                {formError && (
                  <p role="alert" className="text-[13px] font-medium text-[#BA1A1A]">
                    {formError}
                  </p>
                )}
              </form>
            </>
          )}
        </div>

        {/* Drawer Footer Totals */}
        {!confirmedOrder && items.length > 0 && (
          <div className="px-6 py-4 bg-[#F3EFEA] border-t border-[#E5DFD7] space-y-3">
            <div className="space-y-1.5 text-[14px]">
              <div className="flex justify-between text-[#56423D]">
                <span>Subtotal</span>
                <span className="tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#56423D]">
                <span>Insulated Cold-Chain Delivery</span>
                <span className="tabular-nums">
                  {deliveryCost === 0 ? 'Complimentary' : `$${deliveryCost.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-1.5 border-t border-[#E5DFD7] flex justify-between font-semibold text-[#1E1E1C] text-[16px]">
                <span>Total (Pay on Delivery or Card)</span>
                <span className="tabular-nums">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="w-full min-h-[46px] px-6 py-3 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[14px] font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9E3D24]"
            >
              Confirm Cold-Chain Order · ${grandTotal.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
