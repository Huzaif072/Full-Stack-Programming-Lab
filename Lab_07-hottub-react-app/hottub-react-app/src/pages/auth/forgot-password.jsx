import SiteLayout from '../../components/layout/SiteLayout';

function ForgotPasswordPage() {
  return (
    <SiteLayout>
      <main className="max-w-7xl mx-auto px-4">
              <nav className="breadcrumb py-4 text-sm text-gray-500">
                <a href="/" className="hover:text-red-600">Home</a>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-700">Forgot Your Password</span>
              </nav>
              <div className="bg-white shadow-sm rounded-lg border border-gray-100 mb-8">
                <div className="p-6 md:p-10">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Forgot Your Password?</h1>
                  <div className="border-t border-gray-200 pt-6 mt-4 max-w-xl">
                    <p className="text-sm text-gray-500 mb-4">Please enter your email address below. You will receive a link to reset your password.</p>
                    <p className="text-sm text-gray-400 mb-6">* Required Fields</p>
                    <form id="forgotPasswordForm" className="space-y-4" noValidate>
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Email Address *</label>
                        <input type="email" name="email" className="form-input" required />
                        <p className="error-message" />
                      </div>
                      <div className="flex items-center gap-4 pt-2">
                        <button type="submit" className="btn-navy px-8 py-3 rounded font-semibold text-sm">SUBMIT</button>
                        <a href="/auth/login" className="text-sm text-red-600 hover:text-red-800 transition">Back to Login</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </main>
    </SiteLayout>
  );
}

export default ForgotPasswordPage;
