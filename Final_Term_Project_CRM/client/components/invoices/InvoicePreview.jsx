'use client';

import PropTypes from 'prop-types';
import { Cloud } from 'lucide-react';

function formatCurrency(amount) {
  return `$${Number(amount || 0).toFixed(2)}`;
}

function formatDate(date) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function InvoicePreview({
  invoiceNumber,
  customer,
  services,
  subtotal,
  tax,
  totalAmount,
  date,
  dueDate,
  notes,
}) {
  const taxValue = (subtotal * (tax || 0)) / 100;

  return (
    <div className="rounded-card bg-surface p-4 md:p-6">
      <div className="mb-8 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Cloud className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-primary">CRM Pro</p>
            <p className="text-body-sm text-outline">Enterprise Edition</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-data-mono text-outline">Invoice</p>
          <p className="font-mono text-data-mono font-semibold text-on-surface">
            {invoiceNumber || 'INV-2026-DRAFT'}
          </p>
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-label-caps uppercase text-outline">Bill To</p>
          <p className="mt-1 font-semibold text-on-surface">{customer?.name}</p>
          <p className="text-body-md text-on-surface-variant">{customer?.email}</p>
          {customer?.address && (
            <p className="text-body-md text-on-surface-variant">{customer.address}</p>
          )}
        </div>
        <div className="md:text-right">
          <div className="mb-2">
            <p className="text-label-caps uppercase text-outline">Invoice Date</p>
            <p className="text-body-md text-on-surface">{formatDate(date)}</p>
          </div>
          <div>
            <p className="text-label-caps uppercase text-outline">Due Date</p>
            <p className="text-body-md text-on-surface">{formatDate(dueDate)}</p>
          </div>
        </div>
      </div>

      <table className="mb-6 w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-neutral-200">
            <th className="py-2 text-left text-label-caps uppercase text-outline">
              Description
            </th>
            <th className="py-2 text-right text-label-caps uppercase text-outline">
              Qty
            </th>
            <th className="py-2 text-right text-label-caps uppercase text-outline">
              Unit Price
            </th>
            <th className="py-2 text-right text-label-caps uppercase text-outline">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, i) => (
            <tr key={i} className="border-b border-neutral-200">
              <td className="py-3 text-body-md text-on-surface">
                {service.description}
              </td>
              <td className="py-3 text-right font-mono text-data-mono">
                {service.quantity}
              </td>
              <td className="py-3 text-right font-mono text-data-mono">
                {formatCurrency(service.unitPrice)}
              </td>
              <td className="py-3 text-right font-mono text-data-mono">
                {formatCurrency(service.quantity * service.unitPrice)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ml-auto max-w-xs space-y-2">
        <div className="flex justify-between text-body-md">
          <span className="text-on-surface-variant">Subtotal</span>
          <span className="font-mono text-data-mono">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-body-md">
          <span className="text-on-surface-variant">Tax ({tax || 0}%)</span>
          <span className="font-mono text-data-mono">{formatCurrency(taxValue)}</span>
        </div>
        <div className="flex justify-between border-t border-neutral-200 pt-2 text-headline-sm font-bold">
          <span>Total</span>
          <span className="font-mono text-data-mono">
            {formatCurrency(totalAmount ?? subtotal + taxValue)}
          </span>
        </div>
      </div>

      {notes && (
        <div className="mt-8 border-t border-neutral-200 pt-4">
          <p className="text-label-caps uppercase text-outline">Notes</p>
          <p className="mt-1 text-body-md text-on-surface-variant">{notes}</p>
        </div>
      )}
    </div>
  );
}

InvoicePreview.propTypes = {
  invoiceNumber: PropTypes.string,
  customer: PropTypes.object,
  services: PropTypes.array.isRequired,
  subtotal: PropTypes.number,
  tax: PropTypes.number,
  totalAmount: PropTypes.number,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  dueDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  notes: PropTypes.string,
};
