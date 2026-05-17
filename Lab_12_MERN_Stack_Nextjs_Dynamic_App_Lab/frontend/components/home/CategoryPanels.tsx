'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { categoryAPI } from '@/lib/api';

const FALLBACK = [
  { name: 'CHAIRS', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop', slug: 'chairs' },
  { name: 'BEDS', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=500&fit=crop', slug: 'beds' },
  { name: 'TABLES', image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=500&h=500&fit=crop', slug: 'tables' },
];

export default function CategoryPanels() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    categoryAPI.getAll()
      .then(r => setCategories(r.data.categories.slice(0, 3)))
      .catch(() => {});
  }, []);

  const display: { name: string; image: string; slug: string; id?: string }[] = categories.length > 0
    ? categories.map((c: any, i: number) => ({
        name: c.name.toUpperCase(),
        image: c.image || FALLBACK[i % 3].image,
        slug: c.slug,
        id: c._id,
      }))
    : FALLBACK;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {display.map((cat, i) => (
            <Link
              key={cat.slug || i}
              href={`/shop?category=${cat.id || cat.slug}`}
              className="group relative overflow-hidden bg-[#f4f4f4] rounded-sm"
              style={{ aspectRatio: '4/3' }}
            >
              {/* Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

              {/* Text overlay - bottom left like PSD */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-[22px] font-bold text-white font-display tracking-wider">
                  {cat.name}
                </h3>
                <p className="text-[12px] text-white/80 tracking-[0.25em] uppercase mt-1">
                  COLLECTION
                </p>
                <div className="mt-3 inline-block border border-white text-white text-[11px] px-4 py-1.5 
                  tracking-wider uppercase group-hover:bg-[#f78c2a] group-hover:border-[#f78c2a] transition-colors">
                  Shop Now
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
