'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { orderAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { router.push('/auth/login'); return; }
    orderAPI.getMyOrders()
      .then(r => setOrders(r.data.orders))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, router]);

  if (!user) return null;

  return (
    <MainLayout>
      <div className="bg-[#f4f4f4] py-6 border-b border-[#e0e0e0]">
        <div className="max-w-[1400px] mx-auto px-4">
          <h1 className="font-display text-[28px] font-bold text-[#1f1f1f]">My Orders</h1>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-[#f78c2a] rounded-full border-t-transparent" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[16px] text-[#999] mb-4">You haven't placed any orders yet.</p>
            <Link href="/shop" className="bg-[#f78c2a] text-white px-8 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820] transition-colors">
              START SHOPPING
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="bg-white border border-[#e0e0e0] p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="font-semibold text-[15px] text-[#1f1f1f]">#{order.orderNumber}</p>
                    <p className="text-[12px] text-[#999]">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                      {order.status}
                    </span>
                    <span className="text-[15px] font-bold text-[#1f1f1f]">£{order.totalPrice?.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {order.items?.slice(0, 3).map((item: any) => (
                    <span key={item._id} className="text-[12px] text-[#666] bg-[#f9f9f9] px-3 py-1">
                      {item.name} × {item.qty}
                    </span>
                  ))}
                  {order.items?.length > 3 && (
                    <span className="text-[12px] text-[#999] px-3 py-1">+{order.items.length - 3} more</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
