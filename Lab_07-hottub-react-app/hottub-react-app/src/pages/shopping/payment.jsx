import SiteLayout from '../../components/layout/SiteLayout';
import PaymentCheckoutSection from '../../components/pages/payment/PaymentCheckoutSection';

function PaymentPage() {
  return (
    <SiteLayout>
      <main className="max-w-7xl mx-auto px-4">
        <nav className="breadcrumb py-4 text-sm text-gray-500">
          <a href="/" className="hover:text-red-600">Home</a>
          <span className="mx-2">&gt;</span>
          <a href="/shopping/cart" className="hover:text-red-600">Shopping Cart</a>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-700">Checkout</span>
        </nav>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

        <PaymentCheckoutSection />
      </main>
    </SiteLayout>
  );
}

export default PaymentPage;
