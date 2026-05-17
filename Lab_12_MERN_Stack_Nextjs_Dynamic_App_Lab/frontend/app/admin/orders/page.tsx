'use client';
import { useEffect, useState } from 'react';
import { orderAPI } from '@/lib/api';
import toast from 'react-hot-toast';

const STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const STATUS_COLORS: Record<string, string> = {
  pending: 'text-yellow-700 bg-yellow-50 border-yellow-200',
  processing: 'text-blue-700 bg-blue-50 border-blue-200',
  shipped: 'text-purple-700 bg-purple-50 border-purple-200',
  delivered: 'text-green-700 bg-green-50 border-green-200',
  cancelled: 'text-red-700 bg-red-50 border-red-200',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = () => {
    const params: any = { limit: 50 };
    if (filter) params.status = filter;
    orderAPI.getAll(params)
      .then(r => setOrders(r.data.orders || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filter]);

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await orderAPI.updateStatus(orderId, status);
      toast.success(`Order status updated to ${status}`);
      load();
    } catch { toast.error('Update failed'); }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#1f1f1f]">Orders</h1>
          <p className="text-[13px] text-[#999]">{orders.length} orders found</p>
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="border border-[#d5d5d5] px-4 py-2.5 text-[13px] outline-none focus:border-[#f78c2a] bg-white">
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
        </select>
      </div>

      <div className="bg-white border border-[#e0e0e0]">
        {loading ? (
          <div className="text-center py-12 text-[#999]">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-[#999]">No orders found</div>
        ) : (
          <table className="w-full text-[13px]">
            <thead className="bg-[#f9f9f9]">
              <tr className="border-b border-[#e0e0e0]">
                {['Order #', 'Customer', 'Items', 'Total', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-[#999]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <>
                  <tr key={order._id} className="border-b border-[#f4f4f4] hover:bg-[#fafafa] cursor-pointer"
                    onClick={() => setExpanded(expanded === order._id ? null : order._id)}>
                    <td className="px-4 py-3 font-mono text-[12px] text-[#f78c2a]">{order.orderNumber}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{order.user?.name || '—'}</p>
                      <p className="text-[11px] text-[#999]">{order.user?.email}</p>
                    </td>
                    <td className="px-4 py-3 text-[#666]">{order.items?.length} item{order.items?.length !== 1 ? 's' : ''}</td>
                    <td className="px-4 py-3 font-bold">£{order.totalPrice?.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-1 border ${STATUS_COLORS[order.status] || 'text-gray-600 bg-gray-50 border-gray-200'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#999]">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <select value={order.status}
                        onChange={e => handleStatusChange(order._id, e.target.value)}
                        className="border border-[#d5d5d5] px-2 py-1 text-[12px] outline-none focus:border-[#f78c2a] bg-white">
                        {STATUSES.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                      </select>
                    </td>
                  </tr>
                  {expanded === order._id && (
                    <tr key={`${order._id}-detail`}>
                      <td colSpan={7} className="px-4 py-4 bg-[#f9f9f9] border-b border-[#e0e0e0]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-[#999] mb-2">Items</p>
                            {order.items?.map((item: any) => (
                              <div key={item._id} className="flex justify-between text-[13px] py-1">
                                <span>{item.name} × {item.qty}</span>
                                <span className="font-semibold">£{(item.price * item.qty).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-[#999] mb-2">Shipping Address</p>
                            {order.shippingAddress && (
                              <p className="text-[13px] text-[#555] leading-relaxed">
                                {order.shippingAddress.name}<br />
                                {order.shippingAddress.street}<br />
                                {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                                {order.shippingAddress.country}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-6 mt-4 pt-3 border-t border-[#e0e0e0] text-[13px]">
                          <span>Subtotal: <b>£{order.itemsPrice?.toFixed(2)}</b></span>
                          <span>Shipping: <b>{order.shippingPrice === 0 ? 'FREE' : `£${order.shippingPrice?.toFixed(2)}`}</b></span>
                          <span>VAT: <b>£{order.taxPrice?.toFixed(2)}</b></span>
                          <span className="font-bold text-[#f78c2a]">Total: £{order.totalPrice?.toFixed(2)}</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
