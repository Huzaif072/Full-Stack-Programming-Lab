import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="bg-[#f4f4f4] py-10 border-b border-[#e0e0e0]">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#f78c2a] mb-2">Our Story</p>
          <h1 className="font-display text-[36px] font-bold text-[#1f1f1f]">About Rustik Plank</h1>
          <div className="w-12 h-0.5 bg-[#f78c2a] mx-auto mt-4" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-16">
        {/* Mission section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#f78c2a] mb-3">Who We Are</p>
            <h2 className="font-display text-[32px] font-bold text-[#1f1f1f] mb-6 leading-tight">
              Crafting Furniture<br />
              <span className="text-[#8b5d33]">With Purpose & Pride</span>
            </h2>
            <p className="text-[14px] text-[#555] leading-relaxed mb-4">
              Rustik Plank was founded in 2015 with a simple mission: to create beautiful, durable furniture from sustainably sourced and reclaimed wood. Every piece we make tells a story — of the trees that gave their timber, the craftsmen who shaped it, and the homes it will grace for generations.
            </p>
            <p className="text-[14px] text-[#555] leading-relaxed mb-4">
              Our workshop in the heart of the English countryside brings together traditional joinery techniques and contemporary design sensibilities. We believe that furniture should be bought once and treasured forever.
            </p>
            <p className="text-[14px] text-[#555] leading-relaxed mb-8">
              All of our timber is sourced from FSC-certified forests or reclaimed from historic buildings, ensuring that every purchase supports sustainable forestry and reduces waste.
            </p>
            <Link href="/shop" className="inline-block bg-[#f78c2a] text-white px-8 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820] transition-colors">
              EXPLORE OUR COLLECTION
            </Link>
          </div>
          <div className="relative h-[400px] lg:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&h=600&fit=crop"
              alt="Our workshop"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 bg-[#f4f4f4] py-10 px-6">
          {[
            { num: '2015', label: 'Founded' },
            { num: '5,000+', label: 'Pieces Made' },
            { num: '98%', label: 'Happy Customers' },
            { num: '100%', label: 'Sustainable Wood' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-[42px] font-bold text-[#f78c2a] leading-none">{stat.num}</p>
              <p className="text-[13px] text-[#666] mt-2 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h2 className="font-display text-[28px] font-bold text-[#1f1f1f] mb-3">Our Values</h2>
          <div className="w-12 h-0.5 bg-[#f78c2a] mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: '🌱', title: 'Sustainability', desc: 'Every piece uses sustainably sourced or reclaimed timber. We plant a tree for every order placed.' },
            { icon: '🔨', title: 'Craftsmanship', desc: 'Traditional joinery techniques passed down through generations. Built to last a lifetime, not a season.' },
            { icon: '🏠', title: 'Community', desc: 'We work with local craftsmen, support rural communities, and celebrate British making traditions.' },
          ].map(val => (
            <div key={val.title} className="text-center p-8 border border-[#e0e0e0] hover:border-[#f78c2a] transition-colors">
              <div className="text-[40px] mb-4">{val.icon}</div>
              <h3 className="font-display text-[20px] font-bold text-[#1f1f1f] mb-3">{val.title}</h3>
              <p className="text-[13px] text-[#666] leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
