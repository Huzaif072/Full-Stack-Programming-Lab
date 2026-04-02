import SiteLayout from '../../components/layout/SiteLayout';

function RegisterPage() {
  return (
    <SiteLayout>
      <main className="max-w-7xl mx-auto px-4">
              <nav className="breadcrumb py-4 text-sm text-gray-500">
                <a href="/" className="hover:text-red-600">Home</a>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-700">Create New Account</span>
              </nav>
              <div className="bg-white shadow-sm rounded-lg border border-gray-100 mb-8">
                <div className="p-6 md:p-10">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Create New Account</h1>
                  <div className="border-t border-gray-200 pt-6 mt-4">
                    <p className="text-sm text-gray-400 mb-6">* Required Fields</p>
                    <form id="registerForm" className="space-y-6 max-w-2xl" noValidate>
                      {/* Personal Information */}
                      <fieldset>
                        <legend className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 w-full">Personal Information</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">First Name *</label>
                            <input type="text" name="firstName" className="form-input" required />
                            <p className="error-message" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Last Name *</label>
                            <input type="text" name="lastName" className="form-input" required />
                            <p className="error-message" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-semibold text-gray-600 mb-1">Email Address *</label>
                          <input type="email" name="email" className="form-input" required />
                          <p className="error-message" />
                        </div>
                        <div className="mt-3">
                          <label className="flex items-center gap-2 text-sm text-gray-600">
                            <input type="checkbox" name="newsletter" className="rounded" />
                            Sign up for our Newsletter
                          </label>
                        </div>
                      </fieldset>
                      {/* Login Information */}
                      <fieldset>
                        <legend className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 w-full">Login Information</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Password *</label>
                            <input type="password" name="password" className="form-input" required />
                            <p className="error-message" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Confirm Password *</label>
                            <input type="password" name="confirmPassword" className="form-input" required />
                            <p className="error-message" />
                          </div>
                        </div>
                      </fieldset>
                      <div className="flex items-center gap-4 pt-2">
                        <button type="submit" className="btn-navy px-8 py-3 rounded font-semibold text-sm">CREATE ACCOUNT</button>
                        <a href="/auth/login" className="text-sm text-red-600 hover:text-red-800 transition">Already have an account? Sign In</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </main>
    </SiteLayout>
  );
}

export default RegisterPage;
