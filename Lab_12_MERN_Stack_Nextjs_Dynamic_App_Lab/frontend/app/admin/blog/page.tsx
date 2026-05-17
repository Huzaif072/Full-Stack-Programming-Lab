'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { blogAPI } from '@/lib/api';
import toast from 'react-hot-toast';

function BlogForm({ post, onSave, onCancel }: any) {
  const [form, setForm] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    image: post?.image || '',
    tags: post?.tags?.join(', ') || '',
    published: post?.published ?? true,
  });
  const [saving, setSaving] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { ...form, tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean) };
      if (post?._id) await blogAPI.update(post._id, data);
      else await blogAPI.create(data);
      toast.success(post?._id ? 'Post updated!' : 'Post created!');
      onSave();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#e0e0e0] p-6 mb-6">
      <h2 className="font-display text-[20px] font-bold text-[#1f1f1f] mb-6">
        {post?._id ? 'Edit Post' : 'New Blog Post'}
      </h2>
      <div className="space-y-5">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Title *</label>
          <input value={form.title} onChange={set('title')} required
            className="w-full border border-[#d5d5d5] px-3 py-2.5 text-[13px] outline-none focus:border-[#f78c2a]" />
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Image URL</label>
          <input value={form.image} onChange={set('image')} placeholder="https://..."
            className="w-full border border-[#d5d5d5] px-3 py-2.5 text-[13px] outline-none focus:border-[#f78c2a]" />
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Excerpt</label>
          <input value={form.excerpt} onChange={set('excerpt')}
            className="w-full border border-[#d5d5d5] px-3 py-2.5 text-[13px] outline-none focus:border-[#f78c2a]" />
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Tags (comma separated)</label>
          <input value={form.tags} onChange={set('tags')}
            className="w-full border border-[#d5d5d5] px-3 py-2.5 text-[13px] outline-none focus:border-[#f78c2a]" />
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Content (HTML supported) *</label>
          <textarea value={form.content} onChange={set('content')} rows={10} required
            className="w-full border border-[#d5d5d5] px-3 py-2.5 text-[13px] outline-none focus:border-[#f78c2a] resize-y font-mono" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="accent-[#f78c2a]" />
          <span className="text-[13px]">Published</span>
        </label>
      </div>
      <div className="flex gap-3 mt-6">
        <button type="submit" disabled={saving}
          className="bg-[#f78c2a] text-white px-8 py-2.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820] disabled:opacity-60">
          {saving ? 'Saving...' : 'SAVE POST'}
        </button>
        <button type="button" onClick={onCancel}
          className="border border-[#d5d5d5] text-[#555] px-8 py-2.5 text-[12px] font-bold tracking-widest uppercase hover:border-[#f78c2a] hover:text-[#f78c2a]">
          CANCEL
        </button>
      </div>
    </form>
  );
}

function AdminBlogContent() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(searchParams.get('action') === 'new');

  const load = () => {
    setLoading(true);
    blogAPI.getAll({ limit: 50 }).then(r => setPosts(r.data.blogs)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try { await blogAPI.delete(id); toast.success('Post deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  const handleSaved = () => { setShowForm(false); setEditing(null); load(); };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#1f1f1f]">Blog Posts</h1>
          <p className="text-[13px] text-[#999]">Manage your blog content</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); window.scrollTo(0, 0); }}
          className="bg-[#f78c2a] text-white px-6 py-2.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820]">
          + NEW POST
        </button>
      </div>

      {(showForm || editing) && (
        <BlogForm post={editing} onSave={handleSaved} onCancel={() => { setShowForm(false); setEditing(null); }} />
      )}

      <div className="bg-white border border-[#e0e0e0]">
        {loading ? (
          <div className="text-center py-12 text-[#999]">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-[#999]">No posts yet</div>
        ) : (
          <table className="w-full text-[13px]">
            <thead className="bg-[#f9f9f9]">
              <tr className="border-b border-[#e0e0e0]">
                {['Title', 'Author', 'Tags', 'Published', 'Views', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-[#999]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post._id} className="border-b border-[#f4f4f4] hover:bg-[#fafafa]">
                  <td className="px-4 py-3 font-medium max-w-[220px]">
                    <span className="line-clamp-2">{post.title}</span>
                  </td>
                  <td className="px-4 py-3 text-[#666]">{post.authorName}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {post.tags?.slice(0, 2).map((t: string) => (
                        <span key={t} className="text-[10px] bg-[#f4f4f4] text-[#666] px-2 py-0.5">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-semibold px-2 py-1 ${post.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#999]">{post.views}</td>
                  <td className="px-4 py-3 text-[#999]">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button onClick={() => { setEditing(post); setShowForm(false); window.scrollTo(0, 0); }}
                        className="text-[12px] text-[#f78c2a] hover:underline font-semibold">Edit</button>
                      <button onClick={() => handleDelete(post._id, post.title)}
                        className="text-[12px] text-red-500 hover:underline font-semibold">Delete</button>
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

export default function AdminBlogPage() {
  return (
    <Suspense fallback={<div className="p-8 text-[#999]">Loading...</div>}>
      <AdminBlogContent />
    </Suspense>
  );
}
