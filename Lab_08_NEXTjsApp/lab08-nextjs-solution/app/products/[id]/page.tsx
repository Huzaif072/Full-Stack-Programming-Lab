import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, products } from "@/data/products";

type ProductDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: ProductDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetailsPage({ params }: ProductDetailsProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="mb-3 inline-block rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-800">
        Product ID: {product.id}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {product.title}
      </h1>
      <p className="mt-4 text-slate-700">{product.description}</p>
      <p className="mt-6 text-xl font-semibold text-slate-900">
        ${product.price.toFixed(2)}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/products"
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Back to Product List
        </Link>
        <Link
          href="/"
          className="rounded-md bg-cyan-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-800"
        >
          Go to Home
        </Link>
      </div>
    </section>
  );
}
