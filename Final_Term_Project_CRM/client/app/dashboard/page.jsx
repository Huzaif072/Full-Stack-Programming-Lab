'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Users, UserCheck, UserPlus, UserX, Pencil, Eye } from 'lucide-react';
import api from '@/lib/axios';
import Spinner from '@/components/ui/Spinner';
import StatCard from '@/components/ui/StatCard';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';
import AnimatedPage from '@/components/ui/AnimatedPage';
import { CUSTOMER_STATUS } from '@/constants/customerStatus';

export default function DashboardPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await api.get('/api/customers');
        setCustomers(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  if (loading) return <Spinner />;
  if (error) {
    return (
      <p className="rounded-lg bg-error-container px-4 py-3 text-on-error-container">
        {error}
      </p>
    );
  }

  const stats = {
    total: customers.length,
    active: customers.filter((c) => c.status === CUSTOMER_STATUS.ACTIVE).length,
    leads: customers.filter((c) => c.status === CUSTOMER_STATUS.LEAD).length,
    inactive: customers.filter((c) => c.status === CUSTOMER_STATUS.INACTIVE).length,
  };

  const recent = [...customers]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <AnimatedPage className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Total Customers" value={stats.total} tint="blue" className="animate-fade-in-up opacity-0 stagger-1" />
        <StatCard icon={UserCheck} label="Active Customers" value={stats.active} tint="green" className="animate-fade-in-up opacity-0 stagger-2" />
        <StatCard icon={UserPlus} label="Leads" value={stats.leads} tint="yellow" className="animate-fade-in-up opacity-0 stagger-3" />
        <StatCard icon={UserX} label="Inactive" value={stats.inactive} tint="gray" className="animate-fade-in-up opacity-0 stagger-4" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/dashboard/customers/add">
          <Button icon={UserPlus}>Add New Customer</Button>
        </Link>
        <Link href="/dashboard/invoices/generate">
          <Button variant="secondary">Generate Invoice</Button>
        </Link>
      </div>

      <div className="rounded-card bg-surface shadow-sm animate-fade-in-up opacity-0" style={{ animationDelay: '0.25s' }}>
        <div className="border-b border-neutral-200 px-5 py-4">
          <h2 className="text-headline-sm text-on-surface">Recent Customers</h2>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                {['Name', 'Email', 'Phone', 'Status', 'Date Added', 'Actions'].map(
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
              {recent.map((customer) => (
                <tr
                  key={customer._id}
                  className="border-b border-neutral-200 last:border-0 hover:bg-neutral-50"
                >
                  <td className="px-4 py-3 font-medium text-primary">
                    <Link href={`/dashboard/customers/${customer._id}`}>
                      {customer.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-body-md text-on-surface-variant">
                    {customer.email}
                  </td>
                  <td className="px-4 py-3 text-body-md text-on-surface-variant">
                    {customer.phone}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={customer.status} />
                  </td>
                  <td className="px-4 py-3 text-body-md text-on-surface-variant">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          router.push(`/dashboard/customers/${customer._id}/edit`)
                        }
                        className="rounded-lg p-1.5 text-outline hover:bg-primary-fixed hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/dashboard/customers/${customer._id}`)
                        }
                        className="rounded-lg p-1.5 text-outline hover:bg-surface-container-high"
                        title="View customer"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-4 md:hidden">
          {recent.map((customer) => (
            <div key={customer._id} className="rounded-lg border border-neutral-200 p-3">
              <div className="flex justify-between">
                <Link
                  href={`/dashboard/customers/${customer._id}`}
                  className="font-medium text-primary"
                >
                  {customer.name}
                </Link>
                <StatusBadge status={customer.status} />
              </div>
              <p className="mt-1 text-body-sm text-on-surface-variant">{customer.email}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
}
