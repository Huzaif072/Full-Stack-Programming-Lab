'use client';
import { useEffect, useState } from 'react';
import { productAPI, orderAPI, categoryAPI, blogAPI } from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, categories: 0, blogs: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      productAPI.getAll({ limit: 1 }),
      orderAPI.getAll({ limit: 5 }),
      categoryAPI.getAll(),
      blogAPI.getAll({ limit: 1 }),
    ]).then(([prod, ord, cat, blog]) => {
      const orders = ord.data.orders || [];
      const revenue = orders.reduce((sum: number, o: any) => sum + (o.totalPrice || 0), 0);
      setStats({
        products: prod.data.pagination?.total || 0,
        orders: ord.data.total || 0,
        categories: cat.data.categories?.length || 0,
        blogs: blog.data.total || 0,
        revenue,
      });
      setRecentOrders(orders.slice(0, 5));
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const STATUS_COLORS: Record<string, string> = {
    pending: 'text-yellow-600 bg-yellow-50',
    processing: 'text-blue-600 bg-blue-50',
    shipped: 'text-purple-600 bg-purple-50',
    delivered: 'text-green-600 bg-green-50',
    cancelled: 'text-red-600 bg-red-50',
  };

  return (
    <div className="p-8">
      <h1 className="font-display text-[28px] font-bold text-[#1f1f1f] mb-2">Dashboard</h1>
      <p className="text-[13px] text-[#999] mb-8">Welcome to Rustik Plank Admin</p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {[
          { label: 'Total Products', value: stats.products, icon: '📦', color: 'border-[#f78c2a]' },
          { label: 'Total Orders', value: stats.orders, icon: '🛍', color: 'border-blue-400' },
          { label: 'Categories', value: stats.categories, icon: '🗂', color: 'border-green-400' },
          { label: 'Blog Posts', value: stats.blogs, icon: '✍️', color: 'border-purple-400' },
        ].map(s => (
          <div key={s.label} className={`bg-white border-t-4 ${s.color} p-5 shadow-sm`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[24px]">{s.icon}</span>
              <span className="text-[28px] font-bold font-display text-[#1f1f1f]">
                {loading ? '—' : s.value}
              </span>
            </div>
            <p className="text-[12px] text-[#999] uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Add Product', href: '/admin/products?action=new', icon: '➕' },
          { label: 'Add Category', href: '/admin/categories?action=new', icon: '📁' },
          { label: 'View Orders', href: '/admin/orders', icon: '📋' },
          { label: 'Write Post', href: '/admin/blog?action=new', icon: '✏️' },
        ].map(a => (
          <a key={a.label} href={a.href}
            className="bg-white border border-[#e0e0e0] hover:border-[#f78c2a] p-4 text-center transition-colors group">
            <span className="text-[28px] block mb-2">{a.icon}</span>
            <span className="text-[12px] font-semibold text-[#555] group-hover:text-[#f78c2a] transition-colors uppercase tracking-wider">{a.label}</span>
          </a>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white border border-[#e0e0e0] p-6">
        <h2 className="font-display text-[18px] font-bold text-[#1f1f1f] mb-5">Recent Orders</h2>
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => <div key={i} className="h-12 bg-[#f0f0f0] animate-pulse rounded" />)}
          </div>
        ) : recentOrders.length === 0 ? (
          <p className="text-[13px] text-[#999] py-8 text-center">No orders yet</p>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#e0e0e0]">
                {['Order #', 'Customer', 'Total', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left pb-3 text-[11px] font-bold uppercase tracking-wider text-[#999]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order._id} className="border-b border-[#f4f4f4] hover:bg-[#fafafa]">
                  <td className="py-3 font-mono text-[12px]">{order.orderNumber}</td>
                  <td className="py-3">{order.user?.name || '—'}</td>
                  <td className="py-3 font-semibold">£{order.totalPrice?.toFixed(2)}</td>
                  <td className="py-3">
                    <span className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-1 rounded ${STATUS_COLORS[order.status] || 'text-gray-600 bg-gray-50'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 text-[#999]">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <a href="/admin/orders" className="inline-block mt-4 text-[12px] text-[#f78c2a] font-semibold hover:underline">
          View all orders →
        </a>
      </div>
    </div>
  );
}
