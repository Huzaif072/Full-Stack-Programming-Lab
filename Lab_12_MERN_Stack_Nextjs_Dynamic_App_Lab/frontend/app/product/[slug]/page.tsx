'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { productAPI } from '@/lib/api';
import { useCartStore, useWishlistStore, useAuthStore } from '@/lib/store';
import toast from 'react-hot-toast';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const addItem = useCartStore(s => s.addItem);
  const { toggle, isInWishlist } = useWishlistStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!slug) return;
    productAPI.getOne(slug as string)
      .then(r => setProduct(r.data.product))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({ productId: product._id, name: product.name, price: product.price, image: product.mainImage, qty });
    toast.success(`${qty}x ${product.name} added to cart`);
  };

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to leave a review'); return; }
    setSubmitting(true);
    try {
      await productAPI.addReview(product._id, { rating: reviewRating, comment: reviewText });
      toast.success('Review submitted!');
      setReviewText('');
      // Refresh product
      const r = await productAPI.getOne(slug as string);
      setProduct(r.data.product);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally { setSubmitting(false); }
  };

  if (loading) return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin w-10 h-10 border-2 border-[#f78c2a] rounded-full border-t-transparent" />
      </div>
    </MainLayout>
  );

  if (!product) return (
    <MainLayout>
      <div className="text-center py-20">
        <p className="text-[18px] text-[#999]">Product not found</p>
        <Link href="/shop" className="text-[#f78c2a] mt-4 inline-block underline">Back to shop</Link>
      </div>
    </MainLayout>
  );

  const images = product.images?.length > 0 ? product.images : [{ url: product.mainImage, alt: product.name }];
  const inWishlist = isInWishlist(product._id);
  const discount = product.comparePrice > product.price
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-[#f4f4f4] py-4 border-b border-[#e0e0e0]">
        <div className="max-w-[1400px] mx-auto px-4 text-[12px] text-[#999]">
          <Link href="/" className="hover:text-[#f78c2a]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-[#f78c2a]">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-[#555]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="relative bg-[#f9f9f9] mb-4 overflow-hidden" style={{ aspectRatio: '1/1' }}>
              {discount > 0 && (
                <div className="absolute top-4 left-4 z-10 bg-[#f78c2a] text-white text-[11px] font-bold px-3 py-1">
                  -{discount}%
                </div>
              )}
              <Image
                src={images[activeImg]?.url || product.mainImage}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img: any, i: number) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`relative w-20 h-20 border-2 transition-colors ${i === activeImg ? 'border-[#f78c2a]' : 'border-[#e0e0e0]'}`}>
                    <Image src={img.url} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            {product.category && (
              <Link href={`/shop?category=${product.category._id}`}
                className="text-[11px] font-semibold uppercase tracking-widest text-[#f78c2a] hover:underline">
                {product.category.name}
              </Link>
            )}
            <h1 className="font-display text-[28px] sm:text-[34px] font-bold text-[#1f1f1f] mt-2 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'text-[#f78c2a]' : 'text-[#ddd]'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[13px] text-[#999]">({product.numReviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-[32px] font-bold text-[#1f1f1f] font-display">£{product.price.toFixed(2)}</span>
              {product.comparePrice > product.price && (
                <span className="text-[18px] text-[#aaa] line-through">£{product.comparePrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-[14px] text-[#555] leading-relaxed mb-6">{product.shortDescription || product.description}</p>

            {/* Stock */}
            <div className="mb-6">
              <span className={`text-[12px] font-semibold uppercase tracking-wider ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Qty + cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-[#d5d5d5]">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 text-[18px] text-[#555] hover:bg-[#f4f4f4]">-</button>
                <span className="w-12 text-center text-[14px] font-semibold">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="w-10 h-10 text-[18px] text-[#555] hover:bg-[#f4f4f4]">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-[#f78c2a] text-white py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ADD TO CART
              </button>
              <button
                onClick={() => { toggle(product._id); toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist'); }}
                className={`w-12 h-12 border flex items-center justify-center transition-colors ${inWishlist ? 'border-[#f78c2a] text-[#f78c2a]' : 'border-[#d5d5d5] text-[#555] hover:border-[#f78c2a] hover:text-[#f78c2a]'}`}
              >
                <svg className="w-5 h-5" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Meta */}
            <div className="border-t border-[#e0e0e0] pt-5 space-y-2">
              {product.sku && <p className="text-[12px] text-[#999]">SKU: <span className="text-[#555]">{product.sku}</span></p>}
              {product.material && <p className="text-[12px] text-[#999]">Material: <span className="text-[#555]">{product.material}</span></p>}
              {product.tags?.length > 0 && (
                <p className="text-[12px] text-[#999]">Tags: {product.tags.map((t: string) => (
                  <Link key={t} href={`/shop?search=${t}`} className="text-[#f78c2a] hover:underline mr-2">{t}</Link>
                ))}</p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs: Description / Reviews */}
        <div className="border-t border-[#e0e0e0] pt-10">
          <div className="mb-8">
            <h2 className="font-display text-[22px] font-bold text-[#1f1f1f] mb-4">Description</h2>
            <p className="text-[14px] text-[#555] leading-relaxed max-w-3xl">{product.description}</p>
          </div>

          {/* Dimensions if available */}
          {product.dimensions && (
            <div className="mb-8">
              <h3 className="font-display text-[18px] font-bold text-[#1f1f1f] mb-3">Dimensions</h3>
              <div className="flex gap-6 text-[13px] text-[#555]">
                {product.dimensions.width && <span>W: {product.dimensions.width}{product.dimensions.unit}</span>}
                {product.dimensions.height && <span>H: {product.dimensions.height}{product.dimensions.unit}</span>}
                {product.dimensions.depth && <span>D: {product.dimensions.depth}{product.dimensions.unit}</span>}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div>
            <h2 className="font-display text-[22px] font-bold text-[#1f1f1f] mb-6">
              Reviews ({product.numReviews})
            </h2>
            {product.reviews?.map((r: any) => (
              <div key={r._id} className="border-b border-[#e0e0e0] py-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-[14px]">{r.name}</span>
                  <div className="flex">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} className={`w-3 h-3 ${s <= r.rating ? 'text-[#f78c2a]' : 'text-[#ddd]'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[11px] text-[#aaa]">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-[13px] text-[#555]">{r.comment}</p>
              </div>
            ))}

            {/* Review form */}
            <form onSubmit={handleReview} className="mt-8 bg-[#f9f9f9] p-6">
              <h3 className="font-semibold text-[16px] mb-4">Leave a Review</h3>
              <div className="mb-4">
                <label className="block text-[12px] text-[#666] mb-2 uppercase tracking-wider">Your Rating</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => (
                    <button key={s} type="button" onClick={() => setReviewRating(s)}>
                      <svg className={`w-6 h-6 ${s <= reviewRating ? 'text-[#f78c2a]' : 'text-[#ddd]'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Share your thoughts about this product..."
                rows={4}
                required
                className="w-full border border-[#d5d5d5] px-4 py-3 text-[13px] outline-none resize-none focus:border-[#f78c2a] bg-white"
              />
              <button
                type="submit"
                disabled={submitting}
                className="mt-4 bg-[#f78c2a] text-white px-8 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820] disabled:opacity-50 transition-colors"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
