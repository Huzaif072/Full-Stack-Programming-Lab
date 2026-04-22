import Link from "next/link";
import { products } from "@/data/products";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <article
          key={product.id}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-slate-900">{product.title}</h2>
          <p className="mt-2 text-sm text-slate-600">{product.description}</p>
          <p className="mt-4 text-lg font-bold text-cyan-800">
            {currency.format(product.price)}
          </p>
          <Link
            href={"/products/" + product.id}
            className="mt-4 inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            View Details
          </Link>
        </article>
      ))}
    </div>
  );
}
