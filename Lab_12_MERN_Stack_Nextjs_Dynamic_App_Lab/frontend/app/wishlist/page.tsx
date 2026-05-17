'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import { useWishlistStore, useCartStore } from '@/lib/store';
import { productAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { items, toggle } = useWishlistStore();
  const addItem = useCartStore(s => s.addItem);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (items.length === 0) { setLoading(false); setProducts([]); return; }
    Promise.all(items.map(id => productAPI.getOne(id).then(r => r.data.product).catch(() => null)))
      .then(results => setProducts(results.filter(Boolean)))
      .finally(() => setLoading(false));
  }, [items.length]);

  const handleRemove = (productId: string) => {
    toggle(productId);
    setProducts(p => p.filter((pr: any) => pr._id !== productId));
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (product: any) => {
    addItem({ productId: product._id, name: product.name, price: product.price, image: product.mainImage, qty: 1 });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <MainLayout>
      <div className="bg-[#f4f4f4] py-6 border-b border-[#e0e0e0]">
        <div className="max-w-[1400px] mx-auto px-4">
          <h1 className="font-display text-[28px] font-bold text-[#1f1f1f]">My Wishlist</h1>
          <p className="text-[12px] text-[#999] mt-1">{items.length} item{items.length !== 1 ? 's' : ''} saved</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#f0f0f0] animate-pulse" style={{ aspectRatio: '3/4' }} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-[#ccc] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="text-[16px] text-[#999] mb-4">Your wishlist is empty</p>
            <Link href="/shop" className="bg-[#f78c2a] text-white px-8 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820] transition-colors">
              BROWSE PRODUCTS
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product: any) => (
              <div key={product._id} className="group bg-white border border-[#e8e8e8] hover:border-[#f78c2a] hover:shadow-md transition-all duration-300 relative">
                <button onClick={() => handleRemove(product._id)}
                  className="absolute top-2 right-2 z-10 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <Link href={`/product/${product.slug || product._id}`}>
                  <div className="relative overflow-hidden bg-[#f9f9f9]" style={{ aspectRatio: '1/1' }}>
                    <Image src={product.mainImage} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[13px] font-medium text-[#1f1f1f] mb-2 line-clamp-2 group-hover:text-[#f78c2a] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[15px] font-bold text-[#1f1f1f] mb-3">£{product.price.toFixed(2)}</p>
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <button onClick={() => handleAddToCart(product)}
                    className="w-full border border-[#1f1f1f] text-[#1f1f1f] text-[11px] font-semibold uppercase tracking-wider py-2 hover:bg-[#f78c2a] hover:border-[#f78c2a] hover:text-white transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
