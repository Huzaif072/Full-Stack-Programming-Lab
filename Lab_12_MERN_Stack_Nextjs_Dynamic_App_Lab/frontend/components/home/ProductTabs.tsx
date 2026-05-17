'use client';
import { useState, useEffect } from 'react';
import { productAPI } from '@/lib/api';
import ProductCard from '../product/ProductCard';
import Link from 'next/link';

const TABS = [
  { key: 'featured', label: 'FEATURED', linkLabel: 'See All Feature' },
  { key: 'special',  label: 'SPECIAL',  linkLabel: 'See All Special' },
  { key: 'popular',  label: 'POPULAR',  linkLabel: 'See All Popular' },
];

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('featured');
  const [data, setData] = useState<{ featured: any[]; special: any[]; popular: any[] }>({
    featured: [], special: [], popular: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getFeaturedAll()
      .then(r => {
        setData({ featured: r.data.featured, special: r.data.special, popular: r.data.popular });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const products = data[activeTab as keyof typeof data] || [];

  return (
    <section className="py-16 bg-[#f9f9f9]">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Tab headers — matching PSD layout */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 border-b border-[#e0e0e0] pb-4 gap-4">
          <div className="flex gap-6 sm:gap-10">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-[13px] font-bold tracking-widest uppercase pb-1 transition-colors relative
                  ${activeTab === tab.key
                    ? 'text-[#1f1f1f] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#f78c2a]'
                    : 'text-[#999] hover:text-[#1f1f1f]'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <Link
            href={`/shop?${activeTab}=true`}
            className="text-[12px] text-[#f78c2a] hover:underline font-medium"
          >
            {TABS.find(t => t.key === activeTab)?.linkLabel} →
          </Link>
        </div>

        {/* Product grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#f0f0f0] animate-pulse" style={{ aspectRatio: '3/4' }} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-[#aaa]">
            <p className="text-[15px]">No products found</p>
            <Link href="/shop" className="text-[#f78c2a] text-[13px] mt-2 inline-block hover:underline">Browse all products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p: any) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
