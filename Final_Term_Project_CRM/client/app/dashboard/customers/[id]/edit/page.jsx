'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/lib/axios';
import { useToast } from '@/lib/toast';
import Spinner from '@/components/ui/Spinner';
import CustomerForm from '@/components/customers/CustomerForm';
import { CUSTOMER_STATUS } from '@/constants/customerStatus';

export default function EditCustomerPage() {
  const router = useRouter();
  const params = useParams();
  const toast = useToast();
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const { data } = await api.get(`/api/customers/${params.id}`);
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company || '',
          address: data.address || '',
          status: data.status || CUSTOMER_STATUS.LEAD,
          notes: data.notes || '',
          updatedAt: data.updatedAt,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Customer not found');
      } finally {
        setFetching(false);
      }
    };
    fetchCustomer();
  }, [params.id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fill all required fields');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await api.put(`/api/customers/${params.id}`, formData);
      toast.success('Customer updated');
      router.push('/dashboard/customers');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Spinner />;
  if (error) {
    return (
      <p className="rounded-lg bg-error-container px-4 py-3 text-on-error-container">
        {error}
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-2xl rounded-card bg-surface p-6 shadow-sm md:p-8">
      <h2 className="mb-6 text-headline-sm text-on-surface">Edit Customer</h2>
      <CustomerForm
        formData={formData}
        errors={errors}
        onChange={setFormData}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/dashboard/customers')}
        loading={loading}
        submitLabel="Update Customer"
        lastUpdated={formData.updatedAt}
      />
    </div>
  );
}
