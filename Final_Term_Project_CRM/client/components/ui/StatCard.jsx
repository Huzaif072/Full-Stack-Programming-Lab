'use client';

import PropTypes from 'prop-types';

const tints = {
  blue: 'bg-primary-fixed text-primary',
  green: 'bg-green-50 text-secondary',
  yellow: 'bg-yellow-50 text-yellow-700',
  gray: 'bg-neutral-50 text-neutral-600',
};

export default function StatCard({ icon: Icon, label, value, tint = 'blue', className = '' }) {
  return (
    <div className={`rounded-card bg-surface p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-body-sm text-on-surface-variant">{label}</p>
          <p className="mt-1 text-headline-md text-on-surface">{value}</p>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${tints[tint]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  tint: PropTypes.oneOf(['blue', 'green', 'yellow', 'gray']),
  className: PropTypes.string,
};
