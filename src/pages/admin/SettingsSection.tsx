import { useState, useCallback } from 'react';
import { Save, Mail, Clock, MapPin } from 'lucide-react';

export function SettingsSection() {
  const [counterName, setCounterName] = useState('12 Eziobodo Larder');
  const [counterAddress, setCounterAddress] = useState('12 Eziobodo');
  const [counterHours, setCounterHours] = useState('Tuesday – Sunday · 10:00 – 19:00');
  const [kitchenEmail, setKitchenEmail] = useState('bonjour@maisonlarder.com');
  const [kitchenPhone, setKitchenPhone] = useState('+1 (415) 555-0194');
  const [saved, setSaved] = useState(false);

  const handleSave = useCallback(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }, []);

  const field = (
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    icon: React.ElementType,
    placeholder: string
  ) => {
    const Icon = icon;
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
            {label}
          </label>
          <Icon className="w-4 h-4 text-[#63615C]" aria-hidden="true" />
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24]"
        />
      </div>
    );
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
            Site configuration
          </p>
          <h2 className="font-editorial text-3xl sm:text-[40px] font-medium text-[#1E1E1C]">
            Larder settings
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E5DFD7] bg-[#FFFFFF] p-8 sm:p-12 shadow-sm max-w-2xl">
        <div className="space-y-6">
          {field(
            'Counter name',
            counterName,
            (e) => setCounterName(e.target.value),
            MapPin,
            'Larder counter name'
          )}
          {field(
            'Counter address',
            counterAddress,
            (e) => setCounterAddress(e.target.value),
            MapPin,
            'Street address'
          )}
          {field(
            'Counter hours',
            counterHours,
            (e) => setCounterHours(e.target.value),
            Clock,
            'e.g. Tuesday – Sunday · 10:00 – 19:00'
          )}
          {field(
            'Kitchen email',
            kitchenEmail,
            (e) => setKitchenEmail(e.target.value),
            Mail,
            'bonjour@maisonlarder.com'
          )}
          {field(
            'Kitchen phone',
            kitchenPhone,
            (e) => setKitchenPhone(e.target.value),
            Mail,
            '+1 (415) 555-0194'
          )}
        </div>

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[14px] font-semibold transition-colors cursor-pointer disabled:opacity-60"
          >
            <Save className="w-4 h-4" /> Save settings
          </button>
          {saved && (
            <span className="text-[12px] font-medium text-[#3D6B3A] flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#4A5A3F]" /> Saved
            </span>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-[#E5DFD7]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F] mb-4">
            Data &amp; storage
          </p>
          <p className="text-[13px] text-[#56423D] leading-relaxed max-w-lg">
            Product, catering, and order data is stored in browser localStorage for this demo.
            Clearing site data will reset inventory and orders. Customer sessions persist until
            sign out.
          </p>
        </div>
      </div>
    </div>
  );
}
