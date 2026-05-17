'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import toast from 'react-hot-toast';

export default function AccountPage() {
  const router = useRouter();
  const { user, setAuth, logout } = useAuthStore();
  const [form, setForm] = useState({ name: '', phone: '' });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '' });
  const [loading, setLoading] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    if (!user) { router.push('/auth/login'); return; }
    setForm({ name: user.name, phone: '' });
    authAPI.getMe().then(r => {
      setForm({ name: r.data.user.name, phone: r.data.user.phone || '' });
    }).catch(() => {});
  }, [user, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.updateProfile(form);
      setAuth(res.data.user, localStorage.getItem('rp_token') || '');
      toast.success('Profile updated!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally { setLoading(false); }
  };

  const handlePwUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.newPassword.length < 6) { toast.error('New password must be 6+ characters'); return; }
    setPwLoading(true);
    try {
      await authAPI.updatePassword(pwForm);
      toast.success('Password updated!');
      setPwForm({ currentPassword: '', newPassword: '' });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Password update failed');
    } finally { setPwLoading(false); }
  };

  if (!user) return null;

  return (
    <MainLayout>
      <div className="bg-[#f4f4f4] py-6 border-b border-[#e0e0e0]">
        <div className="max-w-[1400px] mx-auto px-4">
          <h1 className="font-display text-[28px] font-bold text-[#1f1f1f]">My Account</h1>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-[#f4f4f4] p-5">
              <div className="mb-5 pb-4 border-b border-[#e0e0e0]">
                <div className="w-14 h-14 bg-[#f78c2a] rounded-full flex items-center justify-center text-white text-[20px] font-bold mb-3">
                  {user.name[0].toUpperCase()}
                </div>
                <p className="font-semibold text-[15px]">{user.name}</p>
                <p className="text-[12px] text-[#999]">{user.email}</p>
              </div>
              <nav className="space-y-1">
                {[
                  ['My Profile', '/account'],
                  ['My Orders', '/account/orders'],
                  ['My Wishlist', '/wishlist'],
                ].map(([label, href]) => (
                  <a key={label} href={href}
                    className="block px-3 py-2.5 text-[13px] hover:bg-[#e8e8e8] hover:text-[#f78c2a] transition-colors rounded">
                    {label}
                  </a>
                ))}
                {user.role === 'admin' && (
                  <a href="/admin" className="block px-3 py-2.5 text-[13px] text-[#f78c2a] font-semibold hover:bg-[#e8e8e8] transition-colors rounded">
                    Admin Panel
                  </a>
                )}
                <button onClick={() => { logout(); router.push('/'); }}
                  className="block w-full text-left px-3 py-2.5 text-[13px] text-red-500 hover:bg-[#e8e8e8] transition-colors rounded">
                  Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile form */}
            <div className="bg-white border border-[#e0e0e0] p-6">
              <h2 className="font-display text-[18px] font-bold text-[#1f1f1f] mb-6">Profile Information</h2>
              <form onSubmit={handleUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Full Name</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                    className="w-full border border-[#d5d5d5] px-4 py-3 text-[13px] outline-none focus:border-[#f78c2a]" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Email</label>
                  <input value={user.email} disabled
                    className="w-full border border-[#e0e0e0] px-4 py-3 text-[13px] bg-[#f9f9f9] text-[#999]" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Phone</label>
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full border border-[#d5d5d5] px-4 py-3 text-[13px] outline-none focus:border-[#f78c2a]" />
                </div>
                <div className="flex items-end">
                  <button type="submit" disabled={loading}
                    className="bg-[#f78c2a] text-white px-8 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820] disabled:opacity-60 transition-colors">
                    {loading ? 'Saving...' : 'SAVE CHANGES'}
                  </button>
                </div>
              </form>
            </div>

            {/* Password form */}
            <div className="bg-white border border-[#e0e0e0] p-6">
              <h2 className="font-display text-[18px] font-bold text-[#1f1f1f] mb-6">Change Password</h2>
              <form onSubmit={handlePwUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Current Password</label>
                  <input type="password" value={pwForm.currentPassword} onChange={e => setPwForm(f => ({ ...f, currentPassword: e.target.value }))} required
                    className="w-full border border-[#d5d5d5] px-4 py-3 text-[13px] outline-none focus:border-[#f78c2a]" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">New Password</label>
                  <input type="password" value={pwForm.newPassword} onChange={e => setPwForm(f => ({ ...f, newPassword: e.target.value }))} required
                    className="w-full border border-[#d5d5d5] px-4 py-3 text-[13px] outline-none focus:border-[#f78c2a]" />
                </div>
                <div>
                  <button type="submit" disabled={pwLoading}
                    className="bg-[#1f1f1f] text-white px-8 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-[#f78c2a] disabled:opacity-60 transition-colors">
                    {pwLoading ? 'Updating...' : 'UPDATE PASSWORD'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
