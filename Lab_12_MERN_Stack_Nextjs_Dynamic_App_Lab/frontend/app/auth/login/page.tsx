'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore(s => s.setAuth);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.login(form);
      setAuth(res.data.user, res.data.token);
      toast.success(`Welcome back, ${res.data.user.name}!`);
      router.push(res.data.user.role === 'admin' ? '/admin' : '/');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <MainLayout>
      <div className="bg-[#f4f4f4] py-6 border-b border-[#e0e0e0]">
        <div className="max-w-[1400px] mx-auto px-4">
          <h1 className="font-display text-[28px] font-bold text-[#1f1f1f]">Login</h1>
        </div>
      </div>
      <div className="min-h-[500px] flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white border border-[#e0e0e0] p-8">
            <h2 className="font-display text-[24px] font-bold text-[#1f1f1f] mb-2 text-center">Welcome Back</h2>
            <p className="text-[13px] text-[#999] text-center mb-8">Sign in to your Rustik Plank account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Email Address</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com" required
                  className="w-full border border-[#d5d5d5] px-4 py-3 text-[13px] outline-none focus:border-[#f78c2a] transition-colors" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Password</label>
                <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••" required
                  className="w-full border border-[#d5d5d5] px-4 py-3 text-[13px] outline-none focus:border-[#f78c2a] transition-colors" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-[#f78c2a] text-white py-3.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820] disabled:opacity-60 transition-colors">
                {loading ? 'Signing In...' : 'SIGN IN'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#e0e0e0] text-center">
              <p className="text-[13px] text-[#666]">Don't have an account?{' '}
                <Link href="/auth/register" className="text-[#f78c2a] font-semibold hover:underline">Register here</Link>
              </p>
            </div>

            {/* Demo credentials */}
            <div className="mt-4 p-3 bg-[#f9f9f9] text-[11px] text-[#888] rounded text-center">
              <p className="font-semibold mb-1">Demo Admin:</p>
              <p>admin@rustikplank.com / admin123</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
