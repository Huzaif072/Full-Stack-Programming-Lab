import './globals.css';

export const metadata = {
  title: 'CRM Pro — Customer Relationship Management',
  description: 'Professional CRM system for managing customers and invoices',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
