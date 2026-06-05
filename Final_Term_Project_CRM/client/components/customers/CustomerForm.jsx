'use client';

import PropTypes from 'prop-types';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { CUSTOMER_STATUS } from '@/constants/customerStatus';

const statusOptions = [
  { value: CUSTOMER_STATUS.LEAD, label: 'Lead' },
  { value: CUSTOMER_STATUS.ACTIVE, label: 'Active' },
  { value: CUSTOMER_STATUS.INACTIVE, label: 'Inactive' },
];

export default function CustomerForm({
  formData,
  errors,
  onChange,
  onSubmit,
  onCancel,
  loading,
  submitLabel = 'Save Customer',
  lastUpdated,
}) {
  const handleChange = (e) => {
    onChange({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          placeholder="John Doe"
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          placeholder="john@company.com"
        />
        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
          placeholder="+1 (555) 000-0000"
        />
        <Input
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company name"
        />
        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Street address"
          className="md:col-span-2"
        />
        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={statusOptions}
          error={errors.status}
          required
        />
      </div>
      <Textarea
        label="Notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Additional notes..."
      />
      {lastUpdated && (
        <p className="text-body-sm text-outline">
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </p>
      )}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

CustomerForm.propTypes = {
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  submitLabel: PropTypes.string,
  lastUpdated: PropTypes.string,
};
