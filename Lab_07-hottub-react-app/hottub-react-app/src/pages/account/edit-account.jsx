import SiteLayout from '../../components/layout/SiteLayout';

function EditAccountPage() {
  return (
    <SiteLayout>
      <main className="max-w-7xl mx-auto px-4">
              <nav className="breadcrumb py-4 text-sm text-gray-500">
                <a href="/" className="hover:text-red-600">Home</a>
                <span className="mx-2">&gt;</span>
                <a href="/account/my-account" className="hover:text-red-600">My Account</a>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-700">Edit Account Information</span>
              </nav>
              <div className="flex flex-col lg:flex-row gap-8 mb-8">
                {/* Sidebar */}
                <aside className="lg:w-64 flex-shrink-0">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <h3 className="bg-gray-100 px-4 py-3 font-bold text-sm text-gray-800 border-b border-gray-200">MY ACCOUNT</h3>
                    <ul className="divide-y divide-gray-100">
                      <li><a href="/account/my-account" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 transition">Account Dashboard</a></li>
                      <li><a href="/account/edit-account" className="block px-4 py-2.5 text-sm text-red-600 bg-red-50 font-semibold">Account Information</a></li>
                      <li><a href="/account/edit-billing" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 transition">Address Book</a></li>
                      <li><a href="/account/order-summary" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 transition">My Orders</a></li>
                      <li><a href="#" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 transition">My Wishlist</a></li>
                      <li><a href="#" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 transition">Newsletter Subscriptions</a></li>
                    </ul>
                  </div>
                </aside>
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Edit Account Information</h1>
                  <form id="editAccountForm" className="space-y-6" noValidate>
                    <fieldset>
                      <legend className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 w-full">Account Information</legend>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <div>
                          <label className="block text-sm font-semibold text-gray-600 mb-1">First Name *</label>
                          <input type="text" name="firstName" defaultValue="John" className="form-input" required />
                          <p className="error-message" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-600 mb-1">Last Name *</label>
                          <input type="text" name="lastName" defaultValue="Doe" className="form-input" required />
                          <p className="error-message" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-600 mb-1">Email Address *</label>
                          <input type="email" name="email" defaultValue="johndoe@example.com" className="form-input" required />
                          <p className="error-message" />
                        </div>
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 w-full">Change Password</legend>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-600 mb-1">Current Password</label>
                          <input type="password" name="currentPassword" className="form-input" />
                          <p className="error-message" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-600 mb-1">New Password</label>
                          <input type="password" name="newPassword" className="form-input" />
                          <p className="error-message" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-600 mb-1">Confirm New Password</label>
                          <input type="password" name="confirmNewPassword" className="form-input" />
                          <p className="error-message" />
                        </div>
                      </div>
                    </fieldset>
                    <div className="flex items-center gap-4 pt-2">
                      <button type="submit" className="btn-navy px-8 py-3 rounded font-semibold text-sm">UPDATE</button>
                      <a href="/account/my-account" className="text-sm text-gray-500 hover:text-gray-700 transition">Back to Dashboard</a>
                    </div>
                  </form>
                </div>
              </div>
            </main>
    </SiteLayout>
  );
}

export default EditAccountPage;
