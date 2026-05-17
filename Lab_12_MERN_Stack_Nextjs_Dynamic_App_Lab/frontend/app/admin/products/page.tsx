'use client';
import { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { productAPI, categoryAPI } from '@/lib/api';
import toast from 'react-hot-toast';

function ProductForm({ product, categories, onSave, onCancel }: any) {
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    shortDescription: product?.shortDescription || '',
    price: product?.price || '',
    comparePrice: product?.comparePrice || '',
    stock: product?.stock || '',
    category: product?.category?._id || product?.category || '',
    mainImage: product?.mainImage || '',
    material: product?.material || '',
    tags: product?.tags?.join(', ') || '',
    featured: product?.featured || false,
    special: product?.special || false,
    popular: product?.popular || false,
    hotDeal: product?.hotDeal || false,
    sku: product?.sku || '',
  });
  const [saving, setSaving] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));
  const toggle = (k: string) => () => setForm(f => ({ ...f, [k]: !(f as any)[k] }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        ...form,
        price: Number(form.price),
        comparePrice: Number(form.comparePrice),
        stock: Number(form.stock),
        tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
        images: form.mainImage ? [{ url: form.mainImage, alt: form.name }] : [],
      };
      if (product?._id) await productAPI.update(product._id, data);
      else await productAPI.create(data);
      toast.success(product?._id ? 'Product updated!' : 'Product created!');
      onSave();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#e0e0e0] p-6 mb-6">
      <h2 className="font-display text-[20px] font-bold text-[#1f1f1f] mb-6">
        {product?._id ? 'Edit Product' : 'Add New Product'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { k: 'name', label: 'Product Name', type: 'text', col: 2, required: true },
          { k: 'price', label: 'Price (£)', type: 'number', required: true },
          { k: 'comparePrice', label: 'Compare Price (£)', type: 'number' },
          { k: 'stock', label: 'Stock Qty', type: 'number', required: true },
          { k: 'sku', label: 'SKU', type: 'text' },
          { k: 'material', label: 'Material', type: 'text' },
          { k: 'mainImage', label: 'Main Image URL', type: 'text', col: 2 },
          { k: 'tags', label: 'Tags (comma separated)', type: 'text', col: 2 },
        ].map(f => (
          <div key={f.k} className={f.col === 2 ? 'sm:col-span-2' : ''}>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">{f.label}</label>
            <input type={f.type} value={(form as any)[f.k]} onChange={set(f.k)} required={f.required}
              step={f.type === 'number' ? '0.01' : undefined}
              className="w-full border border-[#d5d5d5] px-3 py-2.5 text-[13px] outline-none focus:border-[#f78c2a]" />
          </div>
        ))}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Category</label>
          <select value={form.category} onChange={set('category')} required
            className="w-full border border-[#d5d5d5] px-3 py-2.5 text-[13px] outline-none focus:border-[#f78c2a] bg-white">
            <option value="">Select category</option>
            {categories.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Flags</label>
          <div className="flex flex-wrap gap-4">
            {['featured', 'special', 'popular', 'hotDeal'].map(flag => (
              <label key={flag} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={(form as any)[flag]} onChange={toggle(flag)} className="accent-[#f78c2a]" />
                <span className="text-[13px] capitalize">{flag}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Short Description</label>
          <input value={form.shortDescription} onChange={set('shortDescription')}
            className="w-full border border-[#d5d5d5] px-3 py-2.5 text-[13px] outline-none focus:border-[#f78c2a]" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Full Description</label>
          <textarea value={form.description} onChange={set('description')} rows={4} required
            className="w-full border border-[#d5d5d5] px-3 py-2.5 text-[13px] outline-none focus:border-[#f78c2a] resize-none" />
        </div>
      </div>
      {form.mainImage && (
        <div className="mt-4">
          <p className="text-[11px] text-[#999] mb-2">Image Preview:</p>
          <div className="relative w-28 h-28 border border-[#e0e0e0]">
            <Image src={form.mainImage} alt="Preview" fill className="object-cover" />
          </div>
        </div>
      )}
      <div className="flex gap-3 mt-6">
        <button type="submit" disabled={saving}
          className="bg-[#f78c2a] text-white px-8 py-2.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820] disabled:opacity-60">
          {saving ? 'Saving...' : 'SAVE PRODUCT'}
        </button>
        <button type="button" onClick={onCancel}
          className="border border-[#d5d5d5] text-[#555] px-8 py-2.5 text-[12px] font-bold tracking-widest uppercase hover:border-[#f78c2a] hover:text-[#f78c2a]">
          CANCEL
        </button>
      </div>
    </form>
  );
}

function AdminProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(searchParams.get('action') === 'new');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = () => {
    setLoading(true);
    productAPI.getAll({ page, limit: 15 })
      .then(r => { setProducts(r.data.products); setTotalPages(r.data.pagination.pages); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [page]);
  useEffect(() => { categoryAPI.getAll().then(r => setCategories(r.data.categories)).catch(() => {}); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try { await productAPI.delete(id); toast.success('Product deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  const handleSaved = () => { setShowForm(false); setEditing(null); load(); };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#1f1f1f]">Products</h1>
          <p className="text-[13px] text-[#999]">Manage your product catalogue</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }}
          className="bg-[#f78c2a] text-white px-6 py-2.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820]">
          + ADD PRODUCT
        </button>
      </div>

      {(showForm || editing) && (
        <ProductForm product={editing} categories={categories}
          onSave={handleSaved} onCancel={() => { setShowForm(false); setEditing(null); }} />
      )}

      <div className="bg-white border border-[#e0e0e0]">
        <table className="w-full text-[13px]">
          <thead className="bg-[#f9f9f9]">
            <tr className="border-b border-[#e0e0e0]">
              {['Image', 'Name', 'Category', 'Price', 'Stock', 'Flags', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-[#999]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center py-12 text-[#999]">Loading...</td></tr>
            ) : products.map(product => (
              <tr key={product._id} className="border-b border-[#f4f4f4] hover:bg-[#fafafa]">
                <td className="px-4 py-3">
                  <div className="relative w-10 h-10 bg-[#f4f4f4]">
                    <Image src={product.mainImage || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80'} alt="" fill className="object-cover" />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium max-w-[200px]">
                  <span className="line-clamp-2">{product.name}</span>
                </td>
                <td className="px-4 py-3 text-[#666]">{product.category?.name || '—'}</td>
                <td className="px-4 py-3 font-semibold">£{product.price?.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-semibold px-2 py-1 ${product.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {product.featured && <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 font-semibold">F</span>}
                    {product.special && <span className="text-[10px] bg-purple-50 text-purple-600 px-1.5 py-0.5 font-semibold">S</span>}
                    {product.popular && <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 font-semibold">P</span>}
                    {product.hotDeal && <span className="text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 font-semibold">H</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => { setEditing(product); setShowForm(false); window.scrollTo(0, 0); }}
                      className="text-[12px] text-[#f78c2a] hover:underline font-semibold">Edit</button>
                    <button onClick={() => handleDelete(product._id, product.name)}
                      className="text-[12px] text-red-500 hover:underline font-semibold">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 p-4 border-t border-[#e0e0e0]">
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                className={`w-8 h-8 text-[12px] border transition-colors ${page === i + 1 ? 'bg-[#f78c2a] border-[#f78c2a] text-white' : 'border-[#d5d5d5] hover:border-[#f78c2a]'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-[#999]">Loading...</div>}>
      <AdminProductsContent />
    </Suspense>
  );
}
