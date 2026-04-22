import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact page for the Lab 08 Next.js frontend application.",
};

export default function ContactPage() {
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Contact Page
      </h1>
      <p className="mt-4 text-slate-700">
        Email: info@lab08-nextjs.com
      </p>
      <p className="mt-2 text-slate-700">Phone: +1 (555) 010-2208</p>
      <p className="mt-2 max-w-2xl text-slate-700">
        This page fulfills the third required route in the multi-page app task.
      </p>
    </section>
  );
}
