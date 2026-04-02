import SiteLayout from '../../components/layout/SiteLayout';

function MyAccountPage() {
  return (
    <SiteLayout>
      <main className="max-w-7xl mx-auto px-4">
              <nav className="breadcrumb py-4 text-sm text-gray-500">
                <a href="/" className="hover:text-red-600">Home</a>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-700">My Account</span>
              </nav>
              <div className="flex flex-col lg:flex-row gap-8 mb-8">
                {/* Sidebar */}
                <aside className="lg:w-64 flex-shrink-0">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <h3 className="bg-gray-100 px-4 py-3 font-bold text-sm text-gray-800 border-b border-gray-200">MY ACCOUNT</h3>
                    <ul className="divide-y divide-gray-100">
                      <li><a href="/account/my-account" className="block px-4 py-2.5 text-sm text-red-600 bg-red-50 font-semibold">Account Dashboard</a></li>
                      <li><a href="/account/edit-account" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 transition">Account Information</a></li>
                      <li><a href="/account/edit-billing" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 transition">Address Book</a></li>
                      <li><a href="/account/order-summary" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 transition">My Orders</a></li>
                      <li><a href="#" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 transition">My Wishlist</a></li>
                      <li><a href="#" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 transition">Newsletter Subscriptions</a></li>
                    </ul>
                  </div>
                </aside>
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">My Dashboard</h1>
                  {/* Welcome */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">Hello, <strong>John Doe</strong>! From your My Account Dashboard you have the ability to view a snapshot of your recent account activity and update your account information. Select a link below to view or edit information.</p>
                  </div>
                  {/* Account Information */}
                  <section className="mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Account Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-sm text-gray-800 mb-2">Contact Information</h3>
                        <p className="text-sm text-gray-600 mb-1">John Doe</p>
                        <p className="text-sm text-gray-600 mb-3">johndoe@example.com</p>
                        <div className="flex gap-3">
                          <a href="/account/edit-account" className="text-sm text-red-600 hover:text-red-800 transition">Edit</a>
                          <a href="#" className="text-sm text-red-600 hover:text-red-800 transition">Change Password</a>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-sm text-gray-800 mb-2">Newsletter</h3>
                        <p className="text-sm text-gray-600 mb-3">You are currently not subscribed to any newsletter.</p>
                        <a href="#" className="text-sm text-red-600 hover:text-red-800 transition">Edit</a>
                      </div>
                    </div>
                  </section>
                  {/* Address Book */}
                  <section className="mb-8">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                      <h2 className="text-lg font-bold text-gray-800">Address Book</h2>
                      <a href="/account/edit-billing" className="text-sm text-red-600 hover:text-red-800 transition">Manage Addresses</a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-sm text-gray-800 mb-2">Default Billing Address</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">John Doe<br />18 Street Name<br />City, State 12345<br />Country<br />T: 123-456-7890</p>
                        <a href="/account/edit-billing" className="text-sm text-red-600 hover:text-red-800 transition inline-block mt-2">Edit Address</a>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-sm text-gray-800 mb-2">Default Shipping Address</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">John Doe<br />18 Street Name<br />City, State 12345<br />Country<br />T: 123-456-7890</p>
                        <a href="/account/edit-shipping" className="text-sm text-red-600 hover:text-red-800 transition inline-block mt-2">Edit Address</a>
                      </div>
                    </div>
                  </section>
                  {/* Recent Orders */}
                  <section>
                    <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Recent Orders</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Order #</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Ship To</th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-700">Order Total</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-700">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          <tr className="hover:bg-gray-50 transition">
                            <td className="py-3 px-4 text-red-600 font-semibold">100000011</td>
                            <td className="py-3 px-4 text-gray-600">11/8/2014</td>
                            <td className="py-3 px-4 text-gray-600">John Doe</td>
                            <td className="py-3 px-4 text-gray-800 font-semibold text-right">$10,055.00</td>
                            <td className="py-3 px-4"><span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">Pending</span></td>
                            <td className="py-3 px-4 text-center"><a href="/account/order-details" className="text-sm text-red-600 hover:text-red-800 transition">View Order</a></td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition">
                            <td className="py-3 px-4 text-red-600 font-semibold">100000010</td>
                            <td className="py-3 px-4 text-gray-600">10/15/2014</td>
                            <td className="py-3 px-4 text-gray-600">John Doe</td>
                            <td className="py-3 px-4 text-gray-800 font-semibold text-right">$5,032.50</td>
                            <td className="py-3 px-4"><span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">Complete</span></td>
                            <td className="py-3 px-4 text-center"><a href="/account/order-details" className="text-sm text-red-600 hover:text-red-800 transition">View Order</a></td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition">
                            <td className="py-3 px-4 text-red-600 font-semibold">100000009</td>
                            <td className="py-3 px-4 text-gray-600">09/20/2014</td>
                            <td className="py-3 px-4 text-gray-600">John Doe</td>
                            <td className="py-3 px-4 text-gray-800 font-semibold text-right">$8,750.00</td>
                            <td className="py-3 px-4"><span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">Complete</span></td>
                            <td className="py-3 px-4 text-center"><a href="/account/order-details" className="text-sm text-red-600 hover:text-red-800 transition">View Order</a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              </div>
            </main>
    </SiteLayout>
  );
}

export default MyAccountPage;
