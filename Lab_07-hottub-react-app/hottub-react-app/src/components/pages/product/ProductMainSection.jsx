function ProductMainSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 mb-8">
      <div className="lg:w-3/4">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-1/2 product-gallery">
            <div className="bg-gray-100 rounded-lg p-4 mb-4"><img src="/assets/images/product-detail.png" alt="Emerald Bay Hot Tub" className="main-product-img w-full h-auto rounded" /></div>
            <div className="grid grid-cols-4 gap-2">
              <img src="/assets/images/113152315_spa-566.png" alt="Spa angle 1" className="thumbnail-img w-full h-16 object-contain bg-gray-100 rounded cursor-pointer border-2 border-red-500 p-1" />
              <img src="/assets/images/113152315_spa-566_copy.png" alt="Spa angle 2" className="thumbnail-img w-full h-16 object-contain bg-gray-100 rounded cursor-pointer border-2 border-transparent p-1 hover:border-gray-400" />
              <img src="/assets/images/113152315_spa-566_copy_2.png" alt="Spa angle 3" className="thumbnail-img w-full h-16 object-contain bg-gray-100 rounded cursor-pointer border-2 border-transparent p-1 hover:border-gray-400" />
              <img src="/assets/images/113152315_spa-566_copy_3.png" alt="Spa angle 4" className="thumbnail-img w-full h-16 object-contain bg-gray-100 rounded cursor-pointer border-2 border-transparent p-1 hover:border-gray-400" />
            </div>
          </div>

          <div className="md:w-1/2">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Emerald Bay XL TV DVD Stereo Hot Tub with 90 Jets</h1>
            <div className="flex items-center gap-2 mb-4"><div className="flex text-yellow-400 text-sm"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" /></div><span className="text-gray-400 text-sm">(24 reviews)</span></div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-100 pb-2"><span className="font-semibold text-gray-600">Size/Seating Capacity</span><span className="text-gray-700">77", 77", 32" / 6 Persons</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-2"><span className="font-semibold text-gray-600">Seating Design</span><span className="text-gray-700">Bucket, Lounge, Chair, Bench</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-2"><span className="font-semibold text-gray-600">Water Capacity / Dry Weight</span><span className="text-gray-700">305 Gallons / 573 lbs.</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-2"><span className="font-semibold text-gray-600">Number of Pumps</span><span className="text-gray-700">2 X 5HP</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-2"><span className="font-semibold text-gray-600">Electrical</span><span className="text-gray-700">5.5 KW Heavy Heater, 220V, 50 amp</span></div>
            </div>
          </div>
        </div>

        <div className="tabs-container mb-8">
          <div className="flex flex-wrap border-b border-gray-200">
            <button className="tab-btn active px-6 py-3 text-sm font-semibold" data-tab="tab-details">Details</button>
            <button className="tab-btn px-6 py-3 text-sm font-semibold text-gray-500" data-tab="tab-specs">Quick Specs</button>
            <button className="tab-btn px-6 py-3 text-sm font-semibold text-gray-500" data-tab="tab-accessories">Accessories</button>
            <button className="tab-btn px-6 py-3 text-sm font-semibold text-gray-500" data-tab="tab-reviews">Reviews</button>
            <button className="tab-btn px-6 py-3 text-sm font-semibold text-gray-500" data-tab="tab-qa">Q &amp; A</button>
          </div>
          <div id="tab-details" className="tab-content active p-6 bg-gray-50 rounded-b-lg"><h3 className="font-bold text-gray-800 mb-3">Product Details</h3><p className="text-sm text-gray-600 mb-4">Emerald Bay XL TV DVD Stereo Hot Tub with 90 Jets</p></div>
          <div id="tab-specs" className="tab-content p-6 bg-gray-50 rounded-b-lg"><h3 className="font-bold text-gray-800 mb-4">Quick Specifications</h3></div>
          <div id="tab-accessories" className="tab-content p-6 bg-gray-50 rounded-b-lg"><h3 className="font-bold text-gray-800 mb-4">Accessories</h3></div>
          <div id="tab-reviews" className="tab-content p-6 bg-gray-50 rounded-b-lg"><h3 className="font-bold text-gray-800 mb-4">Customer Reviews</h3></div>
          <div id="tab-qa" className="tab-content p-6 bg-gray-50 rounded-b-lg"><h3 className="font-bold text-gray-800 mb-4">Questions &amp; Answers</h3></div>
        </div>

        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Customers Who Viewed This Item Also Viewed</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="product-card bg-white rounded shadow p-3 text-center"><img src="/assets/images/113152315_spa-566.png" alt="Spa" className="w-16 h-16 mx-auto object-contain mb-2" /><h5 className="text-xs font-semibold text-gray-700 mb-1">Bosch 22 Cu. Ft Stainless Refrigerator</h5><p className="text-red-600 font-bold text-sm">$2,549.15</p><p className="text-gray-400 text-xs">B22CS30SNSS</p></div>
            <div className="product-card bg-white rounded shadow p-3 text-center"><img src="/assets/images/113152315_spa-566_copy.png" alt="Spa" className="w-16 h-16 mx-auto object-contain mb-2" /><h5 className="text-xs font-semibold text-gray-700 mb-1">Bosch 22 Cu. Ft Stainless Refrigerator</h5><p className="text-red-600 font-bold text-sm">$2,549.15</p><p className="text-gray-400 text-xs">B22CS30SNSS</p></div>
            <div className="product-card bg-white rounded shadow p-3 text-center"><img src="/assets/images/113152315_spa-566_copy_2.png" alt="Spa" className="w-16 h-16 mx-auto object-contain mb-2" /><h5 className="text-xs font-semibold text-gray-700 mb-1">Bosch 22 Cu. Ft Stainless Refrigerator</h5><p className="text-red-600 font-bold text-sm">$2,549.15</p><p className="text-gray-400 text-xs">B22CS30SNSS</p></div>
            <div className="product-card bg-white rounded shadow p-3 text-center"><img src="/assets/images/113152315_spa-566_copy_3.png" alt="Spa" className="w-16 h-16 mx-auto object-contain mb-2" /><h5 className="text-xs font-semibold text-gray-700 mb-1">Bosch 22 Cu. Ft Stainless Refrigerator</h5><p className="text-red-600 font-bold text-sm">$2,549.15</p><p className="text-gray-400 text-xs">B22CS30SNSS</p></div>
          </div>
        </section>
      </div>

      <aside className="lg:w-1/4">
        <div className="price-calculator rounded-lg p-5 sticky top-4">
          <h3 className="font-bold text-gray-800 mb-4">Price Calculator</h3>
          <div className="space-y-3 text-sm">
            <div><label className="block text-gray-600 text-xs font-semibold mb-1">Interior Color:</label><select className="form-select calculator-select text-xs"><option data-price={0}>Standard - White</option><option data-price={50}>Premium - Silver</option></select></div>
            <div><label className="block text-gray-600 text-xs font-semibold mb-1">Outside Shell Color:</label><select className="form-select calculator-select text-xs"><option data-price={0}>Mahogany</option><option data-price={50}>Coastal Gray</option></select></div>
            <div><label className="block text-gray-600 text-xs font-semibold mb-1">Quantity:</label><select className="form-select calculator-select text-xs"><option data-price={0}>1</option></select></div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-300 text-center"><p className="font-bold text-lg text-gray-800">Total Price: <span id="calculatorTotal">$650.00</span></p></div>
          <button className="btn-navy w-full mt-4 py-3 rounded font-semibold text-sm flex items-center justify-center gap-2"><i className="fas fa-shopping-cart" /> ADD TO CART</button>
        </div>
      </aside>
    </div>
  );
}

export default ProductMainSection;
