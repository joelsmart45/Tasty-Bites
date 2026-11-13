import { useState, type FormEvent } from 'react';
import { Check, MapPin, Clock, Phone } from 'lucide-react';
import { DELIVERY_ZONES } from '../data/larderData';
import type { AppRoute } from '../types/routes';

interface ContactPageProps {
  onNavigate: (route: AppRoute) => void;
}

const INQUIRY_TOPICS = [
  'Weekly Provisions & Cold-Chain Delivery',
  'Allergen & Dietary Transparency',
  'Private Dining & Tasting Appointment',
  'Wholesale & Hospitality Accounts',
] as const;

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [topic, setTopic] = useState<string>(INQUIRY_TOPICS[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !email.includes('@') || !message.trim()) {
      setError('Please complete your name, valid email address, and message.');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        {/* Breadcrumb & Header */}
        <div className="space-y-4 pb-8 border-b border-[#E5DFD7]">
          <nav aria-label="Breadcrumb" className="text-[13px] text-[#63615C] flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'home' })}
              className="hover:text-[#1E1E1C] cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#1E1E1C] font-medium">Contact &amp; Counter Hours</span>
          </nav>

          <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
            Larder Counter &amp; Tasting Room
          </p>
          <h1
            className="font-editorial text-4xl sm:text-[48px] font-semibold text-[#1E1E1C] leading-[1.12] tracking-[-0.02em]"
            style={{ textWrap: 'balance' }}
          >
            Visit our counter or write to the kitchen
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Counter Details & Delivery Zones */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#F3EFEA] border border-[#E5DFD7] space-y-5">
              <h2 className="font-editorial text-2xl font-medium text-[#1E1E1C]">
                12 Eziobodo Larder
              </h2>

              <ul className="space-y-4 text-[14px] text-[#56423D]">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#9E3D24] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E1E1C]">Address</p>
                    <p>12 Eziobodo</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#9E3D24] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E1E1C]">Counter Hours</p>
                    <p>Tuesday – Sunday · 10:00 – 19:00</p>
                    <p className="text-[12px] text-[#63615C]">Closed Mondays for stock reductions &amp; mill deliveries</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#9E3D24] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1E1E1C]">Kitchen Desk</p>
                    <p>bonjour@maisonlarder.com · +1 (415) 555-0194</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#56423D]">
                Cold-Chain Delivery Schedule
              </h3>
              <ul className="divide-y divide-[#E5DFD7] border-y border-[#E5DFD7]">
                {DELIVERY_ZONES.map((zone) => (
                  <li key={zone.zone} className="py-3.5 space-y-1">
                    <p className="text-[14px] font-semibold text-[#1E1E1C]">{zone.zone}</p>
                    <p className="text-[13px] text-[#56423D]">{zone.schedule}</p>
                    <p className="text-[12px] font-medium text-[#4A5A3F]">{zone.cutoff}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Direct Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl bg-[#F3EFEA] border border-[#E5DFD7]">
              {sent ? (
                <div className="py-8 space-y-4">
                  <div className="w-10 h-10 rounded-full bg-[#4A5A3F] text-[#FBF9F5] flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
                    Message Delivered to Kitchen Desk
                  </p>
                  <h2 className="font-editorial text-2xl font-medium text-[#1E1E1C]">
                    Thank you, {name}
                  </h2>
                  <p className="text-[15px] text-[#56423D] leading-relaxed max-w-lg">
                    Our counter manager has received your note regarding <strong>{topic}</strong> and will reply to {email} during kitchen hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setMessage('');
                    }}
                    className="min-h-[44px] px-5 py-2.5 rounded-lg border-[1.5px] border-[#4A5A3F] text-[#4A5A3F] text-[14px] font-semibold hover:bg-[#4A5A3F]/8 transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="font-editorial text-2xl sm:text-[28px] font-medium text-[#1E1E1C]">
                      Send a note to our counter
                    </h2>
                    <p className="text-[14px] text-[#56423D] mt-1">
                      Ask about batch allergens, olive oil case orders, or private cellar tastings.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D] mb-1.5"
                    >
                      Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full min-h-[44px] rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] focus:outline-none focus:border-[#9E3D24]"
                    >
                      {INQUIRY_TOPICS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D] mb-1.5"
                      >
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Margaux Moreau"
                        className="w-full min-h-[44px] rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D] mb-1.5"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="margaux@example.com"
                        className="w-full min-h-[44px] rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D] mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can our kitchen assist your upcoming table?"
                      className="w-full rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24]"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-[13px] font-medium text-[#BA1A1A]">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="min-h-[46px] px-7 py-3 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[14px] font-semibold transition-colors cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
