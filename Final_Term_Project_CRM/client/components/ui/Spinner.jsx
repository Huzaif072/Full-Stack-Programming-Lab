'use client';

import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

export default function Spinner({ className = '' }) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

Spinner.propTypes = {
  className: PropTypes.string,
};
