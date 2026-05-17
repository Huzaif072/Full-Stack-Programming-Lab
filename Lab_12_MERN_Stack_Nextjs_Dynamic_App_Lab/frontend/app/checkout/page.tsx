'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { useCartStore, useAuthStore } from '@/lib/store';
import { orderAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '', street: '', city: '', state: '', postalCode: '', country: 'UK', phone: '',
    paymentMethod: 'card',
  });

  const subtotal = total();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = Math.round(subtotal * 0.2 * 100) / 100;
  const grandTotal = Math.round((subtotal + shipping + tax) * 100) / 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error('Please login'); router.push('/auth/login'); return; }
    if (items.length === 0) { toast.error('Cart is empty'); return; }
    setLoading(true);
    try {
      const orderData = {
        items: items.map(i => ({ product: i.productId, qty: i.qty })),
        shippingAddress: { name: form.name, street: form.street, city: form.city, state: form.state, postalCode: form.postalCode, country: form.country, phone: form.phone },
        paymentMethod: form.paymentMethod,
      };
      const res = await orderAPI.create(orderData);
      // Simulate payment
      await orderAPI.pay(res.data.order._id, { id: 'sim_' + Date.now(), status: 'COMPLETED', email: user.email });
      clearCart();
      toast.success('Order placed successfully!');
      router.push(`/account/orders`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Order failed');
    } finally { setLoading(false); }
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <p className="text-[16px] text-[#999] mb-4">Please login to checkout</p>
          <button onClick={() => router.push('/auth/login')} className="bg-[#f78c2a] text-white px-8 py-3 text-[12px] font-bold tracking-widest uppercase">LOGIN</button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-[#f4f4f4] py-6 border-b border-[#e0e0e0]">
        <div className="max-w-[1400px] mx-auto px-4">
          <h1 className="font-display text-[28px] font-bold text-[#1f1f1f]">Checkout</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-[#e0e0e0] p-6">
                <h2 className="font-display text-[18px] font-bold text-[#1f1f1f] mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'name', label: 'Full Name', placeholder: 'John Smith', col: 2 },
                    { name: 'street', label: 'Street Address', placeholder: '123 Main Street', col: 2 },
                    { name: 'city', label: 'City', placeholder: 'London', col: 1 },
                    { name: 'state', label: 'County/State', placeholder: 'Greater London', col: 1 },
                    { name: 'postalCode', label: 'Postcode', placeholder: 'SW1A 1AA', col: 1 },
                    { name: 'phone', label: 'Phone Number', placeholder: '+44 7700 000000', col: 1 },
                  ].map(field => (
                    <div key={field.name} className={field.col === 2 ? 'sm:col-span-2' : ''}>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">{field.label}</label>
                      <input
                        name={field.name}
                        value={(form as any)[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required
                        className="w-full border border-[#d5d5d5] px-4 py-3 text-[13px] outline-none focus:border-[#f78c2a] transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white border border-[#e0e0e0] p-6">
                <h2 className="font-display text-[18px] font-bold text-[#1f1f1f] mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { value: 'card', label: 'Credit / Debit Card' },
                    { value: 'paypal', label: 'PayPal' },
                    { value: 'bank', label: 'Bank Transfer' },
                  ].map(m => (
                    <label key={m.value} className="flex items-center gap-3 cursor-pointer p-3 border border-[#e0e0e0] hover:border-[#f78c2a] transition-colors">
                      <input type="radio" name="paymentMethod" value={m.value} checked={form.paymentMethod === m.value} onChange={handleChange} className="accent-[#f78c2a]" />
                      <span className="text-[14px] font-medium text-[#333]">{m.label}</span>
                    </label>
                  ))}
                </div>
                {form.paymentMethod === 'card' && (
                  <div className="mt-4 p-4 bg-[#f9f9f9] text-[12px] text-[#666]">
                    <p>🔒 This is a demo. No real payment is processed.</p>
                    <p className="mt-1">Test card: 4242 4242 4242 4242 | Exp: 12/28 | CVV: 123</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-[#f4f4f4] p-6 sticky top-24">
                <h2 className="font-display text-[18px] font-bold text-[#1f1f1f] mb-6 pb-3 border-b border-[#e0e0e0]">Your Order</h2>
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.productId} className="flex justify-between items-center text-[13px]">
                      <span className="text-[#555] line-clamp-1 flex-1 mr-2">{item.name} × {item.qty}</span>
                      <span className="font-semibold whitespace-nowrap">£{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#e0e0e0] pt-4 space-y-2 mb-6">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#666]">Subtotal</span><span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#666]">Shipping</span><span>{shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#666]">VAT (20%)</span><span>£{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[16px] border-t border-[#d5d5d5] pt-3 mt-2">
                    <span>Total</span><span>£{grandTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading || items.length === 0}
                  className="w-full bg-[#f78c2a] text-white py-4 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820] disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Placing Order...' : 'PLACE ORDER'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
