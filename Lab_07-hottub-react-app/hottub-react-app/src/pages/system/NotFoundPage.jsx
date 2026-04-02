function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <section className="max-w-xl w-full bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-red-600 font-semibold mb-3">Error 404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/" className="btn-red px-6 py-3 rounded text-sm font-semibold">
            GO TO HOME
          </a>
          <a href="/category" className="btn-navy px-6 py-3 rounded text-sm font-semibold">
            BROWSE PRODUCTS
          </a>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
