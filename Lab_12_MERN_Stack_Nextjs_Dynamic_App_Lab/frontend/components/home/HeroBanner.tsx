'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroBanner() {
  return (
    <section className="relative w-full bg-[#c5c5c5] overflow-hidden" style={{ minHeight: 580 }}>
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#c0bab5] via-[#c8c3be] to-[#d5d0ca]" />

      <div className="relative max-w-[1400px] mx-auto px-4 flex flex-col lg:flex-row items-center justify-between h-full py-16 lg:py-0 lg:min-h-[580px]">
        {/* Left content */}
        <div className="flex-1 z-10 max-w-xl">
          <p className="text-[12px] font-semibold tracking-[0.3em] uppercase text-[#6b5a4e] mb-3">
            Handcrafted Collection
          </p>
          <h1 className="font-display text-[44px] sm:text-[56px] lg:text-[64px] leading-tight font-bold text-[#1f1f1f] mb-6">
            Elite<br />
            <span className="text-[#8b5d33]">Design</span><br />
            Furniture
          </h1>
          <p className="text-[14px] text-[#4a4a4a] leading-relaxed mb-8 max-w-sm">
            Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum.
          </p>

          {/* Price tag */}
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-[13px] font-semibold text-[#8b5d33] uppercase tracking-wider">OUR PRICE</span>
            <div className="flex items-start">
              <span className="text-[28px] font-bold text-[#1f1f1f] font-display">£129</span>
              <span className="text-[16px] font-bold text-[#1f1f1f] mt-1">.99</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="bg-[#f78c2a] text-white px-8 py-3 text-[13px] font-semibold tracking-wider uppercase hover:bg-[#e07820] transition-colors"
            >
              ADD TO CART
            </Link>
            <Link
              href="/shop"
              className="border border-[#1f1f1f] text-[#1f1f1f] px-8 py-3 text-[13px] font-semibold tracking-wider uppercase hover:bg-[#1f1f1f] hover:text-white transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
        </div>

        {/* Right image */}
        <div className="flex-1 flex items-center justify-center lg:justify-end mt-10 lg:mt-0 relative">
          {/* Background shape */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#b8a898] opacity-30" />
          <div className="relative z-10">
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop"
              alt="Featured furniture piece"
              width={520}
              height={480}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
          {/* Floating badge */}
          <div className="absolute top-12 right-8 bg-[#f78c2a] text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg">
            <span className="text-[11px] font-bold tracking-wide">NEW</span>
            <span className="text-[11px]">ARRIVAL</span>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-white"
        style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
    </section>
  );
}
