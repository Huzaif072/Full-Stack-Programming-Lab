import "./globals.css";

export const metadata = {
  title: "Ecommerce Lab App",
  description: "Basic ecommerce frontend with Next.js and Tailwind CSS"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
