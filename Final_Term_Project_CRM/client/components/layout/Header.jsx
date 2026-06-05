'use client';

import PropTypes from 'prop-types';
import { Bell } from 'lucide-react';
import { getUser } from '@/lib/auth';
import { useNotifications } from '@/components/notifications/NotificationContext';

export default function Header({ title, onOpenNotifications }) {
  const user = getUser();
  const { unreadCount } = useNotifications();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-outline-variant/20 bg-background/80 px-4 backdrop-blur-md md:px-8">
      <h1 className="text-headline-sm text-on-surface">{title}</h1>
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenNotifications}
          className="relative rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-fixed text-body-sm font-semibold text-primary">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <span className="hidden text-body-md font-medium text-on-surface sm:block">
            {user?.name || 'User'}
          </span>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onOpenNotifications: PropTypes.func.isRequired,
};
