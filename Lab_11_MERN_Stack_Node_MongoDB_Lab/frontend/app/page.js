import ProductCard from "../components/ProductCard";

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store"
    });

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Ecommerce Product Catalog</h1>
        <p className="mt-2 text-slate-600">
          Products are loaded from the Express.js + MongoDB backend API.
        </p>
      </header>

      {products.length === 0 ? (
        <p className="rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-800">
          No products found. Make sure the backend server is running and seeded.
        </p>
      ) : (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}
