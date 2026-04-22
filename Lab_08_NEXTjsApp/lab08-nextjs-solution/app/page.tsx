import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex w-full flex-col gap-8">
      <div className="rounded-2xl border border-slate-200 bg-white/85 p-8 shadow-sm">
        <p className="mb-3 inline-block rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-800">
          Full Stack Programming Lab
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Home Page
        </h1>
        <p className="mt-4 max-w-2xl text-slate-700">
          This lab app demonstrates App Router fundamentals in Next.js: static
          pages, reusable components, and dynamic routes for product details.
          Use the cards below to navigate through each required task section.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">About</h2>
          <p className="mt-2 text-sm text-slate-600">
            Learn what this lab solution covers and how App Router pages are
            organized.
          </p>
          <Link
            href="/about"
            className="mt-4 inline-block rounded-md bg-cyan-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-800"
          >
            Open About
          </Link>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
          <p className="mt-2 text-sm text-slate-600">
            A dedicated Contact page completes the required multi-page app.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-md bg-cyan-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-800"
          >
            Open Contact
          </Link>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Products</h2>
          <p className="mt-2 text-sm text-slate-600">
            View the ProductList component and dynamic product detail pages.
          </p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-md bg-cyan-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-800"
          >
            Browse Products
          </Link>
        </article>
      </div>
    </section>
  );
}
