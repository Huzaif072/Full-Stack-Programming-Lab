'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore(s => s.setAuth);
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const res = await authAPI.register(form);
      setAuth(res.data.user, res.data.token);
      toast.success('Account created! Welcome to Rustik Plank!');
      router.push('/');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <MainLayout>
      <div className="bg-[#f4f4f4] py-6 border-b border-[#e0e0e0]">
        <div className="max-w-[1400px] mx-auto px-4">
          <h1 className="font-display text-[28px] font-bold text-[#1f1f1f]">Register</h1>
        </div>
      </div>
      <div className="min-h-[500px] flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white border border-[#e0e0e0] p-8">
            <h2 className="font-display text-[24px] font-bold text-[#1f1f1f] mb-2 text-center">Create Account</h2>
            <p className="text-[13px] text-[#999] text-center mb-8">Join Rustik Plank for exclusive offers</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { field: 'name', label: 'Full Name', type: 'text', placeholder: 'John Smith' },
                { field: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                { field: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+44 7700 000000' },
                { field: 'password', label: 'Password', type: 'password', placeholder: 'Min 6 characters' },
              ].map(({ field, label, type, placeholder }) => (
                <div key={field}>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">{label}</label>
                  <input type={type} value={(form as any)[field]} onChange={set(field)} placeholder={placeholder}
                    required={field !== 'phone'}
                    className="w-full border border-[#d5d5d5] px-4 py-3 text-[13px] outline-none focus:border-[#f78c2a] transition-colors" />
                </div>
              ))}
              <button type="submit" disabled={loading}
                className="w-full bg-[#f78c2a] text-white py-3.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820] disabled:opacity-60 transition-colors">
                {loading ? 'Creating Account...' : 'CREATE ACCOUNT'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#e0e0e0] text-center">
              <p className="text-[13px] text-[#666]">Already have an account?{' '}
                <Link href="/auth/login" className="text-[#f78c2a] font-semibold hover:underline">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
