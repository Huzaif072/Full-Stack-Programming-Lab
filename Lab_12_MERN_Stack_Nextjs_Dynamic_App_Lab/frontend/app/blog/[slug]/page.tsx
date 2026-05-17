'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { blogAPI } from '@/lib/api';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    blogAPI.getOne(slug as string)
      .then(r => setPost(r.data.blog))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin w-10 h-10 border-2 border-[#f78c2a] rounded-full border-t-transparent" />
      </div>
    </MainLayout>
  );

  if (!post) return (
    <MainLayout>
      <div className="text-center py-20">
        <p className="text-[18px] text-[#999]">Post not found</p>
        <Link href="/blog" className="text-[#f78c2a] mt-4 inline-block underline">Back to blog</Link>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout>
      {/* Hero image */}
      {post.image && (
        <div className="relative w-full" style={{ height: 400 }}>
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-[900px] mx-auto px-4 pb-10 w-full">
              <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#f78c2a] mb-2">
                {post.tags?.join(' · ')}
              </p>
              <h1 className="font-display text-[32px] sm:text-[42px] font-bold text-white leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[900px] mx-auto px-4 py-12">
        {/* Meta */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#e0e0e0]">
          <div className="w-10 h-10 bg-[#f78c2a] rounded-full flex items-center justify-center text-white font-bold text-[14px]">
            {post.authorName?.[0] || 'R'}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#1f1f1f]">{post.authorName}</p>
            <p className="text-[12px] text-[#999]">
              {new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              {' · '}{post.views} views
            </p>
          </div>
        </div>

        {/* Content */}
        {!post.image && <h1 className="font-display text-[32px] font-bold text-[#1f1f1f] mb-8">{post.title}</h1>}
        <div
          className="prose prose-lg max-w-none text-[#444] leading-relaxed"
          style={{ fontSize: 15, lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-10 pt-6 border-t border-[#e0e0e0] flex flex-wrap gap-2">
            <span className="text-[12px] font-bold text-[#999] uppercase tracking-wider mr-2">Tags:</span>
            {post.tags.map((tag: string) => (
              <span key={tag} className="text-[12px] px-3 py-1 bg-[#f4f4f4] text-[#555] hover:bg-[#f78c2a] hover:text-white transition-colors cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Back */}
        <div className="mt-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#f78c2a] text-[13px] font-semibold hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
