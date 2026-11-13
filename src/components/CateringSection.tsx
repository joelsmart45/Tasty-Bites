import { useState, type FormEvent } from 'react';
import { Star, Minus, Plus, Check } from 'lucide-react';
import {
  CATERING_HERO_IMAGE,
  CATERING_TIERS,
  DELIVERY_SLOTS,
} from '../data/larderData';
import { ResilientImage } from './ResilientImage';

const DIETARY_OPTIONS = [
  'Vegetarian Mains',
  'Gluten-Free Service',
  'Dairy-Free Course Options',
  'Nut-Free Kitchen Prep',
] as const;

const SERVICE_FORMATS = [
  { id: 'drop-off', label: 'Warm Stoneware Drop-Off' },
  { id: 'plated', label: 'Plated Chef & Server Team' },
  { id: 'banquet', label: 'Full Estate Banquet & Sommelier' },
] as const;

export function CateringSection() {
  const [selectedTierId, setSelectedTierId] = useState<string>(CATERING_TIERS[1].id);
  const [guestCount, setGuestCount] = useState<number>(24);
  const [selectedDateId, setSelectedDateId] = useState<string>(DELIVERY_SLOTS[2].id);
  const [selectedDietary, setSelectedDietary] = useState<string[]>(['Gluten-Free Service']);
  const [serviceFormat, setServiceFormat] = useState<string>('plated');
  const [hostName, setHostName] = useState('');
  const [hostEmail, setHostEmail] = useState('');
  const [eventNotes, setEventNotes] = useState('');
  const [inquiryError, setInquiryError] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const activeTier =
    CATERING_TIERS.find((t) => t.id === selectedTierId) ?? CATERING_TIERS[1];
  const estimatedEstimate = activeTier.pricePerGuest * guestCount;

  const toggleDietary = (option: string) => {
    setSelectedDietary((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option],
    );
  };

  const handleSelectTier = (tierId: string) => {
    setSelectedTierId(tierId);
    setSubmittedRef(null);
    const el = document.getElementById('catering-inquirer');
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!hostName.trim() || !hostEmail.trim() || !hostEmail.includes('@')) {
      setInquiryError('Please provide your name and a valid email address for the proposal.');
      return;
    }
    setInquiryError('');
    setSubmittedRef(`CAT-${Math.floor(410 + Math.random() * 580)}`);
  };

  return (
    <section
      id="catering"
      className="py-16 sm:py-24 border-t border-[#E5DFD7] bg-[#F3EFEA]"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
        {/* Editorial Catering Feature Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
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
              Whether hosting an intimate twelve-person gallery supper or a ninety-guest vineyard table, our culinary brigade prepares every sauce, loaf, and roast from the same regional farms as our weekly larder.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#catering-inquirer"
                className="inline-flex items-center justify-center min-h-[44px] px-7 py-3 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[14px] font-semibold transition-colors whitespace-nowrap"
              >
                Build Menu Proposal
              </a>
              <span className="text-[13px] text-[#56423D]">
                Tasting menus finalized 10 days prior
              </span>
            </div>
          </div>
        </div>

        {/* Three-Tier Banquet Menu Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CATERING_TIERS.map((tier) => {
            const isSelected = tier.id === selectedTierId;
            return (
              <article
                key={tier.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between border transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#FBF9F5] border-[#9E3D24] shadow-[0_8px_24px_-2px_rgba(158,61,36,0.08)]'
                    : 'bg-[#FBF9F5] border-[#E5DFD7] hover:border-[#D1C7BC]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
                      {tier.guestRange}
                    </span>
                    {tier.isSignature && (
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#613D00]">
                        <Star
                          className="w-3.5 h-3.5 fill-[#E4A853] text-[#E4A853]"
                          aria-hidden="true"
                        />
                        <span>Chef Signature</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-editorial text-2xl font-semibold text-[#1E1E1C]">
                    {tier.name}
                  </h3>
                  <p className="font-editorial italic text-[16px] text-[#56423D] mt-0.5">
                    {tier.subtitle}
                  </p>

                  <div className="mt-4 pb-4 border-b border-[#E5DFD7] flex items-baseline gap-1.5">
                    <span className="text-2xl font-semibold text-[#1E1E1C] tabular-nums">
                      ${tier.pricePerGuest}
                    </span>
                    <span className="text-[13px] text-[#63615C]">/ guest</span>
                  </div>

                  <ul className="mt-4 divide-y divide-[#E5DFD7]">
                    {tier.courses.map((course) => (
                      <li
                        key={course}
                        className="py-2.5 text-[14px] text-[#1E1E1C] leading-snug"
                      >
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5DFD7] space-y-4">
                  <p className="text-[13px] text-[#56423D] leading-relaxed">
                    {tier.serviceNotes}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleSelectTier(tier.id)}
                    className={`w-full min-h-[44px] px-5 py-2.5 rounded-lg text-[14px] font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24] ${
                      isSelected
                        ? 'bg-[#9E3D24] text-[#FBF9F5] hover:bg-[#7E260F]'
                        : 'border-[1.5px] border-[#4A5A3F] text-[#4A5A3F] hover:bg-[#4A5A3F]/8'
                    }`}
                  >
                    {isSelected ? 'Selected for Inquiry' : 'Inquire for Menu'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Specialized Catering Inquirer & Portion Stepper */}
        <div
          id="catering-inquirer"
          className="rounded-2xl bg-[#FBF9F5] border border-[#E5DFD7] p-6 sm:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Configuration Column */}
            <div className="lg:col-span-7 space-y-7">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#56423D]">
                  Event &amp; Menu Configurator
                </p>
                <h3 className="font-editorial text-2xl sm:text-[28px] font-medium text-[#1E1E1C] mt-1">
                  Tailor {activeTier.name}
                </h3>
              </div>

              {/* Guest Portion Stepper + Preferred Date Calendar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                <div className="space-y-2.5">
                  <label className="block text-[13px] font-semibold text-[#1E1E1C]">
                    Estimated Guest Count
                  </label>
                  <div className="inline-flex items-center rounded-full border border-[#E5DFD7] bg-[#F3EFEA] px-2 py-1">
                    <button
                      type="button"
                      onClick={() => setGuestCount((g) => Math.max(12, g - 2))}
                      aria-label="Decrease guest count"
                      className="w-10 h-10 inline-flex items-center justify-center rounded-full text-[#1E1E1C] hover:bg-[#E5DFD7]/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24]"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-20 text-center text-[16px] font-semibold text-[#1E1E1C] tabular-nums">
                      {guestCount} guests
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuestCount((g) => Math.min(90, g + 2))}
                      aria-label="Increase guest count"
                      className="w-10 h-10 inline-flex items-center justify-center rounded-full text-[#1E1E1C] hover:bg-[#E5DFD7]/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Olive & Linen Event Date Tiles */}
                <div className="space-y-2.5">
                  <span className="block text-[13px] font-semibold text-[#1E1E1C]">
                    Target Evening / Weekend
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {DELIVERY_SLOTS.slice(0, 3).map((slot) => {
                      const active = slot.id === selectedDateId;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedDateId(slot.id)}
                          className={`py-2 px-2 rounded-lg border text-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24] ${
                            active
                              ? 'bg-[#4A5A3F] border-[#4A5A3F] text-[#FBF9F5]'
                              : 'bg-[#FBF9F5] border-[#E5DFD7] text-[#1E1E1C] hover:border-[#4A5A3F]'
                          }`}
                        >
                          <span className="block text-[11px] uppercase opacity-80">
                            {slot.dayShort}
                          </span>
                          <span className="block text-[14px] font-semibold tabular-nums">
                            {slot.monthLabel} {slot.dateLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Service Format Radio Buttons (20px circle, #9E3D24 dot) */}
              <div className="space-y-3">
                <span className="block text-[13px] font-semibold text-[#1E1E1C]">
                  Service Format
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SERVICE_FORMATS.map((fmt) => {
                    const checked = serviceFormat === fmt.id;
                    return (
                      <button
                        key={fmt.id}
                        type="button"
                        role="radio"
                        aria-checked={checked}
                        onClick={() => setServiceFormat(fmt.id)}
                        className={`flex items-center gap-3 p-3.5 rounded-lg border text-left transition-colors cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24] ${
                          checked
                            ? 'border-[#9E3D24] bg-[#F3EFEA]'
                            : 'border-[#E5DFD7] bg-[#FBF9F5] hover:border-[#D1C7BC]'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${
                            checked
                              ? 'border-[#9E3D24] bg-[#9E3D24]'
                              : 'border-[#D1C7BC] bg-[#FBF9F5]'
                          }`}
                        >
                          {checked && (
                            <span className="w-2 h-2 rounded-full bg-[#FBF9F5]" />
                          )}
                        </span>
                        <span className="text-[13px] font-medium text-[#1E1E1C] leading-snug">
                          {fmt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dietary Checkboxes (20px, 4px radius, #9E3D24 checked) */}
              <div className="space-y-3">
                <span className="block text-[13px] font-semibold text-[#1E1E1C]">
                  Dietary &amp; Kitchen Accommodations
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DIETARY_OPTIONS.map((option) => {
                    const checked = selectedDietary.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        role="checkbox"
                        aria-checked={checked}
                        onClick={() => toggleDietary(option)}
                        className="flex items-center gap-3 p-3 rounded-lg border border-[#E5DFD7] bg-[#FBF9F5] hover:border-[#D1C7BC] text-left transition-colors cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24]"
                      >
                        <span
                          className={`w-5 h-5 rounded-[4px] border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${
                            checked
                              ? 'bg-[#9E3D24] border-[#9E3D24] text-[#FBF9F5]'
                              : 'bg-[#FBF9F5] border-[#D1C7BC]'
                          }`}
                        >
                          {checked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                        </span>
                        <span className="text-[14px] text-[#1E1E1C]">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Quote & Submission Column */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-xl bg-[#F3EFEA] border border-[#E5DFD7]">
              {submittedRef ? (
                <div className="my-auto space-y-4">
                  <div className="w-10 h-10 rounded-full bg-[#4A5A3F] text-[#FBF9F5] flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
                    Proposal Request Received · #{submittedRef}
                  </p>
                  <h4 className="font-editorial text-2xl font-medium text-[#1E1E1C]">
                    Our chef director will reply within 24 hours
                  </h4>
                  <p className="text-[14px] text-[#56423D] leading-relaxed">
                    We have logged your {activeTier.name} inquiry for{' '}
                    <strong className="text-[#1E1E1C]">{guestCount} guests</strong>{' '}
                    (estimated at{' '}
                    <strong className="text-[#1E1E1C] tabular-nums">
                      ${estimatedEstimate.toLocaleString()}
                    </strong>
                    ) and sent a summary to {hostEmail}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmittedRef(null)}
                    className="inline-flex items-center justify-center min-h-[42px] px-5 py-2 rounded-lg border-[1.5px] border-[#4A5A3F] text-[#4A5A3F] text-[13px] font-semibold hover:bg-[#4A5A3F]/8 transition-colors cursor-pointer"
                  >
                    Modify Proposal Details
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="pb-4 border-b border-[#E5DFD7]">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                      Estimated Menu Investment
                    </p>
                    <div className="mt-1 flex items-baseline justify-between gap-4">
                      <span className="font-editorial text-3xl font-semibold text-[#1E1E1C] tabular-nums">
                        ${estimatedEstimate.toLocaleString()}
                      </span>
                      <span className="text-[13px] text-[#56423D] tabular-nums">
                        {guestCount} × ${activeTier.pricePerGuest}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="catering-host-name"
                      className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D] mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="catering-host-name"
                      type="text"
                      placeholder="Clara Lindqvist"
                      value={hostName}
                      onChange={(e) => setHostName(e.target.value)}
                      className="w-full rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="catering-host-email"
                      className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D] mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="catering-host-email"
                      type="email"
                      placeholder="clara@atelier.com"
                      value={hostEmail}
                      onChange={(e) => setHostEmail(e.target.value)}
                      className="w-full rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="catering-notes"
                      className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D] mb-1.5"
                    >
                      Venue &amp; Wine Pairing Notes
                    </label>
                    <textarea
                      id="catering-notes"
                      rows={3}
                      placeholder="Private loft dining room, candlelit long table, optional low-intervention wine pairings..."
                      value={eventNotes}
                      onChange={(e) => setEventNotes(e.target.value)}
                      className="w-full rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24]"
                    />
                  </div>

                  {inquiryError && (
                    <p role="alert" className="text-[13px] font-medium text-[#BA1A1A]">
                      {inquiryError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full min-h-[46px] px-6 py-3 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[14px] font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9E3D24]"
                  >
                    Request Bespoke Proposal
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
