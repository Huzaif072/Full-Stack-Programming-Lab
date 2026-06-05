'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  FileText,
  Download,
} from 'lucide-react';
import api from '@/lib/axios';
import { useToast } from '@/lib/toast';
import Spinner from '@/components/ui/Spinner';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';
import DeleteConfirmModal from '@/components/customers/DeleteConfirmModal';
import { generateInvoicePDF } from '@/components/invoices/generatePDF';

export default function CustomerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const toast = useToast();
  const [customer, setCustomer] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerRes, invoicesRes] = await Promise.all([
          api.get(`/api/customers/${params.id}`),
          api.get(`/api/invoices?customerId=${params.id}`),
        ]);
        setCustomer(customerRes.data);
        setInvoices(invoicesRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Customer not found');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/api/customers/${params.id}`);
      toast.success('Customer deleted');
      router.push('/dashboard/customers');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Spinner />;
  if (error || !customer) {
    return (
      <p className="rounded-lg bg-error-container px-4 py-3 text-on-error-container">
        {error || 'Customer not found'}
      </p>
    );
  }

  const initials = customer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-card bg-surface p-6 shadow-sm lg:col-span-1">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-fixed text-2xl font-bold text-primary">
            {initials}
          </div>
          <h2 className="mt-4 text-headline-sm text-on-surface">{customer.name}</h2>
          <div className="mt-2">
            <StatusBadge status={customer.status} />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-body-md text-on-surface-variant">
            <Mail className="h-4 w-4 shrink-0 text-outline" />
            {customer.email}
          </div>
          <div className="flex items-center gap-3 text-body-md text-on-surface-variant">
            <Phone className="h-4 w-4 shrink-0 text-outline" />
            {customer.phone}
          </div>
          {customer.company && (
            <div className="flex items-center gap-3 text-body-md text-on-surface-variant">
              <Building2 className="h-4 w-4 shrink-0 text-outline" />
              {customer.company}
            </div>
          )}
          {customer.address && (
            <div className="flex items-start gap-3 text-body-md text-on-surface-variant">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-outline" />
              {customer.address}
            </div>
          )}
          <div className="flex items-center gap-3 text-body-md text-on-surface-variant">
            <Calendar className="h-4 w-4 shrink-0 text-outline" />
            Added {new Date(customer.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Link href={`/dashboard/customers/${params.id}/edit`}>
            <Button className="w-full">Edit</Button>
          </Link>
          <Button variant="danger" className="w-full" onClick={() => setDeleteOpen(true)}>
            Delete
          </Button>
        </div>
      </div>

      <div className="space-y-6 lg:col-span-2">
        {customer.notes && (
          <div className="rounded-card bg-surface p-6 shadow-sm">
            <h3 className="text-headline-sm text-on-surface">Notes</h3>
            <p className="mt-3 text-body-md text-on-surface-variant">{customer.notes}</p>
          </div>
        )}

        <div className="rounded-card bg-surface p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-headline-sm text-on-surface">Invoice History</h3>
            <Link href={`/dashboard/invoices/generate?customerId=${params.id}`}>
              <Button variant="secondary" icon={FileText}>
                Generate Invoice
              </Button>
            </Link>
          </div>

          {invoices.length === 0 ? (
            <p className="py-8 text-center text-body-md text-on-surface-variant">
              No invoices yet for this customer.
            </p>
          ) : (
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div
                  key={invoice._id}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 p-4"
                >
                  <div>
                    <p className="font-mono text-data-mono font-medium text-on-surface">
                      {invoice.invoiceNumber}
                    </p>
                    <p className="text-body-sm text-on-surface-variant">
                      {new Date(invoice.date).toLocaleDateString()} —{' '}
                      <span className="font-mono">
                        ${invoice.totalAmount?.toFixed(2)}
                      </span>
                    </p>
                  </div>
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
                    className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-body-sm text-primary hover:bg-primary-fixed"
                  >
                    <Download className="h-4 w-4" />
                    PDF
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        loading={deleting}
        customerName={customer.name}
      />
    </div>
  );
}
