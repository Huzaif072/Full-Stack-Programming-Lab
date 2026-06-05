'use client';

import PropTypes from 'prop-types';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
  customerName,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Customer"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            Delete
          </Button>
        </>
      }
    >
      <p className="text-body-md text-on-surface-variant">
        Are you sure you want to delete{' '}
        <strong className="text-on-surface">{customerName}</strong>? This action
        cannot be undone.
      </p>
    </Modal>
  );
}

DeleteConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  customerName: PropTypes.string,
};
