export const CUSTOMER_STATUS = {
  LEAD: 'Lead',
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
};

export const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: CUSTOMER_STATUS.LEAD, label: 'Lead' },
  { value: CUSTOMER_STATUS.ACTIVE, label: 'Active' },
  { value: CUSTOMER_STATUS.INACTIVE, label: 'Inactive' },
];
