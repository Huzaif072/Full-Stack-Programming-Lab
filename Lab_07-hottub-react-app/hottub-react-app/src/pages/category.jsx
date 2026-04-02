import SiteLayout from '../components/layout/SiteLayout';
import CategorySidebar from '../components/pages/category/CategorySidebar';
import CategoryProductsSection from '../components/pages/category/CategoryProductsSection';

function CategoryPage() {
  return (
    <SiteLayout>
      <main className="max-w-7xl mx-auto px-4">
        <nav className="breadcrumb py-4 text-sm text-gray-500">
          <a href="/" className="hover:text-red-600">Home</a>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-700">Category</span>
        </nav>
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <CategorySidebar />
          <CategoryProductsSection />
        </div>
            </main>
    </SiteLayout>
  );
}

export default CategoryPage;
