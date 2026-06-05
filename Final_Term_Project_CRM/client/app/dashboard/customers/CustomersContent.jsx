'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, UserPlus } from 'lucide-react';
import api from '@/lib/axios';
import { useToast } from '@/lib/toast';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import AnimatedPage from '@/components/ui/AnimatedPage';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import CustomerTable from '@/components/customers/CustomerTable';
import DeleteConfirmModal from '@/components/customers/DeleteConfirmModal';
import { STATUS_OPTIONS } from '@/constants/customerStatus';

export default function CustomersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const toastRef = useRef(toast);
  toastRef.current = toast;

  const [customers, setCustomers] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const hasLoadedOnce = useRef(false);

  // Sync URL when filters change (without triggering re-fetch loops)
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    const currentStatus = searchParams.get('status') || '';
    if (currentSearch === search && currentStatus === status) return;

    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    const qs = params.toString();
    router.replace(`/dashboard/customers${qs ? `?${qs}` : ''}`, { scroll: false });
  }, [search, status, searchParams, router]);

  // Fetch customers when filters change
  useEffect(() => {
    let cancelled = false;

    const fetchCustomers = async () => {
      if (hasLoadedOnce.current) {
        setRefreshing(true);
      } else {
        setInitialLoading(true);
      }
      setError('');

      try {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (status) params.set('status', status);
        const qs = params.toString();
        const { data } = await api.get(`/api/customers${qs ? `?${qs}` : ''}`);
        if (!cancelled) {
          setCustomers(data);
          hasLoadedOnce.current = true;
        }
      } catch (err) {
        if (!cancelled) {
          const message = err.response?.data?.message || 'Failed to load customers';
          setError(message);
          toastRef.current.error(message);
        }
      } finally {
        if (!cancelled) {
          setInitialLoading(false);
          setRefreshing(false);
        }
      }
    };

    const timer = setTimeout(fetchCustomers, search ? 300 : 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [search, status]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/api/customers/${deleteTarget._id}`);
      setCustomers((prev) => prev.filter((c) => c._id !== deleteTarget._id));
      toast.success('Customer deleted');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setDeleting(false);
    }
  };

  if (initialLoading) return <Spinner />;

  return (
    <AnimatedPage className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in-up">
        <div />
        <Link href="/dashboard/customers/add">
          <Button icon={UserPlus}>Add Customer</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row animate-fade-in-up stagger-1">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-10 text-body-md outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline transition-colors hover:text-on-surface"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={STATUS_OPTIONS}
          className="sm:w-48"
        />
      </div>

      {error && (
        <p className="animate-fade-in rounded-lg bg-error-container px-4 py-3 text-on-error-container">
          {error}
        </p>
      )}

      <LoadingOverlay show={refreshing}>
        <CustomerTable customers={customers} onDelete={setDeleteTarget} />
      </LoadingOverlay>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        customerName={deleteTarget?.name}
      />
    </AnimatedPage>
  );
}
