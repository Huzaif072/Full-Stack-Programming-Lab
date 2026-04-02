function CategorySidebar() {
  return (
    <aside className="lg:w-1/4">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <h3 className="bg-gray-100 font-bold text-sm px-4 py-3 border-b border-gray-200 tracking-wide">SHOP BY</h3>
        <div className="p-4">
          <h4 className="font-semibold text-sm text-gray-700 mb-3">Category</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-red-600 transition flex justify-between"><span>Plug and Play 110 Volt</span><span className="text-gray-400">(12)</span></a></li>
            <li><a href="#" className="hover:text-red-600 transition flex justify-between"><span>TV - Stereo Spas</span><span className="text-gray-400">(8)</span></a></li>
            <li><a href="#" className="hover:text-red-600 transition flex justify-between"><span>Corner Spas</span><span className="text-gray-400">(5)</span></a></li>
            <li><a href="#" className="hover:text-red-600 transition flex justify-between"><span>Portable Spas</span><span className="text-gray-400">(15)</span></a></li>
          </ul>
        </div>
        <div className="border-t border-gray-200 p-4">
          <h4 className="font-semibold text-sm text-gray-700 mb-3">Price Range</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-red-600 transition">$0 - $1,000</a></li>
            <li><a href="#" className="hover:text-red-600 transition">$1,000 - $3,000</a></li>
            <li><a href="#" className="hover:text-red-600 transition">$3,000 - $5,000</a></li>
            <li><a href="#" className="hover:text-red-600 transition">$5,000+</a></li>
          </ul>
        </div>
        <div className="border-t border-gray-200 p-4">
          <h4 className="font-semibold text-sm text-gray-700 mb-3">Brand</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-red-600 transition">HotSpring</a></li>
            <li><a href="#" className="hover:text-red-600 transition">Caldera</a></li>
            <li><a href="#" className="hover:text-red-600 transition">Freeflow</a></li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default CategorySidebar;
