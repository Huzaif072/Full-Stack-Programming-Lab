'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { Toaster } from 'react-hot-toast';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/products', label: 'Products', icon: '📦' },
  { href: '/admin/categories', label: 'Categories', icon: '🗂' },
  { href: '/admin/orders', label: 'Orders', icon: '🛍' },
  { href: '/admin/blog', label: 'Blog Posts', icon: '✍️' },
  { href: '/', label: '← Visit Site', icon: '🏠' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) { router.push('/auth/login'); return; }
    if (user.role !== 'admin') { router.push('/'); }
  }, [user, router]);

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="flex min-h-screen bg-[#f4f4f4]">
      <Toaster position="top-right" />
      {/* Sidebar */}
      <aside className="w-56 bg-[#1f1f1f] text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-[#333]">
          <p className="font-display text-[16px] font-bold tracking-wider">Rustik Plank</p>
          <p className="text-[10px] text-[#999] mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 py-4">
          {NAV.map(item => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-5 py-3 text-[13px] transition-colors hover:bg-[#f78c2a] hover:text-white
                ${pathname === item.href ? 'bg-[#f78c2a] text-white' : 'text-[#aaa]'}`}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#333]">
          <p className="text-[11px] text-[#666]">{user.name}</p>
          <p className="text-[10px] text-[#555]">{user.email}</p>
        </div>
      </aside>
      {/* Main */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
