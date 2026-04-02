function TopBar() {
  return (
    <div className="top-bar py-2 px-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-gray-600 text-xs sm:text-sm">
        <span>
          <i className="fas fa-phone-alt mr-1" /> Call for Customer support: 020 38989565
        </span>
        <nav className="flex gap-4 mt-1 sm:mt-0">
          <a href="/auth/login" className="hover:text-red-600 transition">My Account</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-red-600 transition">Wishlist</a>
          <span className="text-gray-300">|</span>
          <a href="/shopping/cart" className="hover:text-red-600 transition">To Checkout</a>
        </nav>
      </div>
    </div>
  );
}

export default TopBar;
