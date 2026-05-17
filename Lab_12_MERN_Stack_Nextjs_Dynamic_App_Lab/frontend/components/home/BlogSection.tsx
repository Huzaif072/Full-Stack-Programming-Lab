'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogAPI } from '@/lib/api';

export default function BlogSection() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    blogAPI.getAll({ limit: 3 }).then(r => setPosts(r.data.blogs)).catch(() => {});
  }, []);

  const fallback = [
    { title: 'The Art of Reclaimed Wood Furniture', slug: 'art-of-reclaimed', excerpt: 'Discover the beauty and sustainability of reclaimed wood.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500', createdAt: new Date().toISOString() },
    { title: 'How to Care for Solid Wood Furniture', slug: 'care-solid-wood', excerpt: 'Keep your furniture looking beautiful for generations.', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500', createdAt: new Date().toISOString() },
    { title: 'Designing Your Perfect Rustic Living Room', slug: 'rustic-living', excerpt: 'Interior design tips for a warm, inviting rustic space.', image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=500', createdAt: new Date().toISOString() },
  ];

  const display = posts.length > 0 ? posts : fallback;

  return (
    <section className="py-16 bg-[#f9f9f9]">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#f78c2a] mb-2">Our Journal</p>
          <h2 className="font-display text-[32px] font-bold text-[#1f1f1f]">Latest Updates</h2>
          <div className="w-12 h-0.5 bg-[#f78c2a] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {display.map((post: any, i: number) => (
            <article key={post._id || i} className="group bg-white overflow-hidden hover:shadow-md transition-shadow duration-300">
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                <Image
                  src={post.image || `https://images.unsplash.com/photo-${1555041469 + i * 100}?w=500`}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Date badge */}
                <div className="absolute top-4 left-4 bg-[#f78c2a] text-white text-center px-3 py-2">
                  <div className="text-[18px] font-bold font-display leading-none">
                    {new Date(post.createdAt).getDate()}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider">
                    {new Date(post.createdAt).toLocaleString('default', { month: 'short' })}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-[16px] font-semibold text-[#1f1f1f] font-display mb-3 line-clamp-2 group-hover:text-[#f78c2a] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[13px] text-[#666] leading-relaxed mb-5 line-clamp-3">
                  {post.excerpt || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block border border-[#1f1f1f] text-[#1f1f1f] text-[11px] font-semibold uppercase tracking-widest px-5 py-2
                    hover:bg-[#f78c2a] hover:border-[#f78c2a] hover:text-white transition-colors"
                >
                  READ MORE
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/blog" className="inline-block border border-[#1f1f1f] text-[#1f1f1f] px-10 py-3 text-[12px] font-semibold tracking-widest uppercase hover:bg-[#f78c2a] hover:border-[#f78c2a] hover:text-white transition-colors">
            VIEW ALL POSTS
          </Link>
        </div>
      </div>
    </section>
  );
}
