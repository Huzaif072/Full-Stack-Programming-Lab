'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import ProductCard from '@/components/product/ProductCard';
import { productAPI, categoryAPI } from '@/lib/api';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  const categoryId = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const featured = searchParams.get('featured') || '';
  const special = searchParams.get('special') || '';
  const popular = searchParams.get('popular') || '';
  const hotDeal = searchParams.get('hotDeal') || '';
  const sort = searchParams.get('sort') || 'newest';
  const page = Number(searchParams.get('page') || 1);

  useEffect(() => {
    categoryAPI.getAll().then(r => setCategories(r.data.categories)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params: any = { page, sort, limit: 12 };
    if (categoryId) params.category = categoryId;
    if (search) params.search = search;
    if (featured) params.featured = featured;
    if (special) params.special = special;
    if (popular) params.popular = popular;
    if (hotDeal) params.hotDeal = hotDeal;

    productAPI.getAll(params)
      .then(r => { setProducts(r.data.products); setPagination(r.data.pagination); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [categoryId, search, featured, special, popular, hotDeal, sort, page]);

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    params.delete('page');
    router.push(`/shop?${params.toString()}`);
  };

  const setPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(p));
    router.push(`/shop?${params.toString()}`);
  };

  const activeCategory = categories.find((c: any) => c._id === categoryId);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="text-[12px] text-[#999] mb-8">
        <span>Home</span>
        <span className="mx-2">/</span>
        <span>{activeCategory ? activeCategory.name : search ? `Search: "${search}"` : 'Shop'}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="w-full lg:w-60 shrink-0">
          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#1f1f1f] mb-4 pb-2 border-b border-[#e0e0e0]">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setParam('category', '')}
                  className={`text-[13px] w-full text-left py-1 hover:text-[#f78c2a] transition-colors ${!categoryId ? 'text-[#f78c2a] font-semibold' : 'text-[#555]'}`}>
                  All Products
                </button>
              </li>
              {categories.map((cat: any) => (
                <li key={cat._id}>
                  <button onClick={() => setParam('category', cat._id)}
                    className={`text-[13px] w-full text-left py-1 hover:text-[#f78c2a] transition-colors ${categoryId === cat._id ? 'text-[#f78c2a] font-semibold' : 'text-[#555]'}`}>
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Filter by type */}
          <div className="mb-8">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#1f1f1f] mb-4 pb-2 border-b border-[#e0e0e0]">
              Filter
            </h3>
            {[
              { key: 'featured', label: 'Featured' },
              { key: 'special', label: 'Special' },
              { key: 'popular', label: 'Popular' },
              { key: 'hotDeal', label: 'Hot Deals' },
            ].map(f => (
              <label key={f.key} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input type="checkbox"
                  checked={searchParams.get(f.key) === 'true'}
                  onChange={e => setParam(f.key, e.target.checked ? 'true' : '')}
                  className="accent-[#f78c2a]"
                />
                <span className="text-[13px] text-[#555]">{f.label}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Products area */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <p className="text-[13px] text-[#666]">
              {loading ? 'Loading...' : `Showing ${products.length} of ${pagination.total} products`}
            </p>
            <select
              value={sort}
              onChange={e => setParam('sort', e.target.value)}
              className="border border-[#d5d5d5] text-[13px] px-3 py-2 outline-none bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rating</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-[#f0f0f0] animate-pulse rounded" style={{ aspectRatio: '3/4' }} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[16px] text-[#999]">No products found</p>
              <button onClick={() => router.push('/shop')} className="mt-4 text-[#f78c2a] text-[13px] underline">
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {products.map((p: any) => <ProductCard key={p._id} product={p} />)}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {[...Array(pagination.pages)].map((_, i) => (
                    <button key={i} onClick={() => setPage(i + 1)}
                      className={`w-9 h-9 text-[13px] border transition-colors
                        ${page === i + 1 ? 'bg-[#f78c2a] border-[#f78c2a] text-white' : 'border-[#d5d5d5] text-[#555] hover:border-[#f78c2a] hover:text-[#f78c2a]'}`}>
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <MainLayout>
      {/* Shop banner */}
      <div className="bg-[#f4f4f4] py-8 border-b border-[#e0e0e0]">
        <div className="max-w-[1400px] mx-auto px-4">
          <h1 className="font-display text-[28px] font-bold text-[#1f1f1f]">Shop</h1>
        </div>
      </div>
      <Suspense fallback={<div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-2 border-[#f78c2a] rounded-full border-t-transparent" /></div>}>
        <ShopContent />
      </Suspense>
    </MainLayout>
  );
}
