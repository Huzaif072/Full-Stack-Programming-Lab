function SiteFooter() {
  return (
    <>
      <section className="sponsors-bar bg-white py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <img src="/assets/images/sponsor-save4.png" alt="Save4" className="h-12 md:h-16 object-contain opacity-80 hover:opacity-100 transition" />
          <img src="/assets/images/sponsor-caldera.png" alt="Caldera Spas" className="h-12 md:h-16 object-contain opacity-80 hover:opacity-100 transition" />
        </div>
      </section>

      <footer className="site-footer text-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold text-sm mb-4 tracking-wide">CONTACT US</h4>
              <p className="text-sm mb-2">yoursitename.com</p>
              <p className="text-sm mb-2">CALL 24/7: 888 - 201 - 8899</p>
              <p className="text-sm leading-relaxed">Your Address: Street<br />State &amp; Zip Code<br />City &amp; Country</p>
              <p className="text-sm mt-2">Email: service@yoursitename.com</p>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4 tracking-wide">INFORMATION</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Customer Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Site Map</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Search Terms</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4 tracking-wide">MY ACCOUNT</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/auth/login" className="text-gray-300 hover:text-white">Sign In</a></li>
                <li><a href="/shopping/cart" className="text-gray-300 hover:text-white">View Cart</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">My Wishlist</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4 tracking-wide">SIGNUP FOR A NEWSLETTER</h4>
              <p className="text-sm mb-3">Sign up for our newsletter:</p>
              <form id="newsletterForm" className="flex">
                <input type="email" id="newsletterEmail" placeholder="Enter your email" className="newsletter-input flex-1 rounded-l text-sm" required />
                <button type="submit" className="btn-red px-4 py-2 rounded-r text-sm font-semibold">GO</button>
              </form>

              <div className="mt-6">
                <h5 className="text-white font-bold text-sm mb-2 tracking-wide">PAYMENT SOLUTIONS</h5>
                <img src="/assets/images/payment-options.png" alt="Payment Options" className="h-8 object-contain opacity-80" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 text-gray-600 text-center py-4 text-sm">&copy; 2014 Hottubspaservice.com. All Rights Reserved.</div>
      </footer>

      <button id="backToTop" className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full shadow-lg hidden z-50 transition" aria-label="Back to top">
        <i className="fas fa-chevron-up" />
      </button>
    </>
  );
}

export default SiteFooter;
