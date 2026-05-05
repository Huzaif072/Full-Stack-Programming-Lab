export default function ProductCard({ product }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="h-44 w-full rounded-md object-cover"
      />
      <h2 className="mt-3 text-lg font-semibold text-slate-900">{product.name}</h2>
      <p className="mt-2 text-sm text-slate-600">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-base font-bold text-indigo-600">${product.price}</span>
        <span
          className={`rounded px-2 py-1 text-xs font-medium ${
            product.inStock
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
    </article>
  );
}
