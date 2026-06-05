'use client';

import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useNotifications } from './NotificationContext';

const iconMap = {
  success: { Icon: CheckCircle, color: 'text-secondary' },
  error: { Icon: AlertCircle, color: 'text-danger' },
  warning: { Icon: AlertTriangle, color: 'text-warning' },
  info: { Icon: Info, color: 'text-primary' },
};

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function NotificationPanel({ isOpen, onClose }) {
  const { notifications, removeNotification, clearAll } = useNotifications();

  const handleRead = (id) => {
    removeNotification(id);
    toast.dismiss();
    onClose();
  };

  const handleClearAll = () => {
    clearAll();
    toast.dismiss();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 animate-fade-in bg-neutral-900/20 md:bg-transparent"
        onClick={onClose}
      />
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm animate-slide-in-right flex-col bg-surface shadow-lg md:top-16 md:h-[calc(100vh-4rem)] md:border-l md:border-outline-variant/20">
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <h2 className="text-headline-sm text-on-surface">Notifications</h2>
          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-body-sm text-primary hover:underline"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-surface-container-high"
            >
              <X className="h-5 w-5 text-outline" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant">
              <Info className="mb-3 h-10 w-10 text-outline" />
              <p className="text-body-md">No notifications</p>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-200">
              {notifications.map((n) => {
                const { Icon, color } = iconMap[n.type] || iconMap.info;
                return (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => handleRead(n.id)}
                      className="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-neutral-50"
                    >
                      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${color}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-body-md text-on-surface">{n.message}</p>
                        <p className="mt-1 text-body-sm text-outline">
                          {formatTime(n.timestamp)}
                        </p>
                      </div>
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-outline" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}

NotificationPanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
