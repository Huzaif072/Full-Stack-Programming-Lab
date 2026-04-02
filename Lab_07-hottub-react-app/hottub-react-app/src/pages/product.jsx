import SiteLayout from '../components/layout/SiteLayout';
import ProductMainSection from '../components/pages/product/ProductMainSection';

function ProductPage() {
  return (
    <SiteLayout>
      <main className="max-w-7xl mx-auto px-4">
        <nav className="breadcrumb py-4 text-sm text-gray-500">
          <a href="/" className="hover:text-red-600">Home</a>
          <span className="mx-2">&gt;</span>
          <a href="/category" className="hover:text-red-600">Category</a>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-700">Product Details</span>
        </nav>
        <ProductMainSection />
            </main>
    </SiteLayout>
  );
}

export default ProductPage;
