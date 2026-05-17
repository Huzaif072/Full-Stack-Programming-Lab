'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface HotDealProps {
  deal?: {
    title?: string;
    subtitle?: string;
    description?: string;
    discountPercent?: number;
    image?: string;
    badge?: string;
    linkUrl?: string;
  };
}

export default function HotDeal({ deal }: HotDealProps) {
  const [timeLeft, setTimeLeft] = useState({ h: 11, m: 47, s: 33 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fmt = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#f4f4f4] overflow-hidden">
          {/* Left — Product image */}
          <div className="relative bg-[#e8ddd4]" style={{ minHeight: 400 }}>
            <Image
              src={deal?.image || 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=700&h=600&fit=crop'}
              alt="Hot Deal"
              fill
              className="object-cover"
            />
            {/* Discount badge overlay */}
            <div className="absolute top-6 left-6 bg-[#1f1f1f] text-white px-5 py-3 text-center">
              <div className="text-[32px] font-bold font-display leading-none">
                {deal?.discountPercent || 50}%
              </div>
              <div className="text-[11px] tracking-widest uppercase">Sale OFF</div>
            </div>
          </div>

          {/* Right — Deal info */}
          <div className="flex flex-col justify-center p-10 lg:p-14">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#f78c2a] mb-3">
              {deal?.subtitle || 'Hot Deal'}
            </p>
            <h2 className="font-display text-[34px] sm:text-[40px] font-bold text-[#1f1f1f] leading-tight mb-3">
              {deal?.title || 'Elite Collection'}
              <br />
              <span className="text-[#8b5d33]">Design Furniture</span>
            </h2>
            <p className="text-[13px] text-[#666] leading-relaxed mb-6 max-w-sm">
              {deal?.description || 'Reclaimed and hand crafted — each piece tells a story. Limited time offer on our most popular collection.'}
            </p>

            {/* Countdown timer */}
            <div className="flex items-center gap-3 mb-8">
              <div className="text-center">
                <div className="bg-[#1f1f1f] text-white text-[24px] font-bold w-14 h-14 flex items-center justify-center font-display">
                  {fmt(timeLeft.h)}
                </div>
                <p className="text-[10px] text-[#999] mt-1 uppercase tracking-wider">Hours</p>
              </div>
              <span className="text-[24px] font-bold text-[#ccc] mb-4">:</span>
              <div className="text-center">
                <div className="bg-[#1f1f1f] text-white text-[24px] font-bold w-14 h-14 flex items-center justify-center font-display">
                  {fmt(timeLeft.m)}
                </div>
                <p className="text-[10px] text-[#999] mt-1 uppercase tracking-wider">Mins</p>
              </div>
              <span className="text-[24px] font-bold text-[#ccc] mb-4">:</span>
              <div className="text-center">
                <div className="bg-[#f78c2a] text-white text-[24px] font-bold w-14 h-14 flex items-center justify-center font-display">
                  {fmt(timeLeft.s)}
                </div>
                <p className="text-[10px] text-[#999] mt-1 uppercase tracking-wider">Secs</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={deal?.linkUrl || '/shop?hotDeal=true'}
                className="bg-[#f78c2a] text-white px-8 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820] transition-colors"
              >
                SHOP NOW
              </Link>
              <Link
                href="/shop"
                className="border border-[#1f1f1f] text-[#1f1f1f] px-8 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#1f1f1f] hover:text-white transition-colors"
              >
                VIEW ALL
              </Link>
            </div>
          </div>
        </div>

        {/* Second deal row — 35% off badge matching PSD */}
        <div className="mt-6 bg-[#1f1f1f] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#f78c2a] text-white text-center px-4 py-2">
              <span className="text-[20px] font-bold font-display">35%</span>
              <p className="text-[10px] tracking-wider">OFF</p>
            </div>
            <div>
              <p className="text-white font-semibold text-[15px]">Weekend Special Offer</p>
              <p className="text-[#999] text-[12px]">On selected chairs and tables</p>
            </div>
          </div>
          <Link href="/shop" className="border border-[#f78c2a] text-[#f78c2a] px-6 py-2.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#f78c2a] hover:text-white transition-colors whitespace-nowrap">
            GRAB DEAL
          </Link>
        </div>
      </div>
    </section>
  );
}
