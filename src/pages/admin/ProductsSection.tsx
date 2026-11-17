import { useState, useCallback } from 'react';
import { Plus, Trash2, Edit3, Search } from 'lucide-react';
import {
  getStoredProducts,
  saveStoredProducts,
  type LarderProduct,
} from '../../auth/auth';

const DIETARY_TAGS = ['Vegetarian', 'Gluten-Free', 'Organic', 'Dairy-Free'] as const;

const blankProduct = (): Partial<LarderProduct> => ({
  id: '',
  title: '',
  category: 'Chef Provisions' as const,
  price: 0,
  servingSpec: '',
  prepTime: '',
  originLabel: '',
  description: '',
  image: '',
  imageAlt: '',
  aspectClass: 'aspect-[4/3]' as const,
  dietary: [],
  availabilityNote: '',
  heatingNotes: '',
  ingredients: [{ name: '', origin: '' }],
  featuredInGrid: true,
});

export function ProductsSection() {
  const [products, setProducts] = useState<LarderProduct[]>(() =>
    getStoredProducts(),
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<LarderProduct>>(blankProduct());
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('');

  const filtered = products.filter((p) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    const matchesDiet =
      !dietaryFilter || p.dietary.includes(dietaryFilter as any);
    return matchesQuery && matchesDiet;
  });

  const openAdd = useCallback(() => {
    setEditingId(null);
    setDraft(blankProduct());
    setOpen(true);
  }, []);

  const openEdit = useCallback((product: LarderProduct) => {
    setEditingId(product.id);
    setDraft({ ...product });
    setOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    if (!window.confirm('Remove this provision from the larder?')) return;
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    saveStoredProducts(next);
  }, [products]);

  const handleSave = useCallback(() => {
    const next: LarderProduct = {
      id: draft.id || `prod-${Date.now()}`,
      title: draft.title ?? '',
      category: (draft.category as 'Chef Provisions' | 'Artisanal Pantry') ?? 'Chef Provisions',
      price: Number(draft.price) || 0,
      servingSpec: draft.servingSpec ?? '',
      prepTime: draft.prepTime ?? '',
      originLabel: draft.originLabel ?? '',
      description: draft.description ?? '',
      image: draft.image ?? '',
      imageAlt: draft.imageAlt ?? draft.title ?? '',
      aspectClass: (draft.aspectClass as 'aspect-[4/3]' | 'aspect-[16/9]') ?? 'aspect-[4/3]',
      dietary: draft.dietary ?? [],
      availabilityNote: draft.availabilityNote ?? '',
      heatingNotes: draft.heatingNotes ?? '',
      ingredients: draft.ingredients ?? [{ name: '', origin: '' }],
      featuredInGrid: draft.featuredInGrid ?? true,
    };
    const updated = editingId
      ? products.map((p) => (p.id === editingId ? next : p))
      : [...products, next];
    setProducts(updated);
    saveStoredProducts(updated);
    setOpen(false);
    setEditingId(null);
  }, [draft, editingId, products]);

  const setField = (key: string, value: unknown) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const inputClass =
    'w-full rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24]';

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
            Inventory
          </p>
          <h2 className="font-editorial text-3xl sm:text-[40px] font-medium text-[#1E1E1C]">
            Provisions &amp; pantry goods
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#63615C] pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className={`w-full min-h-[44px] rounded-lg pl-10 pr-4 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24] bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7]`}
            />
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[14px] font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add provision
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E5DFD7] bg-[#FFFFFF] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E5DFD7]">
            <thead className="bg-[#F3EFEA]">
              <tr>
                <th className="px-6 py-4 text-left text-[12px] font-semibold uppercase tracking-wider text-[#56423D]">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-[12px] font-semibold uppercase tracking-wider text-[#56423D]">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-[12px] font-semibold uppercase tracking-wider text-[#56423D]">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-[12px] font-semibold uppercase tracking-wider text-[#56423D]">
                  Dietary
                </th>
                <th className="px-6 py-4 text-left text-[12px] font-semibold uppercase tracking-wider text-[#56423D]">
                  Availability
                </th>
                <th className="px-6 py-4 text-right text-[12px] font-semibold uppercase tracking-wider text-[#56423D]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DFD7]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[13px] text-[#63615C]">
                    No matching provisions found.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-[#FBF9F5]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#E5DFD7]/60 bg-[#EBE8E4] shrink-0">
                          {product.image ? (
                            <img src={product.image} alt={product.imageAlt} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#63615C] text-[10px]">
                              -
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-[#1E1E1C]">{product.title}</p>
                          <p className="text-[12px] text-[#63615C]">
                            {product.originLabel}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#EBE8E4] text-[#4A5A3F]">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-[#1E1E1C] tabular-nums">
                        ${product.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {product.dietary.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#F3EFEA] text-[#4A5A3F] border border-transparent">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] text-[#56423D]">
                        {product.availabilityNote}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(product)}
                          className="p-2 text-[#56423D] hover:text-[#9E3D24] transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-[#BA1A1A] hover:bg-[#FBECEA] rounded-md transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
                {editingId ? 'Edit provision' : 'Add new provision'}
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
                    Title
                  </label>
                  <input
                    type="text"
                    value={draft.title ?? ''}
                    onChange={(e) => setField('title', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                    Category
                  </label>
                  <select
                    value={draft.category ?? 'Chef Provisions'}
                    onChange={(e) => setField('category', e.target.value)}
                    className={inputClass}
                  >
                    <option value="Chef Provisions">Chef Provisions</option>
                    <option value="Artisanal Pantry">Artisanal Pantry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={draft.price ?? ''}
                  onChange={(e) => setField('price', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                    Serving spec
                  </label>
                  <input
                    type="text"
                    value={draft.servingSpec ?? ''}
                    onChange={(e) => setField('servingSpec', e.target.value)}
                    placeholder="e.g. Serves 2 · 540g"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                    Prep time
                  </label>
                  <input
                    type="text"
                    value={draft.prepTime ?? ''}
                    onChange={(e) => setField('prepTime', e.target.value)}
                    placeholder="e.g. Ready in 8 min"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={draft.description ?? ''}
                  onChange={(e) => setField('description', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                  Origin label
                </label>
                <input
                  type="text"
                  value={draft.originLabel ?? ''}
                  onChange={(e) => setField('originLabel', e.target.value)}
                  placeholder="e.g. Emilia-Style Egg Ribbon"
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                  Availability note
                </label>
                <input
                  type="text"
                  value={draft.availabilityNote ?? ''}
                  onChange={(e) => setField('availabilityNote', e.target.value)}
                  placeholder="e.g. Chilled Weekly Batch"
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                  Dietary tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_TAGS.map((tag) => {
                    const selected = (draft.dietary ?? []).includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          const current = draft.dietary ?? [];
                          setField(
                            'dietary',
                            selected
                              ? current.filter((t) => t !== tag)
                              : [...current, tag],
                          );
                        }}
                        className={`px-3 py-1.5 rounded text-[12px] font-medium transition-colors shrink-0 cursor-pointer ${
                          selected
                            ? 'bg-[#4A5A3F] border-[#4A5A3F] text-[#FBF9F5]'
                            : 'bg-[#F3EFEA] border-[#E5DFD7] text-[#4A5A3F] border'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
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
                  Save provision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
