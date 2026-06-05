'use client';

import PropTypes from 'prop-types';

export default function Textarea({
  label,
  error,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-body-sm font-medium text-on-surface">
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}
      <textarea
        className={`w-full rounded-lg border bg-neutral-50 px-3 py-2.5 text-body-md text-on-surface outline-none transition-colors placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 ${
          error ? 'border-danger' : 'border-neutral-200'
        }`}
        rows={4}
        {...props}
      />
      {error && <p className="text-body-sm text-danger">{error}</p>}
    </div>
  );
}

Textarea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};
