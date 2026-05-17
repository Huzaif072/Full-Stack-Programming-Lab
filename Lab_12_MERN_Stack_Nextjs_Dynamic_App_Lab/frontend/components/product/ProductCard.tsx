'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCartStore, useWishlistStore } from '@/lib/store';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    comparePrice?: number;
    mainImage: string;
    slug?: string;
    rating?: number;
    numReviews?: number;
    discountPercent?: number;
    stock?: number;
    category?: { name: string };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(s => s.addItem);
  const { toggle, isInWishlist } = useWishlistStore();
  const [imgError, setImgError] = useState(false);
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.mainImage,
      qty: 1,
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product._id);
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const discount = product.comparePrice && product.comparePrice > product.price
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : product.discountPercent || 0;

  const href = `/product/${product.slug || product._id}`;

  return (
    <Link href={href} className="group block bg-white border border-[#e8e8e8] hover:border-[#f78c2a] hover:shadow-md transition-all duration-300 relative">
      {/* Discount badge */}
      {discount > 0 && (
        <div className="absolute top-2 left-2 z-10 bg-[#f78c2a] text-white text-[10px] font-bold px-2 py-0.5">
          -{discount}%
        </div>
      )}

      {/* Wishlist button */}
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 z-10 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#f78c2a] hover:text-white"
      >
        <svg className="w-3.5 h-3.5" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Product image */}
      <div className="relative overflow-hidden bg-[#f9f9f9]" style={{ aspectRatio: '1/1' }}>
        <Image
          src={imgError ? 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400' : product.mainImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgError(true)}
        />
      </div>

      {/* Product info */}
      <div className="p-4">
        {product.category && (
          <p className="text-[10px] text-[#999] uppercase tracking-wider mb-1">{product.category.name}</p>
        )}
        <h3 className="text-[13px] font-medium text-[#1f1f1f] leading-snug mb-2 line-clamp-2 group-hover:text-[#f78c2a] transition-colors">
          {product.name}
        </h3>

        {/* Stars */}
        {product.rating !== undefined && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <svg key={s} className={`w-3 h-3 ${s <= Math.round(product.rating!) ? 'text-[#f78c2a]' : 'text-[#ddd]'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-[#999]">({product.numReviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[15px] font-bold text-[#1f1f1f]">£{product.price.toFixed(2)}</span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="text-[12px] text-[#aaa] line-through">£{product.comparePrice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="w-full border border-[#1f1f1f] text-[#1f1f1f] text-[11px] font-semibold uppercase tracking-wider py-2
            hover:bg-[#f78c2a] hover:border-[#f78c2a] hover:text-white transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
