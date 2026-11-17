import { useState, useCallback } from 'react';
import { Plus, Trash2, Edit3, Search, Star } from 'lucide-react';
import {
  getStoredCateringTiers,
  saveStoredCateringTiers,
  type CateringTier,
} from '../../auth/auth';

const blankTier = (): Partial<CateringTier> => ({
  id: '',
  name: '',
  subtitle: '',
  guestRange: '',
  pricePerGuest: 0,
  serviceNotes: '',
  courses: ['', '', '', ''],
  isSignature: false,
});

export function CateringSectionAdmin() {
  const [tiers, setTiers] = useState<CateringTier[]>(() =>
    getStoredCateringTiers(),
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<CateringTier>>(blankTier());
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = tiers.filter((t) => {
    const q = query.toLowerCase();
    return (
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.subtitle.toLowerCase().includes(q)
    );
  });

  const openAdd = useCallback(() => {
    setEditingId(null);
    setDraft(blankTier());
    setOpen(true);
  }, []);

  const openEdit = useCallback((tier: CateringTier) => {
    setEditingId(tier.id);
    setDraft({ ...tier, courses: [...tier.courses] });
    setOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    if (!window.confirm('Remove this catering tier?')) return;
    const next = tiers.filter((t) => t.id !== id);
    setTiers(next);
    saveStoredCateringTiers(next);
  }, [tiers]);

  const handleSave = useCallback(() => {
    const next: CateringTier = {
      id: draft.id || `cat-${Date.now()}`,
      name: draft.name ?? '',
      subtitle: draft.subtitle ?? '',
      guestRange: draft.guestRange ?? '',
      pricePerGuest: Number(draft.pricePerGuest) || 0,
      serviceNotes: draft.serviceNotes ?? '',
      courses: (draft.courses ?? []).filter(Boolean),
      isSignature: draft.isSignature ?? false,
    };
    const updated = editingId
      ? tiers.map((t) => (t.id === editingId ? next : t))
      : [...tiers, next];
    setTiers(updated);
    saveStoredCateringTiers(updated);
    setOpen(false);
    setEditingId(null);
  }, [draft, editingId, tiers]);

  const setField = (key: string, value: unknown) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const setCourse = (idx: number, value: string) => {
    setDraft((prev) => {
      const courses = [...(prev.courses ?? [])];
      courses[idx] = value;
      return { ...prev, courses };
    });
  };

  const inputClass =
    'w-full rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24]';

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
            Banquet configurations
          </p>
          <h2 className="font-editorial text-3xl sm:text-[40px] font-medium text-[#1E1E1C]">
            Catering menus
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#63615C] pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search menus..."
              className="w-full min-h-[44px] rounded-lg pl-10 pr-4 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24] bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7]"
            />
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[14px] font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add tier
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="lg:col-span-3 rounded-2xl bg-[#F3EFEA] border border-[#E5DFD7] p-12 text-center">
            <p className="text-[13px] text-[#63615C]">No catering tiers found.</p>
          </div>
        ) : (
          filtered.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 border transition-all duration-200 ${
                tier.isSignature
                  ? 'border-[#9E3D24] bg-[#FBF9F5] shadow-[0_8px_24px_-2px_rgba(158,61,36,0.08)]'
                  : 'border-[#E5DFD7] bg-[#FFFFFF] hover:border-[#D1C7BC]'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
                  {tier.guestRange}
                </span>
                {tier.isSignature && (
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#613D00]">
                    <Star className="w-3.5 h-3.5 fill-[#E4A853] text-[#E4A853]" aria-hidden="true" />
                    <span>Chef Signature</span>
                  </span>
                )}
              </div>
              <h3 className="font-editorial text-2xl font-semibold text-[#1E1E1C]">
                {tier.name}
              </h3>
              <p className="font-editorial italic text-[16px] text-[#56423D] mt-0.5 mb-4">
                {tier.subtitle}
              </p>
              <div className="mt-4 pb-4 border-b border-[#E5DFD7] flex items-baseline gap-1.5">
                <span className="text-2xl font-semibold text-[#1E1E1C] tabular-nums">
                  ${tier.pricePerGuest}
                </span>
                <span className="text-[13px] text-[#63615C]">/ guest</span>
              </div>
              <ul className="mt-4 divide-y divide-[#E5DFD7] mb-6">
                {tier.courses.map((course, idx) => (
                  <li key={idx} className="py-2 text-[14px] text-[#1E1E1C] leading-snug">
                    {course}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(tier)}
                  className="p-2 text-[#56423D] hover:text-[#9E3D24] transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(tier.id)}
                  className="p-2 text-[#BA1A1A] hover:bg-[#FBECEA] rounded-md transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E1E1C]/40 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            className="bg-[#FFFFFF] border border-[#E5DFD7] rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-editorial text-2xl font-medium text-[#1E1E1C]">
                {editingId ? 'Edit catering tier' : 'Add new tier'}
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg border border-[#E5DFD7] bg-[#F3EFEA] text-[#1E1E1C] hover:bg-[#E5DFD7] transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                    Tier name
                  </label>
                  <input
                    type="text"
                    value={draft.name ?? ''}
                    onChange={(e) => setField('name', e.target.value)}
                    placeholder="e.g. The Larder Table"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                    Guest range
                  </label>
                  <input
                    type="text"
                    value={draft.guestRange ?? ''}
                    onChange={(e) => setField('guestRange', e.target.value)}
                    placeholder="e.g. 12 – 24 Guests"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={draft.subtitle ?? ''}
                  onChange={(e) => setField('subtitle', e.target.value)}
                  placeholder="e.g. Family-Style Harvest Supper"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                    Price per guest ($)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={draft.pricePerGuest ?? ''}
                    onChange={(e) => setField('pricePerGuest', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2 flex items-end">
                  <label className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft.isSignature ?? false}
                      onChange={(e) => setField('isSignature', e.target.checked)}
                      className="rounded border-[#E5DFD7] text-[#9E3D24] focus:ring-[#9E3D24] h-4 w-4"
                    />
                    Chef signature tier
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                  Service notes
                </label>
                <textarea
                  rows={3}
                  value={draft.serviceNotes ?? ''}
                  onChange={(e) => setField('serviceNotes', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                  Courses
                </label>
                <div className="space-y-2">
                  {(draft.courses ?? []).map((course, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={course}
                        onChange={(e) => setCourse(idx, e.target.value)}
                        placeholder={`Course ${idx + 1}`}
                        className="flex-1 rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] focus:outline-none focus:border-[#9E3D24]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setDraft((prev) => {
                            const courses = [...(prev.courses ?? [])];
                            courses.splice(idx, 1);
                            return { ...prev, courses };
                          });
                        }}
                        className="p-1.5 text-[#BA1A1A] hover:bg-[#FBECEA] rounded-md"
                        title="Remove course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setDraft((prev) => ({
                        ...prev,
                        courses: [...(prev.courses ?? []), ''],
                      }));
                    }}
                    className="text-[12px] font-medium text-[#9E3D24] underline underline-offset-4 hover:text-[#7E260F] cursor-pointer"
                  >
                    + Add course
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5DFD7] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-5 py-2.5 rounded-lg text-[14px] font-medium text-[#56423D] hover:bg-[#F3EFEA] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[14px] font-semibold transition-colors cursor-pointer"
                >
                  Save tier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
