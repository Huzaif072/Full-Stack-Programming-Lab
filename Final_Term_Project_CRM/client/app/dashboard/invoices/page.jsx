'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FileText, Download } from 'lucide-react';
import api from '@/lib/axios';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import AnimatedPage from '@/components/ui/AnimatedPage';
import { generateInvoicePDF } from '@/components/invoices/generatePDF';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;

    let cancelled = false;

    const fetchInvoices = async () => {
      try {
        const { data } = await api.get('/api/invoices');
        if (!cancelled) {
          setInvoices(data);
          fetched.current = true;
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || 'Failed to load invoices');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchInvoices();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <Spinner />;
  if (error) {
    return (
      <p className="animate-fade-in rounded-lg bg-error-container px-4 py-3 text-on-error-container">
        {error}
      </p>
    );
  }

  return (
    <AnimatedPage className="space-y-6">
      <div className="flex justify-end animate-fade-in-up">
        <Link href="/dashboard/invoices/generate">
          <Button icon={FileText}>Generate Invoice</Button>
        </Link>
      </div>

      {invoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-card bg-surface py-16 shadow-sm animate-scale-in">
          <FileText className="mb-3 h-12 w-12 text-outline" />
          <p className="text-headline-sm text-on-surface">No invoices yet</p>
          <p className="mt-2 text-body-md text-on-surface-variant">
            Generate your first invoice to get started.
          </p>
          <Link href="/dashboard/invoices/generate" className="mt-4">
            <Button>Generate Invoice</Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-card bg-surface shadow-sm animate-fade-in-up">
          <table className="hidden w-full md:table">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                {['Invoice #', 'Customer', 'Date', 'Total', 'Actions'].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-label-caps uppercase text-on-surface-variant"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr
                  key={invoice._id}
                  className="border-b border-neutral-200 last:border-0 transition-colors duration-150 hover:bg-neutral-50 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.04}s` }}
                >
                  <td className="px-4 py-3 font-mono text-data-mono text-primary">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-4 py-3 text-body-md">
                    {invoice.customer?.name || '—'}
                  </td>
                  <td className="px-4 py-3 text-body-md text-on-surface-variant">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-data-mono font-medium">
                    ${invoice.totalAmount?.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        generateInvoicePDF({
                          invoiceNumber: invoice.invoiceNumber,
                          customer: invoice.customer,
                          services: invoice.services,
                          subtotal: invoice.subtotal,
                          tax: invoice.tax,
                          totalAmount: invoice.totalAmount,
                          date: invoice.date,
                          dueDate: invoice.dueDate,
                          notes: invoice.notes,
                        })
                      }
                      className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-body-sm text-primary transition-colors duration-150 hover:bg-primary-fixed"
                    >
                      <Download className="h-4 w-4" />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="space-y-3 p-4 md:hidden">
            {invoices.map((invoice, index) => (
              <div
                key={invoice._id}
                className="rounded-lg border border-neutral-200 p-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <p className="font-mono text-data-mono font-medium text-primary">
                  {invoice.invoiceNumber}
                </p>
                <p className="mt-1 text-body-md">{invoice.customer?.name}</p>
                <p className="text-body-sm text-on-surface-variant">
                  {new Date(invoice.date).toLocaleDateString()} — $
                  {invoice.totalAmount?.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </AnimatedPage>
  );
}
