import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#dedede] mt-auto">
      {/* Orange accent bar */}
      <div className="h-1.5 bg-[#f78c2a]" />

      {/* Main footer content */}
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About / Logo */}
          <div>
            <h3 className="text-[16px] font-bold tracking-wider font-display mb-4 text-[#1f1f1f]">Rustik Plank</h3>
            <p className="text-[13px] text-[#555] leading-relaxed mb-4">
              Handcrafted solid wood furniture made with traditional techniques and sustainably sourced timber.
            </p>
            <div className="flex gap-3">
              {['facebook','twitter','instagram','pinterest'].map(s => (
                <a key={s} href={`https://${s}.com`} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#c5c5c5] hover:bg-[#f78c2a] rounded flex items-center justify-center transition-colors">
                  <span className="text-[10px] font-bold text-white uppercase">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Informations */}
          <div>
            <h4 className="text-[12px] font-bold tracking-widest uppercase text-[#1f1f1f] mb-5 pb-2 border-b border-[#c5c5c5]">
              INFORMATIONS
            </h4>
            <ul className="space-y-2.5">
              {[
                ['Terms and conditions', '/terms'],
                ['About us', '/about'],
                ['Sitemap', '/sitemap'],
                ['Contact', '/contact'],
                ['Return policy', '/returns'],
                ['Suppliers', '/suppliers'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-[13px] text-[#555] hover:text-[#f78c2a] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-[12px] font-bold tracking-widest uppercase text-[#1f1f1f] mb-5 pb-2 border-b border-[#c5c5c5]">
              MY ACCOUNT
            </h4>
            <ul className="space-y-2.5">
              {[
                ['My Account', '/account'],
                ['My Orders', '/account/orders'],
                ['My Wishlist', '/wishlist'],
                ['Checkout', '/checkout'],
                ['Log In', '/auth/login'],
                ['Register', '/auth/register'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-[13px] text-[#555] hover:text-[#f78c2a] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help + Links */}
          <div>
            <h4 className="text-[12px] font-bold tracking-widest uppercase text-[#1f1f1f] mb-5 pb-2 border-b border-[#c5c5c5]">
              HELP AND MORE
            </h4>
            <ul className="space-y-2.5 mb-6">
              {[
                ['FAQ', '/faq'],
                ['Delivery Info', '/delivery'],
                ['Track Order', '/track'],
                ['Gift Cards', '/gift-cards'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-[13px] text-[#555] hover:text-[#f78c2a] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-[12px] font-bold tracking-widest uppercase text-[#1f1f1f] mb-3">LINKS</h4>
            <ul className="space-y-2">
              {[['Shop', '/shop'],['Blog','/blog'],['About','/about']].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-[13px] text-[#555] hover:text-[#f78c2a] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="bg-[#c5c5c5] py-3">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[12px] text-[#555]">
            © {new Date().getFullYear()} Rustik Plank. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-[11px] text-[#777]">Visa</span>
            <span className="text-[11px] text-[#777]">Mastercard</span>
            <span className="text-[11px] text-[#777]">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
