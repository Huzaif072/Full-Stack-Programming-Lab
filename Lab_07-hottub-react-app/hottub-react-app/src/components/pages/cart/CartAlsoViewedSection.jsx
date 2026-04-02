function CartAlsoViewedSection() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">Customers Who Viewed This Item Also Viewed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="product-card bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <a href="/product"><img src="/assets/images/113152315_spa-566_copy_2.png" alt="Spa" className="w-full h-48 object-cover" /></a>
          <div className="p-4">
            <a href="/product" className="font-semibold text-gray-800 hover:text-red-600 transition text-sm block mb-2">Barrier Reef 158 Jet TV Stereo Home Theater Super Spa</a>
            <div className="flex items-center gap-1 mb-2"><i className="fas fa-star text-yellow-400 text-xs" /><i className="fas fa-star text-yellow-400 text-xs" /><i className="fas fa-star text-yellow-400 text-xs" /><i className="fas fa-star text-yellow-400 text-xs" /><i className="far fa-star text-gray-300 text-xs" /></div>
            <p className="text-red-600 font-bold">$5,012.50</p>
          </div>
        </div>
        <div className="product-card bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <a href="/product"><img src="/assets/images/113152315_spa-566_copy_3.png" alt="Spa" className="w-full h-48 object-cover" /></a>
          <div className="p-4">
            <a href="/product" className="font-semibold text-gray-800 hover:text-red-600 transition text-sm block mb-2">Extra Large and Deep 8 Person 158 Jet Super Spa</a>
            <div className="flex items-center gap-1 mb-2"><i className="fas fa-star text-yellow-400 text-xs" /><i className="fas fa-star text-yellow-400 text-xs" /><i className="fas fa-star text-yellow-400 text-xs" /><i className="fas fa-star text-yellow-400 text-xs" /><i className="fas fa-star-half-alt text-yellow-400 text-xs" /></div>
            <p className="text-red-600 font-bold">$5,012.50</p>
          </div>
        </div>
        <div className="product-card bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <a href="/product"><img src="/assets/images/product-5-7_PERSON_SPA.png" alt="Spa" className="w-full h-48 object-cover" /></a>
          <div className="p-4">
            <a href="/product" className="font-semibold text-gray-800 hover:text-red-600 transition text-sm block mb-2">5-7 Person Portable Spa with Stereo System</a>
            <div className="flex items-center gap-1 mb-2"><i className="fas fa-star text-yellow-400 text-xs" /><i className="fas fa-star text-yellow-400 text-xs" /><i className="fas fa-star text-yellow-400 text-xs" /><i className="fas fa-star text-yellow-400 text-xs" /><i className="far fa-star text-gray-300 text-xs" /></div>
            <p className="text-red-600 font-bold">$5,012.50</p>
          </div>
        </div>
        <div className="product-card bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <a href="/product"><img src="/assets/images/product-TV_THEATER_SPA.png" alt="Spa" className="w-full h-48 object-cover" /></a>
          <div className="p-4">
            <a href="/product" className="font-semibold text-gray-800 hover:text-red-600 transition text-sm block mb-2">TV Theater Spa Premium Entertainment System</a>
            <div className="flex items-center gap-1 mb-2"><i className="fas fa-star text-yellow-400 text-xs" /><i className="fas fa-star text-yellow-400 text-xs" /><i className="fas fa-star text-yellow-400 text-xs" /><i className="fas fa-star text-yellow-400 text-xs" /><i className="fas fa-star text-yellow-400 text-xs" /></div>
            <p className="text-red-600 font-bold">$5,012.50</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartAlsoViewedSection;
