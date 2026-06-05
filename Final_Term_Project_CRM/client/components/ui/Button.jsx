'use client';

import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

const variants = {
  primary:
    'bg-primary text-on-primary hover:bg-primary-dark disabled:opacity-60',
  secondary:
    'bg-transparent border border-neutral-200 text-primary hover:bg-primary-fixed',
  danger: 'bg-danger text-white hover:bg-red-600 disabled:opacity-60',
  ghost: 'bg-transparent text-on-surface-variant hover:bg-surface-container-high',
};

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  loading = false,
  disabled = false,
  className = '',
  icon: Icon,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-body-md font-medium transition-all duration-200 active:scale-[0.98] ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : Icon ? (
        <Icon className="h-4 w-4" />
      ) : null}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost']),
  type: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.elementType,
};
