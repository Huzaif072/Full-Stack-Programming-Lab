'use client';
import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryPanels from '@/components/home/CategoryPanels';
import ProductTabs from '@/components/home/ProductTabs';
import HotDeal from '@/components/home/HotDeal';
import BlogSection from '@/components/home/BlogSection';
import { dealAPI } from '@/lib/api';

export default function HomePage() {
  const [deals, setDeals] = useState<any[]>([]);

  useEffect(() => {
    dealAPI.getAll().then((r: any) => setDeals(r.data.deals || [])).catch(() => {});
  }, []);

  const hotDeal = deals.find((d: any) => d.type === 'hot');

  return (
    <MainLayout>
      <HeroBanner />
      <CategoryPanels />
      <ProductTabs />
      <HotDeal deal={hotDeal} />
      <BlogSection />
    </MainLayout>
  );
}
