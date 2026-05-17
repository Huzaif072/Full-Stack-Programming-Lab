'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { useCartStore, useAuthStore } from '@/lib/store';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCartStore();
  const { user } = useAuthStore();
  const router = useRouter();

  const subtotal = total();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = Math.round(subtotal * 0.2 * 100) / 100;
  const grandTotal = Math.round((subtotal + shipping + tax) * 100) / 100;

  const handleCheckout = () => {
    if (!user) { toast.error('Please login to checkout'); router.push('/auth/login'); return; }
    router.push('/checkout');
  };

  return (
    <MainLayout>
      <div className="bg-[#f4f4f4] py-6 border-b border-[#e0e0e0]">
        <div className="max-w-[1400px] mx-auto px-4">
          <h1 className="font-display text-[28px] font-bold text-[#1f1f1f]">Shopping Cart</h1>
          <p className="text-[12px] text-[#999] mt-1">{count()} item{count() !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-10">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-[#ccc] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-[16px] text-[#999] mb-4">Your cart is empty</p>
            <Link href="/shop" className="bg-[#f78c2a] text-white px-8 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820] transition-colors">
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e0e0e0] text-[11px] font-bold uppercase tracking-widest text-[#999]">
                    <th className="text-left pb-4">Product</th>
                    <th className="text-center pb-4 hidden sm:table-cell">Price</th>
                    <th className="text-center pb-4">Qty</th>
                    <th className="text-right pb-4">Total</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.productId} className="border-b border-[#f0f0f0]">
                      <td className="py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 bg-[#f9f9f9] shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div>
                            <Link href={`/product/${item.productId}`} className="text-[13px] font-semibold text-[#1f1f1f] hover:text-[#f78c2a] transition-colors line-clamp-2">
                              {item.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 text-center text-[13px] hidden sm:table-cell">£{item.price.toFixed(2)}</td>
                      <td className="py-5 text-center">
                        <div className="flex items-center justify-center border border-[#d5d5d5] w-24 mx-auto">
                          <button onClick={() => updateQty(item.productId, item.qty - 1)} className="w-8 h-8 text-[16px] hover:bg-[#f4f4f4] transition-colors">-</button>
                          <span className="w-8 text-center text-[13px] font-semibold">{item.qty}</span>
                          <button onClick={() => updateQty(item.productId, item.qty + 1)} className="w-8 h-8 text-[16px] hover:bg-[#f4f4f4] transition-colors">+</button>
                        </div>
                      </td>
                      <td className="py-5 text-right text-[14px] font-bold">£{(item.price * item.qty).toFixed(2)}</td>
                      <td className="py-5 pl-4">
                        <button onClick={() => removeItem(item.productId)} className="text-[#ccc] hover:text-red-500 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between mt-6">
                <Link href="/shop" className="border border-[#d5d5d5] text-[#555] px-6 py-2.5 text-[12px] font-semibold uppercase tracking-widest hover:border-[#f78c2a] hover:text-[#f78c2a] transition-colors">
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-[#f4f4f4] p-6">
                <h2 className="font-display text-[18px] font-bold text-[#1f1f1f] mb-6 pb-3 border-b border-[#e0e0e0]">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#666]">Subtotal</span>
                    <span className="font-semibold">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#666]">Shipping</span>
                    <span className="font-semibold">{shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#666]">VAT (20%)</span>
                    <span className="font-semibold">£{tax.toFixed(2)}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[11px] text-[#f78c2a]">Free shipping on orders over £100</p>
                  )}
                </div>
                <div className="flex justify-between font-bold text-[16px] border-t border-[#d5d5d5] pt-4 mb-6">
                  <span>Total</span>
                  <span>£{grandTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#f78c2a] text-white py-4 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820] transition-colors mb-3"
                >
                  PROCEED TO CHECKOUT
                </button>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <span className="text-[10px] text-[#999]">Secure checkout</span>
                  <span className="text-[10px] text-[#999]">🔒 SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
