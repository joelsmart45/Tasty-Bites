import { useState, useCallback } from 'react';
import { Search, Truck, CheckCircle, Clock, Package, Trash2 } from 'lucide-react';
import {
  getStoredOrders,
  saveStoredOrders,
  type Order,
} from '../../auth/auth';

const STATUS_LABELS: Record<Order['status'], { label: string; color: string }> = {
  pending: { label: 'Pending', color: '#56423D' },
  confirmed: { label: 'Confirmed', color: '#4A5A3F' },
  preparing: { label: 'Preparing', color: '#9E3D24' },
  delivered: { label: 'Delivered', color: '#1E1E1C' },
  cancelled: { label: 'Cancelled', color: '#BA1A1A' },
};

const STATUS_ICONS: Record<Order['status'], React.ElementType> = {
  pending: Clock,
  confirmed: Truck,
  preparing: Package,
  delivered: CheckCircle,
  cancelled: Trash2,
};

export function OrdersSection() {
  const [orders, setOrders] = useState<Order[]>(() => getStoredOrders());
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'' | Order['status']>('');

  const filtered = orders.filter((o) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerEmail.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q);
    const matchesStatus = !statusFilter || o.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleStatusChange = useCallback((id: string, next: Order['status']) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: next } : o));
    setOrders(updated);
    saveStoredOrders(updated);
  }, [orders]);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#4A5A3F]">
            Order management
          </p>
          <h2 className="font-editorial text-3xl sm:text-[40px] font-medium text-[#1E1E1C]">
            Cold-chain dispatch
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#63615C] pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by order, name or email..."
              className="w-full min-h-[44px] rounded-lg pl-10 pr-4 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24] bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E5DFD7] p-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
            Total orders
          </p>
          <p className="mt-1 font-editorial text-2xl font-semibold text-[#1E1E1C] tabular-nums">
            {orders.length}
          </p>
        </div>
        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E5DFD7] p-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
            Total revenue
          </p>
          <p className="mt-1 font-editorial text-2xl font-semibold text-[#1E1E1C] tabular-nums">
            ${totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </p>
        </div>
        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E5DFD7] p-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]">
            Pending dispatch
          </p>
          <p className="mt-1 font-editorial text-2xl font-semibold text-[#1E1E1C] tabular-nums">
            {orders.filter((o) => o.status === 'pending' || o.status === 'confirmed').length}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(['', 'pending', 'confirmed', 'preparing', 'delivered', 'cancelled'] as const).map(
          (status) => {
            const active = statusFilter === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#9E3D24] text-[#FBF9F5]'
                    : 'bg-[#F3EFEA] border border-[#E5DFD7] text-[#56423D] hover:bg-[#E5DFD7]'
                }`}
              >
                {status || 'All'}
              </button>
            );
          },
        )}
      </div>

      <div className="rounded-2xl border border-[#E5DFD7] bg-[#FFFFFF] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E5DFD7]">
            <thead className="bg-[#F3EFEA]">
              <tr>
                <th className="px-6 py-4 text-left text-[12px] font-semibold uppercase tracking-wider text-[#56423D]">
                  Order #
                </th>
                <th className="px-6 py-4 text-left text-[12px] font-semibold uppercase tracking-wider text-[#56423D]">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-[12px] font-semibold uppercase tracking-wider text-[#56423D]">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-[12px] font-semibold uppercase tracking-wider text-[#56423D]">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-[12px] font-semibold uppercase tracking-wider text-[#56423D]">
                  Items
                </th>
                <th className="px-6 py-4 text-right text-[12px] font-semibold uppercase tracking-wider text-[#56423D]">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DFD7]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[13px] text-[#63615C]">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => {
                  const status = STATUS_LABELS[order.status];
                  const Icon = STATUS_ICONS[order.status];
                  return (
                    <tr key={order.id} className="hover:bg-[#FBF9F5]/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-medium text-[#1E1E1C] tabular-nums">
                          #{order.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <p className="font-medium text-[#1E1E1C]">
                            {order.customerName}
                          </p>
                          <p className="text-[12px] text-[#63615C]">
                            {order.customerEmail}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-[#1E1E1C] tabular-nums">
                          ${order.total.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" style={{ color: status.color }} aria-hidden="true" />
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value as Order['status'])
                            }
                            className="text-[12px] font-medium bg-transparent border-none text-[#1E1E1C] focus:outline-none cursor-pointer"
                          >
                            {Object.entries(STATUS_LABELS).map(([key, val]) => (
                              <option key={key} value={key}>
                                {val.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[13px] text-[#56423D]">
                          {order.items.length} item{
                            order.items.length !== 1 ? 's' : ''
                          }
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-[12px] text-[#63615C] tabular-nums">
                          {new Date(order.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {orders.length === 0 && (
        <div className="rounded-2xl bg-[#F3EFEA] border border-[#E5DFD7] p-12 text-center">
          <p className="text-[13px] text-[#63615C]">
            No orders have been placed yet. Customer orders will appear here once checked out.
          </p>
        </div>
      )}
    </div>
  );
}
