import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import {
  HERO_IMAGE,
  PROVENANCE_LEDGER,
  TESTIMONIALS,
} from '../data/larderData';
import type { AppRoute } from '../types/routes';
import { ResilientImage } from '../components/ResilientImage';

interface ProvenancePageProps {
  onNavigate: (route: AppRoute) => void;
}

const KITCHEN_STANDARDS = [
  {
    title: 'Zero Seed-Oil Kitchen',
    detail:
      'Every sauté, braise, and pastry emulsion uses exclusively cold-pressed single-estate olive oil or grass-fed cultured Normandy butter.',
  },
  {
    title: 'Circular Glass & Stoneware',
    detail:
      'Provisions arrive in reusable apothecary glass and glazed terracotta dishes. Return rinsed vessels on your next delivery or at our counter.',
  },
  {
    title: 'Direct Mill & Ranch Contracts',
    detail:
      'We contract whole harvests directly with five family estates, ensuring grain is stone-milled within fourteen days of pasta extrusion.',
  },
];

export function ProvenancePage({ onNavigate }: ProvenancePageProps) {
  const [ledgerQuery, setLedgerQuery] = useState('');

  const filteredLedger = useMemo(() => {
    const q = ledgerQuery.trim().toLowerCase();
    if (!q) return PROVENANCE_LEDGER;
    return PROVENANCE_LEDGER.filter((row) =>
      `${row.ingredient} ${row.producer} ${row.region} ${row.harvestSpec}`
        .toLowerCase()
        .includes(q),
    );
  }, [ledgerQuery]);

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
        {/* Breadcrumb & Header */}
        <div className="space-y-8">
          <nav aria-label="Breadcrumb" className="text-[13px] text-[#63615C] flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'home' })}
              className="hover:text-[#1E1E1C] cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#1E1E1C] font-medium">Kitchen &amp; Provenance</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
                Our Kitchen Collective
              </p>
              <h1
                className="font-editorial text-4xl sm:text-[48px] font-semibold text-[#1E1E1C] leading-[1.12] tracking-[-0.02em]"
                style={{ textWrap: 'balance' }}
              >
                Rooted in kitchen materiality and single-estate harvests
              </h1>
              <p className="text-[16px] text-[#56423D] leading-relaxed">
                Maison Larder began as a working prep kitchen supplying private dining rooms, eventually opening our pantry shelves to weekly neighborhood tables. We publish the exact grower, harvest date, and milling window for every primary ingredient we cook.
              </p>
              <div className="pt-2 flex flex-wrap gap-3.5">
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'provisions' })}
                  className="min-h-[44px] px-6 py-2.5 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[14px] font-semibold transition-colors cursor-pointer"
                >
                  Shop Weekly Provisions
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'contact' })}
                  className="min-h-[44px] px-6 py-2.5 rounded-lg border-[1.5px] border-[#4A5A3F] text-[#4A5A3F] hover:bg-[#4A5A3F]/8 text-[14px] font-semibold transition-colors cursor-pointer"
                >
                  Visit Our Counter
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 overflow-hidden rounded-2xl border border-[#E5DFD7] bg-[#F3EFEA] aspect-[16/9]">
              <ResilientImage
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                titleFallback="Maison Larder Prep Kitchen"
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Three Kitchen Standards */}
        <section className="pt-12 border-t border-[#E5DFD7] grid grid-cols-1 md:grid-cols-3 gap-8">
          {KITCHEN_STANDARDS.map((item, idx) => (
            <div key={item.title} className="space-y-2.5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#9E3D24] tabular-nums">
                0{idx + 1}. Standard
              </p>
              <h2 className="font-editorial text-2xl font-medium text-[#1E1E1C]">
                {item.title}
              </h2>
              <p className="text-[15px] text-[#56423D] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </section>

        {/* Searchable Ingredient & Purveyor Ledger */}
        <section className="pt-12 border-t border-[#E5DFD7] space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
                Complete Sourcing Ledger
              </p>
              <h2 className="font-editorial text-3xl sm:text-[36px] font-medium text-[#1E1E1C]">
                Partner mills, groves &amp; ranches
              </h2>
            </div>

            <div className="relative w-full md:w-80">
              <label htmlFor="ledger-search" className="sr-only">
                Search sourcing ledger
              </label>
              <Search
                className="w-4 h-4 text-[#63615C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="ledger-search"
                type="search"
                value={ledgerQuery}
                onChange={(e) => setLedgerQuery(e.target.value)}
                placeholder="Search olive, saffron, ranch..."
                className="w-full min-h-[44px] rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] pl-10 pr-4 py-2 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24]"
              />
            </div>
          </div>

          <ul className="divide-y divide-[#E5DFD7] border-y border-[#E5DFD7]">
            {filteredLedger.map((row) => (
              <li
                key={row.ingredient}
                className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline"
              >
                <span className="md:col-span-4 text-[16px] font-semibold text-[#1E1E1C]">
                  {row.ingredient}
                </span>
                <span className="md:col-span-4 text-[14px] text-[#56423D]">
                  {row.producer} · {row.region}
                </span>
                <span className="md:col-span-4 text-[14px] font-medium text-[#4A5A3F] md:text-right">
                  {row.harvestSpec}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Testimonials */}
        <section className="pt-12 border-t border-[#E5DFD7] space-y-6">
          <h2 className="font-editorial text-2xl sm:text-[30px] font-medium text-[#1E1E1C]">
            Notes from our tables
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.id}
                className="p-6 sm:p-8 rounded-2xl bg-[#F3EFEA] border border-[#E5DFD7] space-y-4"
              >
                <p className="text-[16px] text-[#1E1E1C] leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="pt-3 border-t border-[#E5DFD7]">
                  <p className="text-[14px] font-semibold text-[#1E1E1C]">{t.role}</p>
                  <p className="text-[12px] text-[#63615C] mt-0.5">{t.context}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
