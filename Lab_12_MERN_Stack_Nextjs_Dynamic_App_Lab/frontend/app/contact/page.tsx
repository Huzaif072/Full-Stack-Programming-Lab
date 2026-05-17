'use client';
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <MainLayout>
      <div className="bg-[#f4f4f4] py-10 border-b border-[#e0e0e0]">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#f78c2a] mb-2">Get In Touch</p>
          <h1 className="font-display text-[36px] font-bold text-[#1f1f1f]">Contact Us</h1>
          <div className="w-12 h-0.5 bg-[#f78c2a] mx-auto mt-4" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="font-display text-[22px] font-bold text-[#1f1f1f] mb-8">Get In Touch</h2>
            <div className="space-y-6">
              {[
                { icon: '📍', label: 'Address', value: '12 Craftsman Lane, Cotswolds, GL54 2AJ, UK' },
                { icon: '📞', label: 'Phone', value: '07584 031409' },
                { icon: '✉️', label: 'Email', value: 'hello@rustikplank.com' },
                { icon: '🕐', label: 'Hours', value: 'Mon–Fri: 9am–5pm\nSat: 10am–3pm' },
              ].map(item => (
                <div key={item.label} className="flex gap-4">
                  <span className="text-[24px] mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#999] mb-1">{item.label}</p>
                    <p className="text-[13px] text-[#555] whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-[#e0e0e0]">
              <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#999] mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {['Facebook','Instagram','Pinterest','Twitter'].map(s => (
                  <a key={s} href="#" className="w-10 h-10 border border-[#d5d5d5] flex items-center justify-center text-[12px] font-bold text-[#555] hover:border-[#f78c2a] hover:text-[#f78c2a] transition-colors">
                    {s[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#e0e0e0] p-8">
              <h2 className="font-display text-[22px] font-bold text-[#1f1f1f] mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Your Name</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                      placeholder="John Smith"
                      className="w-full border border-[#d5d5d5] px-4 py-3 text-[13px] outline-none focus:border-[#f78c2a] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Email Address</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required
                      placeholder="your@email.com"
                      className="w-full border border-[#d5d5d5] px-4 py-3 text-[13px] outline-none focus:border-[#f78c2a] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Subject</label>
                  <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required
                    placeholder="How can we help?"
                    className="w-full border border-[#d5d5d5] px-4 py-3 text-[13px] outline-none focus:border-[#f78c2a] transition-colors" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#666] mb-2">Message</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required
                    rows={6} placeholder="Tell us about your enquiry..."
                    className="w-full border border-[#d5d5d5] px-4 py-3 text-[13px] outline-none focus:border-[#f78c2a] transition-colors resize-none" />
                </div>
                <button type="submit" disabled={loading}
                  className="bg-[#f78c2a] text-white px-10 py-3.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#e07820] disabled:opacity-60 transition-colors">
                  {loading ? 'Sending...' : 'SEND MESSAGE'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
