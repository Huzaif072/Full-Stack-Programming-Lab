'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { useToast } from '@/lib/toast';
import CustomerForm from '@/components/customers/CustomerForm';
import { CUSTOMER_STATUS } from '@/constants/customerStatus';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  address: '',
  status: CUSTOMER_STATUS.LEAD,
  notes: '',
};

export default function AddCustomerPage() {
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.status) newErrors.status = 'Status is required';
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
      await api.post('/api/customers', formData);
      toast.success('Customer added successfully');
      router.push('/dashboard/customers');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-card bg-surface p-6 shadow-sm md:p-8">
      <h2 className="mb-6 text-headline-sm text-on-surface">Add New Customer</h2>
      <CustomerForm
        formData={formData}
        errors={errors}
        onChange={setFormData}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/dashboard/customers')}
        loading={loading}
        submitLabel="Save Customer"
      />
    </div>
  );
}
