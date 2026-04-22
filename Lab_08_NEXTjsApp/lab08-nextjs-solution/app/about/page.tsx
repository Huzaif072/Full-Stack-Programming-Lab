import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About page for the Lab 08 Next.js frontend application.",
};

export default function AboutPage() {
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        About Page
      </h1>
      <p className="mt-4 max-w-3xl text-slate-700">
        This project is built with Next.js App Router and demonstrates component
        reusability, structured routing, and scalable folder-based organization.
      </p>
      <p className="mt-3 max-w-3xl text-slate-700">
        The Header and Footer are shared through the global layout so every page
        has a consistent user interface and navigation experience.
      </p>
    </section>
  );
}