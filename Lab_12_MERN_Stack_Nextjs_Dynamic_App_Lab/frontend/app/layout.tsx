import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Rustik Plank | Handcrafted Solid Wood Furniture',
  description: 'Premium handcrafted reclaimed wood furniture.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white antialiased">
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        {children}
      </body>
    </html>
  );
}
