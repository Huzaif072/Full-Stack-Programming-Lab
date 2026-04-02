import SiteLayout from '../../components/layout/SiteLayout';
import CartMainSection from '../../components/pages/cart/CartMainSection';
import CartAlsoViewedSection from '../../components/pages/cart/CartAlsoViewedSection';

function CartPage() {
  return (
    <SiteLayout>
      <main className="max-w-7xl mx-auto px-4">
        <nav className="breadcrumb py-4 text-sm text-gray-500">
          <a href="/" className="hover:text-red-600">Home</a>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-700">Shopping Cart</span>
        </nav>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

        <CartMainSection />
        <CartAlsoViewedSection />
      </main>
    </SiteLayout>
  );
}

export default CartPage;
