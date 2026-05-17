'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore, useAuthStore } from '@/lib/store';
import { categoryAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function Header() {
  const router = useRouter();
  const cartCount = useCartStore(s => s.count());
  const { user, logout } = useAuthStore();
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    categoryAPI.getAll().then(r => setCategories(r.data.categories)).catch(() => {});
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) { router.push(`/shop?search=${encodeURIComponent(search.trim())}`); setSearch(''); }
  };

  const handleLogout = () => { logout(); toast.success('Logged out'); setAccountOpen(false); };

  const navCats = categories.length > 0
    ? categories.map(c => c.name.toUpperCase())
    : ['BEDS','CABINETS','BOOKCASES','BOXES','CHAIRS','TABLES'];

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm">
      {/* Top utility bar */}
      <div className="bg-[#c5c5c5] text-[#1f1f1f] text-[11px]">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between h-7">
          <div className="flex items-center gap-4">
            <span>📞 07584 031409</span>
            <span className="hidden md:inline">Free shipping on orders over £100</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/account" className="hover:text-[#f78c2a] transition-colors">My Account</Link>
            {user ? (
              <span className="text-[#f78c2a]">{user.name}</span>
            ) : (
              <>
                <Link href="/auth/login" className="hover:text-[#f78c2a] transition-colors">Login</Link>
                <span>/</span>
                <Link href="/auth/register" className="hover:text-[#f78c2a] transition-colors">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-[#fbfbfb] border-b border-[#d5d5d5]">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link href="/" className="text-[26px] font-bold tracking-wider text-[#1f1f1f] font-display shrink-0">
            Rustik Plank
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-[#3a3a3a]">
            <Link href="/" className="hover:text-[#f78c2a] transition-colors">Home</Link>
            <Link href="/blog" className="hover:text-[#f78c2a] transition-colors">Blog</Link>
            <Link href="/about" className="hover:text-[#f78c2a] transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-[#f78c2a] transition-colors">Contact Us</Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center border border-[#d5d5d5] rounded bg-white overflow-hidden">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="px-3 py-1.5 text-[12px] w-36 outline-none bg-transparent"
              />
              <button type="submit" className="px-3 py-1.5 bg-[#f4f4f4] text-[12px] hover:bg-[#f78c2a] hover:text-white transition-colors">
                Search
              </button>
            </form>

            {/* Account dropdown */}
            <div className="relative">
              <button onClick={() => setAccountOpen(!accountOpen)}
                className="hidden md:flex items-center gap-1 text-[12px] text-[#3a3a3a] hover:text-[#f78c2a] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {user ? user.name.split(' ')[0] : 'Account'}
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-8 bg-white border border-[#d5d5d5] shadow-lg rounded min-w-[160px] z-50 py-1">
                  {user ? (
                    <>
                      <Link href="/account" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-[13px] hover:bg-[#f4f4f4]">My Account</Link>
                      <Link href="/account/orders" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-[13px] hover:bg-[#f4f4f4]">My Orders</Link>
                      <Link href="/wishlist" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-[13px] hover:bg-[#f4f4f4]">Wishlist</Link>
                      {user.role === 'admin' && (
                        <Link href="/admin" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-[13px] hover:bg-[#f4f4f4] text-[#f78c2a]">Admin Panel</Link>
                      )}
                      <hr className="my-1 border-[#d5d5d5]" />
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-[13px] hover:bg-[#f4f4f4] text-red-500">Logout</button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-[13px] hover:bg-[#f4f4f4]">Login</Link>
                      <Link href="/auth/register" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-[13px] hover:bg-[#f4f4f4]">Register</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="hidden md:flex items-center gap-1 text-[12px] text-[#3a3a3a] hover:text-[#f78c2a] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="flex items-center gap-1.5 bg-[#f78c2a] text-white px-3 py-1.5 rounded text-[12px] font-medium hover:bg-[#e07820] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{cartCount} Item{cartCount !== 1 ? 's' : ''}</span>
            </Link>

            {/* Mobile menu toggle */}
            <button className="lg:hidden p-1" onClick={() => setMobileOpen(!mobileOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Category nav bar */}
      <div className="bg-[#f4f4f4] border-b border-[#d5d5d5] hidden md:block">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center gap-8 h-9 overflow-x-auto">
          {(categories.length > 0 ? categories : []).map((cat: any) => (
            <Link
              key={cat._id || cat.name}
              href={`/shop?category=${cat._id || ''}`}
              className="text-[11px] font-semibold tracking-widest uppercase text-[#3a3a3a] hover:text-[#f78c2a] transition-colors whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
          {categories.length === 0 && navCats.map(name => (
            <Link key={name} href={`/shop`}
              className="text-[11px] font-semibold tracking-widest uppercase text-[#3a3a3a] hover:text-[#f78c2a] transition-colors whitespace-nowrap">
              {name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-[#d5d5d5] shadow-md">
          <div className="px-4 py-4 space-y-3">
            <form onSubmit={handleSearch} className="flex border border-[#d5d5d5] rounded overflow-hidden">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="flex-1 px-3 py-2 text-sm outline-none" />
              <button type="submit" className="px-4 bg-[#f78c2a] text-white text-sm">Go</button>
            </form>
            {['Home','Blog','About Us','Contact Us'].map(label => (
              <Link key={label} href={label === 'Home' ? '/' : `/${label.toLowerCase().replace(' ','-')}`}
                onClick={() => setMobileOpen(false)}
                className="block text-[14px] py-2 border-b border-[#f4f4f4] hover:text-[#f78c2a]">{label}</Link>
            ))}
            <div className="pt-2 border-t border-[#d5d5d5]">
              <p className="text-[11px] font-semibold text-[#c5c5c5] uppercase mb-2">Categories</p>
              {(categories.length > 0 ? categories : []).map((cat: any) => (
                <Link key={cat._id || cat.name} href={`/shop?category=${cat._id || ''}`}
                  onClick={() => setMobileOpen(false)}
                  className="block text-[13px] py-1.5 hover:text-[#f78c2a]">{cat.name}</Link>
              ))}
            </div>
            {user ? (
              <button onClick={handleLogout} className="block w-full text-left text-[13px] text-red-500 py-2">Logout ({user.name})</button>
            ) : (
              <div className="flex gap-4">
                <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="text-[13px] hover:text-[#f78c2a]">Login</Link>
                <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="text-[13px] hover:text-[#f78c2a]">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
