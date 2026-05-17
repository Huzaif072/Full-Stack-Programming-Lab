'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { blogAPI } from '@/lib/api';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    blogAPI.getAll({ page, limit: 9 })
      .then(r => { setPosts(r.data.blogs); setTotalPages(r.data.pages); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <MainLayout>
      <div className="bg-[#f4f4f4] py-10 border-b border-[#e0e0e0]">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#f78c2a] mb-2">Our Journal</p>
          <h1 className="font-display text-[36px] font-bold text-[#1f1f1f]">Rustik Plank Blog</h1>
          <div className="w-12 h-0.5 bg-[#f78c2a] mx-auto mt-4" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-[#f0f0f0] animate-pulse rounded" style={{ aspectRatio: '4/3' }} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <article key={post._id} className="group bg-white overflow-hidden hover:shadow-md transition-shadow duration-300 border border-[#e8e8e8]">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                    <Image
                      src={post.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500'}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#f78c2a] text-white text-center px-3 py-2">
                      <div className="text-[18px] font-bold font-display leading-none">{new Date(post.createdAt).getDate()}</div>
                      <div className="text-[10px] uppercase tracking-wider">{new Date(post.createdAt).toLocaleString('default', { month: 'short' })}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    {post.tags?.length > 0 && (
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {post.tags.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="text-[10px] uppercase tracking-wider text-[#f78c2a] font-semibold">{tag}</span>
                        ))}
                      </div>
                    )}
                    <h2 className="font-display text-[18px] font-bold text-[#1f1f1f] mb-3 line-clamp-2 group-hover:text-[#f78c2a] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[13px] text-[#666] leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#999]">By {post.authorName}</span>
                      <Link href={`/blog/${post.slug}`}
                        className="border border-[#1f1f1f] text-[#1f1f1f] text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 hover:bg-[#f78c2a] hover:border-[#f78c2a] hover:text-white transition-colors">
                        READ MORE
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 text-[13px] border transition-colors ${page === i + 1 ? 'bg-[#f78c2a] border-[#f78c2a] text-white' : 'border-[#d5d5d5] text-[#555] hover:border-[#f78c2a] hover:text-[#f78c2a]'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}
