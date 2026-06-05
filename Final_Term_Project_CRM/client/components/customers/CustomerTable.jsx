'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function CustomerTable({ customers, onDelete }) {
  if (customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-card bg-surface py-16 shadow-sm">
        <p className="text-headline-sm text-on-surface">No customers found</p>
        <p className="mt-2 text-body-md text-on-surface-variant">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-card bg-surface shadow-sm md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              {['#', 'Name', 'Email', 'Phone', 'Company', 'Status', 'Date Added', 'Actions'].map(
                (col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-label-caps uppercase text-on-surface-variant"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr
                key={customer._id}
                className="border-b border-neutral-200 last:border-0 transition-colors duration-150 hover:bg-neutral-50 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${Math.min(index * 0.03, 0.45)}s` }}
              >
                <td className="px-4 py-3 text-body-md text-outline">{index + 1}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/dashboard/customers/${customer._id}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {customer.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-body-md text-on-surface-variant">
                  {customer.email}
                </td>
                <td className="px-4 py-3 text-body-md text-on-surface-variant">
                  {customer.phone}
                </td>
                <td className="px-4 py-3 text-body-md text-on-surface-variant">
                  {customer.company || '—'}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={customer.status} />
                </td>
                <td className="px-4 py-3 text-body-md text-on-surface-variant">
                  {formatDate(customer.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/customers/${customer._id}/edit`}
                      className="rounded-lg p-1.5 text-outline hover:bg-primary-fixed hover:text-primary"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => onDelete(customer)}
                      className="rounded-lg p-1.5 text-outline hover:bg-error-container hover:text-danger"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {customers.map((customer, index) => (
          <div
            key={customer._id}
            className="rounded-card bg-surface p-4 shadow-sm animate-fade-in-up opacity-0"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <Link
                  href={`/dashboard/customers/${customer._id}`}
                  className="text-headline-sm font-semibold text-primary"
                >
                  {customer.name}
                </Link>
                <p className="mt-1 text-body-sm text-on-surface-variant">
                  {customer.email}
                </p>
              </div>
              <StatusBadge status={customer.status} />
            </div>
            <div className="mt-3 space-y-1 text-body-sm text-on-surface-variant">
              <p>{customer.phone}</p>
              {customer.company && <p>{customer.company}</p>}
              <p>{formatDate(customer.createdAt)}</p>
            </div>
            <div className="mt-3 flex gap-2 border-t border-neutral-200 pt-3">
              <Link
                href={`/dashboard/customers/${customer._id}/edit`}
                className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-body-sm text-primary hover:bg-primary-fixed"
              >
                <Pencil className="h-4 w-4" /> Edit
              </Link>
              <button
                onClick={() => onDelete(customer)}
                className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-body-sm text-danger hover:bg-error-container"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

CustomerTable.propTypes = {
  customers: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
