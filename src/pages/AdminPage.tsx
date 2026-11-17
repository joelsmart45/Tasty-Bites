import { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  CreditCard,
  Utensils,
  Settings,
  LogOut,
  User,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DashboardSection } from './admin/DashboardSection';
import { ProductsSection } from './admin/ProductsSection';
import { OrdersSection } from './admin/OrdersSection';
import { CateringSectionAdmin } from './admin/CateringSection';
import { SettingsSection } from './admin/SettingsSection';

const ADMIN_NAV: { id: string; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Provisions & Pantry', icon: ShoppingCart },
  { id: 'orders', label: 'Orders', icon: CreditCard },
  { id: 'catering', label: 'Catering Menus', icon: Utensils },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function AdminPage() {
  const { user, logout, hasRole } = useAuth();
  const [section, setSection] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!hasRole('admin')) {
    window.location.hash = '#/login';
    return null;
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1E1E1C] flex flex-col">
      <header className="sticky top-0 z-30 bg-[#FBF9F5]/90 backdrop-blur border-b border-[#E5DFD7]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E5DFD7] bg-[#F3EFEA] text-[#1E1E1C] hover:border-[#D1C7BC] transition-colors cursor-pointer"
            >
              <span className="w-5 h-5" />
            </button>
            <div className="font-editorial text-xl font-semibold tracking-tight whitespace-nowrap">
              Maison Larder
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4A5A3F] bg-[#EBE8E4] px-2 py-0.5 rounded-md">
              Admin
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 text-[13px]">
              <div className="flex items-center gap-1.5 text-[#56423D]">
                <User className="w-4 h-4" aria-hidden="true" />
                <span>{user?.name ?? 'Admin'}</span>
              </div>
              <span className="w-px h-3 bg-[#D1C7BC]" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4A5A3F]">
                {user?.role ?? 'customer'}
              </span>
            </div>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E5DFD7] bg-[#F3EFEA] text-[#1E1E1C] hover:bg-[#FBECEA] hover:text-[#BA1A1A] hover:border-[#E2B8B0] transition-colors cursor-pointer"
              aria-label="Sign out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-[#FFFFFF] border-r border-[#E5DFD7] flex flex-col transform transition-transform duration-200 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:relative md:translate-x-0 md:static md:inset-0 md:z-auto md:w-64 md:flex-shrink-0`}
        >
          <div className="flex-1 flex flex-col py-6">
            <nav className="space-y-1 px-3">
              {ADMIN_NAV.map((item) => {
                const active = section === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSection(item.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-colors ${
                      active
                        ? 'bg-[#9E3D24]/10 border border-[#9E3D24]/30 text-[#9E3D24] font-semibold'
                        : 'text-[#56423D] hover:bg-[#F3EFEA] hover:text-[#1E1E1C]'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-[#000]/20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:pl-64 lg:p-12">
          <div className="max-w-[1360px] mx-auto">
            {section === 'dashboard' && <DashboardSection />}
            {section === 'products' && <ProductsSection />}
            {section === 'orders' && <OrdersSection />}
            {section === 'catering' && <CateringSectionAdmin />}
            {section === 'settings' && <SettingsSection />}
          </div>
        </main>
      </div>
    </div>
  );
}
