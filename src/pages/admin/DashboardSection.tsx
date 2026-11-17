import { useState, useEffect } from 'react';
import {
  getStoredProducts,
  getStoredOrders,
  getStoredCateringTiers,
  seedDemoData,
} from '../../auth/auth';
import { CreditCard, Truck, Package, UtensilsCrossed } from 'lucide-react';

const STATS: { icon: React.ElementType; label: string; value: string; sub: string }[] = [
  { icon: Package, label: 'Products live', value: '0', sub: 'across provisions & pantry' },
  { icon: CreditCard, label: 'Total orders', value: '0', sub: 'cold-chain dispatch' },
  { icon: Truck, label: 'Total revenue', value: '$0.00', sub: 'lifetime sales' },
  { icon: UtensilsCrossed, label: 'Catering tiers', value: '0', sub: 'banquet configurations' },
];

export function DashboardSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [catering, setCatering] = useState<any[]>([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    seedDemoData();
    setProducts(getStoredProducts());
    setOrders(getStoredOrders());
    setCatering(getStoredCateringTiers());
    const total = orders.reduce((sum, o) => sum + o.total, 0);
    setRevenue(total);
  }, []);

  const statNodes = [
    { ...STATS[0], value: String(products.length) },
    { ...STATS[1], value: String(orders.length) },
    { ...STATS[2], value: revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
    { ...STATS[3], value: String(catering.length) },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
            Larder Overview
          </p>
          <h2 className="font-editorial text-3xl sm:text-[40px] font-medium text-[#1E1E1C]">
            Kitchen command center
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statNodes.map((stat, idx) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-[#FFFFFF] border border-[#E5DFD7] p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
                  {stat.label}
                </p>
                <p className="text-[13px] text-[#63615C] mt-0.5">{stat.sub}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#F3EFEA] flex items-center justify-center text-[#9E3D24]">
                <stat.icon className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
            <p className="mt-4 font-editorial text-2xl font-semibold text-[#1E1E1C] tabular-nums">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E5DFD7] p-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D] mb-4">
            Recent activity
          </p>
          <div className="space-y-4">
            {orders
              .slice()
              .reverse()
              .slice(0, 5)
              .map((o) => (
                <div key={o.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EBE8E4] flex items-center justify-center shrink-0">
                    <CreditCard className="w-4 h-4 text-[#56423D]" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[#1E1E1C] truncate">
                      Order #{o.id} &mdash; {o.customerName}
                    </p>
                    <p className="text-[12px] text-[#63615C]">
                      {o.total.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })} &middot; {o.status}
                    </p>
                  </div>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#4A5A3F]">
                    {o.status}
                  </span>
                </div>
              ))}
            {orders.length === 0 && (
              <p className="text-[13px] text-[#63615C] text-center py-4">
                No orders yet. Provisions await their first dispatch.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E5DFD7] p-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D] mb-4">
            Quick actions
          </p>
          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-[#E5DFD7] bg-[#FBF9F5] text-left text-[14px] text-[#1E1E1C] hover:bg-[#F3EFEA] transition-colors cursor-pointer"
            >
              <span>Add a new provision</span>
              <UtensilsCrossed className="w-4 h-4 text-[#9E3D24]" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-[#E5DFD7] bg-[#FBF9F5] text-left text-[14px] text-[#1E1E1C] hover:bg-[#F3EFEA] transition-colors cursor-pointer"
            >
              <span>Review pending orders</span>
              <CreditCard className="w-4 h-4 text-[#9E3D24]" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-[#E5DFD7] bg-[#FBF9F5] text-left text-[14px] text-[#1E1E1C] hover:bg-[#F3EFEA] transition-colors cursor-pointer"
            >
              <span>Configure catering tier</span>
              <UtensilsCrossed className="w-4 h-4 text-[#9E3D24]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
