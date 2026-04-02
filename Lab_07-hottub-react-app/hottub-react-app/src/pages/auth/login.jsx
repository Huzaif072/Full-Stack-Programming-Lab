import SiteLayout from '../../components/layout/SiteLayout';

function LoginPage() {
  return (
    <SiteLayout>
      <main className="max-w-7xl mx-auto px-4">
              <nav className="breadcrumb py-4 text-sm text-gray-500">
                <a href="/" className="hover:text-red-600">Home</a>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-700">My Account</span>
              </nav>
              <div className="bg-white shadow-sm rounded-lg border border-gray-100 mb-8">
                <div className="p-6 md:p-10">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Login</h1>
                  <div className="border-t border-gray-200 pt-6 mt-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Login Form */}
                      <div className="lg:w-1/2">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Registered Customers</h2>
                        <p className="text-sm text-gray-500 mb-2">If you have an account with us, please log in.</p>
                        <p className="text-sm text-gray-400 mb-4">* Required Fields</p>
                        <form id="loginForm" className="space-y-4" noValidate>
                          <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Email Address *</label>
                            <input type="email" name="email" className="form-input" required />
                            <p className="error-message" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Password *</label>
                            <input type="password" name="password" className="form-input" required />
                            <p className="error-message" />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-gray-600">
                              <input type="checkbox" name="remember" className="rounded" />
                              Remember me
                            </label>
                            <a href="/auth/forgot-password" className="text-sm text-red-600 hover:text-red-800 transition">Forgot your password?</a>
                          </div>
                          <button type="submit" className="btn-navy px-8 py-3 rounded font-semibold text-sm">SIGN IN</button>
                        </form>
                      </div>
                      {/* New Customer */}
                      <div className="lg:w-1/2 lg:border-l lg:border-gray-200 lg:pl-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">New Customers</h2>
                        <p className="text-sm text-gray-500 mb-6">By creating an account with our store, you will be able to move through the checkout process faster, store multiple shipping addresses, view and track your orders in your account and more.</p>
                        <a href="/auth/register" className="btn-red inline-block px-8 py-3 rounded font-semibold text-sm">CREATE AN ACCOUNT</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
    </SiteLayout>
  );
}

export default LoginPage;
