function MainNav() {
  return (
    <>
      <nav className="main-nav">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12">
          <div className="hidden md:flex items-center gap-0 h-full">
            <a href="/category" className="text-white text-sm font-semibold px-5 h-full flex items-center tracking-wide">CATEGORY</a>
            <span className="w-px h-6 bg-red-300" />
            <a href="/category" className="text-white text-sm font-semibold px-5 h-full flex items-center tracking-wide">BRAND</a>
            <span className="w-px h-6 bg-red-300" />
            <a href="/about" className="text-white text-sm font-semibold px-5 h-full flex items-center tracking-wide">INFO</a>
          </div>

          <form id="searchForm" className="hidden md:flex items-center ml-auto">
            <input type="text" id="searchInput" placeholder="Search" className="px-4 py-2 text-sm w-64 lg:w-80 border-0 focus:ring-0" />
            <button type="submit" className="px-6 py-2 text-white text-sm font-semibold tracking-wide" style={{ backgroundColor: 'var(--color-navy)' }}>
              SEARCH
            </button>
          </form>

          <button className="hamburger md:hidden" id="hamburgerBtn" aria-label="Open menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className="mobile-menu" id="mobileMenu">
        <button className="mobile-menu-close" id="mobileMenuClose" aria-label="Close menu">&times;</button>
        <a href="/">Home</a>
        <a href="/category">Category</a>
        <a href="/about">About Us</a>
        <a href="/contact">Contact Us</a>
        <a href="/auth/login">Login</a>
        <a href="/auth/register">Register</a>
        <a href="/shopping/cart">Shopping Cart</a>
      </div>
    </>
  );
}

export default MainNav;
