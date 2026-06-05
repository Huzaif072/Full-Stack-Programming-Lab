'use client';

import PropTypes from 'prop-types';
import { CUSTOMER_STATUS } from '@/constants/customerStatus';

const styles = {
  [CUSTOMER_STATUS.LEAD]: 'bg-warning/20 text-yellow-800',
  [CUSTOMER_STATUS.ACTIVE]: 'bg-secondary/20 text-green-800',
  [CUSTOMER_STATUS.INACTIVE]: 'bg-neutral-200 text-neutral-600',
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-0.5 text-body-sm font-medium ${
        styles[status] || styles[CUSTOMER_STATUS.INACTIVE]
      }`}
    >
      {status}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};
