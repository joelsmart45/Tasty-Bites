import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CATERING_FAQS } from '../data/larderData';
import type { AppRoute } from '../types/routes';
import { CateringSection } from '../components/CateringSection';

interface CateringPageProps {
  onNavigate: (route: AppRoute) => void;
}

export function CateringPage({ onNavigate }: CateringPageProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <div>
      {/* Breadcrumb Strip */}
      <div className="bg-[#F3EFEA] pt-8">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="text-[13px] text-[#63615C] flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'home' })}
              className="hover:text-[#1E1E1C] cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#1E1E1C] font-medium">Private Catering &amp; Banquets</span>
          </nav>
        </div>
      </div>

      {/* Main Banquet Showcase, 3-Tier Pricing & Configurator */}
      <CateringSection />

      {/* Catering FAQ Accordion */}
      <section className="py-16 sm:py-20 border-t border-[#E5DFD7] bg-[#FBF9F5]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          <div className="lg:col-span-4 space-y-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
              Planning Details
            </p>
            <h2
              className="font-editorial text-3xl sm:text-[36px] font-medium text-[#1E1E1C] leading-[1.18]"
              style={{ textWrap: 'balance' }}
            >
              Frequently asked questions
            </h2>
            <p className="text-[15px] text-[#56423D] leading-relaxed">
              Have a bespoke venue requirement or multi-day retreat?{' '}
              <button
                type="button"
                onClick={() => onNavigate({ page: 'contact' })}
                className="font-semibold text-[#9E3D24] underline underline-offset-4 cursor-pointer"
              >
                Speak directly with our counter team
              </button>
              .
            </p>
          </div>

          <div className="lg:col-span-8 divide-y divide-[#E5DFD7] border-y border-[#E5DFD7]">
            {CATERING_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={faq.question} className="py-4">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full py-2 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E3D24] rounded-sm"
                  >
                    <span className="font-editorial text-xl font-medium text-[#1E1E1C]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#56423D] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="pt-2 pb-3 text-[15px] text-[#56423D] leading-relaxed max-w-2xl">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
