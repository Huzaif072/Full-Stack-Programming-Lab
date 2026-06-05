'use client';

import PropTypes from 'prop-types';

export default function AnimatedPage({ children, className = '' }) {
  return (
    <div className={`animate-fade-in-up ${className}`}>{children}</div>
  );
}

AnimatedPage.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
