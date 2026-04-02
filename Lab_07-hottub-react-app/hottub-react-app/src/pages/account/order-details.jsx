import SiteLayout from '../../components/layout/SiteLayout';

function OrderDetailsPage() {
  return (
    <SiteLayout>
      <main className="max-w-7xl mx-auto px-4">
              <nav className="breadcrumb py-4 text-sm text-gray-500">
                <a href="/" className="hover:text-red-600">Home</a>
                <span className="mx-2">&gt;</span>
                <a href="/account/my-account" className="hover:text-red-600">My Account</a>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-700">Order # 100000011</span>
              </nav>
              <div className="flex flex-col lg:flex-row gap-8 mb-8">
                {/* Sidebar */}
                <aside className="lg:w-64 flex-shrink-0">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <h3 className="bg-gray-100 px-4 py-3 font-bold text-sm text-gray-800 border-b border-gray-200">MY ACCOUNT</h3>
                    <ul className="divide-y divide-gray-100">
                      <li><a href="/account/my-account" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 transition">Account Dashboard</a></li>
                      <li><a href="/account/edit-account" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 transition">Account Information</a></li>
                      <li><a href="/account/edit-billing" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 transition">Address Book</a></li>
                      <li><a href="/account/order-summary" className="block px-4 py-2.5 text-sm text-red-600 bg-red-50 font-semibold">My Orders</a></li>
                      <li><a href="#" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 transition">My Wishlist</a></li>
                      <li><a href="#" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 transition">Newsletter Subscriptions</a></li>
                    </ul>
                  </div>
                  {/* Order Info Quick View */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
                    <h4 className="font-bold text-sm text-gray-800 mb-3">Order Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Order #:</span>
                        <span className="text-red-600 font-semibold ml-1">100000011</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Date:</span>
                        <span className="text-gray-700 ml-1">Nov 8, 2014</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Status:</span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded ml-1">Pending</span>
                      </div>
                    </div>
                  </div>
                </aside>
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Order # 100000011</h1>
                  {/* Order Items */}
                  <section className="mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Items Ordered</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Product Name</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">SKU</th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-700">Qty</th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-700">Price</th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-700">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          <tr>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img src="/assets/images/113152315_spa-566.png" alt="Spa" className="w-16 h-16 object-cover rounded" />
                                <div>
                                  <a href="/product" className="font-semibold text-red-600 hover:text-red-800 transition">5-7 Person 158 Jet Spa with Stereo System</a>
                                  <p className="text-xs text-gray-400 mt-1">Color: Sterling Silver | Shell: Pearl</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600">SPA-158-07</td>
                            <td className="py-3 px-4 text-center">
                              <span className="text-gray-600">Ordered: 1</span><br />
                              <span className="text-green-600 text-xs">Shipped: 0</span>
                            </td>
                            <td className="py-3 px-4 text-right text-gray-800 font-semibold">$5,012.50</td>
                            <td className="py-3 px-4 text-right text-gray-800 font-semibold">$5,012.50</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img src="/assets/images/113152315_spa-566_copy.png" alt="Spa" className="w-16 h-16 object-cover rounded" />
                                <div>
                                  <a href="/product" className="font-semibold text-red-600 hover:text-red-800 transition">TV Theater Spa - Premium Home Entertainment</a>
                                  <p className="text-xs text-gray-400 mt-1">Color: Midnight Canyon</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600">SPA-TV-01</td>
                            <td className="py-3 px-4 text-center">
                              <span className="text-gray-600">Ordered: 1</span><br />
                              <span className="text-green-600 text-xs">Shipped: 0</span>
                            </td>
                            <td className="py-3 px-4 text-right text-gray-800 font-semibold">$5,012.50</td>
                            <td className="py-3 px-4 text-right text-gray-800 font-semibold">$5,012.50</td>
                          </tr>
                        </tbody>
                        <tfoot className="bg-gray-50">
                          <tr>
                            <td colSpan={4} className="py-3 px-4 text-right font-semibold text-gray-700">Subtotal</td>
                            <td className="py-3 px-4 text-right font-semibold text-gray-800">$10,025.00</td>
                          </tr>
                          <tr>
                            <td colSpan={4} className="py-2 px-4 text-right text-gray-600">Shipping &amp; Handling</td>
                            <td className="py-2 px-4 text-right text-gray-600">$30.00</td>
                          </tr>
                          <tr className="border-t border-gray-200">
                            <td colSpan={4} className="py-3 px-4 text-right font-bold text-gray-800 text-base">Grand Total</td>
                            <td className="py-3 px-4 text-right font-bold text-red-600 text-base">$10,055.00</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </section>
                  {/* Payment & Shipping */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <section>
                      <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Payment Method</h2>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-2"><i className="fab fa-cc-visa text-blue-700 mr-2" />Visa ending in 4242</p>
                        <h4 className="font-semibold text-sm text-gray-700 mt-3 mb-1">Bank Transfer Details:</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Bank Name: National Spa Bank<br />
                          Account Name: HotSpring Portable Spas<br />
                          Sort Code: 12-34-56<br />
                          Account Number: 12345678
                        </p>
                      </div>
                    </section>
                    <section>
                      <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Shipping Method</h2>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600"><i className="fas fa-truck mr-2 text-gray-400" />Flat Rate - Fixed: $30.00</p>
                      </div>
                    </section>
                  </div>
                  {/* Addresses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <section>
                      <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Billing Address</h2>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          John Doe<br />18 Street Name<br />City, State 12345<br />Country<br />T: 123-456-7890
                        </p>
                      </div>
                    </section>
                    <section>
                      <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Shipping Address</h2>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          John Doe<br />18 Street Name<br />City, State 12345<br />Country<br />T: 123-456-7890
                        </p>
                      </div>
                    </section>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="/account/my-account" className="btn-navy px-8 py-3 rounded font-semibold text-sm text-center">BACK TO MY ACCOUNT</a>
                    <button onclick="window.print()" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded font-semibold text-sm transition">PRINT ORDER</button>
                  </div>
                </div>
              </div>
            </main>
    </SiteLayout>
  );
}

export default OrderDetailsPage;
