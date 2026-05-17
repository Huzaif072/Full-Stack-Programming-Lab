'use client';
import { useEffect, useState } from 'react';
import { categoryAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', description: '', image: '' });
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    categoryAPI.getAll().then(r => setCategories(r.data.categories)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const startEdit = (cat?: any) => {
    setEditing(cat || null);
    setForm(cat ? { name: cat.name, description: cat.description || '', image: cat.image || '' } : { name: '', description: '', image: '' });
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) await categoryAPI.update(editing._id, form);
      else await categoryAPI.create(form);
      toast.success(editing ? 'Category updated!' : 'Category created!');
      setShowForm(false); setEditing(null);
      load();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try { await categoryAPI.delete(id); toast.success('Category deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#1f1f1f]">Categories</h1>
          <p className="text-[13px] text-[#999]">Manage product categories</p>
        </div>
        <button onClick={() => startEdit()}
          className="bg-[#f78c2a] text-white px-6 py-2.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820]">
          + ADD CATEGORY
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-[#e0e0e0] p-6 mb-6">
          <h2 className="font-display text-[18px] font-bold text-[#1f1f1f] mb-5">
            {editing ? 'Edit Category' : 'New Category'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Name *</label>
              <input value={form.name} onChange={set('name')} required
                className="w-full border border-[#d5d5d5] px-3 py-2.5 text-[13px] outline-none focus:border-[#f78c2a]" />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Image URL</label>
              <input value={form.image} onChange={set('image')}
                placeholder="https://..."
                className="w-full border border-[#d5d5d5] px-3 py-2.5 text-[13px] outline-none focus:border-[#f78c2a]" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Description</label>
              <textarea value={form.description} onChange={set('description')} rows={2}
                className="w-full border border-[#d5d5d5] px-3 py-2.5 text-[13px] outline-none focus:border-[#f78c2a] resize-none" />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button type="submit" disabled={saving}
              className="bg-[#f78c2a] text-white px-8 py-2.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820] disabled:opacity-60">
              {saving ? 'Saving...' : 'SAVE'}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }}
              className="border border-[#d5d5d5] text-[#555] px-8 py-2.5 text-[12px] font-bold tracking-widest uppercase hover:border-[#f78c2a] hover:text-[#f78c2a]">
              CANCEL
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-[#e0e0e0]">
        {loading ? (
          <div className="text-center py-12 text-[#999]">Loading...</div>
        ) : (
          <table className="w-full text-[13px]">
            <thead className="bg-[#f9f9f9]">
              <tr className="border-b border-[#e0e0e0]">
                {['Name', 'Slug', 'Description', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-[#999]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat._id} className="border-b border-[#f4f4f4] hover:bg-[#fafafa]">
                  <td className="px-4 py-3 font-semibold">{cat.name}</td>
                  <td className="px-4 py-3 text-[#999] font-mono text-[12px]">{cat.slug}</td>
                  <td className="px-4 py-3 text-[#666] max-w-[300px] truncate">{cat.description || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button onClick={() => startEdit(cat)} className="text-[12px] text-[#f78c2a] hover:underline font-semibold">Edit</button>
                      <button onClick={() => handleDelete(cat._id, cat.name)} className="text-[12px] text-red-500 hover:underline font-semibold">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
