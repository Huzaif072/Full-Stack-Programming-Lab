function HomeAlsoViewedSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-8 text-gray-800">Customers Who Viewed This Item Also Viewed</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="product-card bg-white rounded shadow p-4 text-center animate-on-scroll">
            <img src="/assets/images/113152315_spa-566.png" alt="Spa Product" className="w-20 h-20 mx-auto object-contain mb-3" />
            <h5 className="text-xs font-semibold text-gray-700 mb-1">Bosch 22 Cu. Ft Stainless Refrigerator</h5>
            <p className="text-red-600 font-bold text-sm">$2,549.15</p>
            <p className="text-gray-400 text-xs">B22CS30SNSS</p>
          </div>
          <div className="product-card bg-white rounded shadow p-4 text-center animate-on-scroll">
            <img src="/assets/images/113152315_spa-566_copy.png" alt="Spa Product" className="w-20 h-20 mx-auto object-contain mb-3" />
            <h5 className="text-xs font-semibold text-gray-700 mb-1">Bosch 22 Cu. Ft Stainless Refrigerator</h5>
            <p className="text-red-600 font-bold text-sm">$2,549.15</p>
            <p className="text-gray-400 text-xs">B22CS30SNSS</p>
          </div>
          <div className="product-card bg-white rounded shadow p-4 text-center animate-on-scroll">
            <img src="/assets/images/113152315_spa-566_copy_2.png" alt="Spa Product" className="w-20 h-20 mx-auto object-contain mb-3" />
            <h5 className="text-xs font-semibold text-gray-700 mb-1">Bosch 22 Cu. Ft Stainless Refrigerator</h5>
            <p className="text-red-600 font-bold text-sm">$2,549.15</p>
            <p className="text-gray-400 text-xs">B22CS30SNSS</p>
          </div>
          <div className="product-card bg-white rounded shadow p-4 text-center animate-on-scroll">
            <img src="/assets/images/113152315_spa-566_copy_3.png" alt="Spa Product" className="w-20 h-20 mx-auto object-contain mb-3" />
            <h5 className="text-xs font-semibold text-gray-700 mb-1">Bosch 22 Cu. Ft Stainless Refrigerator</h5>
            <p className="text-red-600 font-bold text-sm">$2,549.15</p>
            <p className="text-gray-400 text-xs">B22CS30SNSS</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeAlsoViewedSection;
