import { useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useNotifications } from '@/components/notifications/NotificationContext';

let notificationRef = null;

export function setNotificationRef(ref) {
  notificationRef = ref;
}

export function showToast(message, type = 'success') {
  if (type === 'success') toast.success(message);
  else if (type === 'error') toast.error(message);
  else toast(message);

  if (notificationRef) {
    notificationRef.addNotification(message, type);
  }
}

export function useToast() {
  const { addNotification } = useNotifications();

  const success = useCallback(
    (message) => {
      toast.success(message);
      addNotification(message, 'success');
    },
    [addNotification]
  );

  const error = useCallback(
    (message) => {
      toast.error(message);
      addNotification(message, 'error');
    },
    [addNotification]
  );

  return useMemo(() => ({ success, error }), [success, error]);
}
