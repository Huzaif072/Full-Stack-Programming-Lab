'use client';

import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

export default function LoadingOverlay({ show, children }) {
  return (
    <div className="relative">
      {children}
      {show && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-card bg-surface/60 backdrop-blur-[2px] animate-fade-in">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}

LoadingOverlay.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
