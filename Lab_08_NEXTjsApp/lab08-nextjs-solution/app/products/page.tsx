import type { Metadata } from "next";
import ProductList from "@/components/ProductList";

export const metadata: Metadata = {
  title: "Products",
  description: "Product list page rendered through a reusable ProductList component.",
};

export default function ProductsPage() {
  return (
    <section className="flex w-full flex-col gap-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Product List
        </h1>
        <p className="mt-3 text-slate-700">
          Select any product to open its detail page through dynamic routing.
        </p>
      </div>
      <ProductList />
    </section>
  );
}
