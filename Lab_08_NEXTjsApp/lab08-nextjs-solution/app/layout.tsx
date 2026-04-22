import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lab 08 Next.js Frontend",
    template: "%s | Lab 08 Next.js Frontend",
  },
  description:
    "Multi-page Next.js app with reusable components and dynamic routing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const htmlClasses =
    geistSans.variable + " " + geistMono.variable + " h-full antialiased";

  return (
    <html lang="en" className={htmlClasses}>
      <body className="min-h-full font-sans text-slate-900">
        <div className="mx-auto flex min-h-full w-full flex-col">
          <Header />
          <main className="mx-auto flex w-full max-w-5xl flex-1 px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
