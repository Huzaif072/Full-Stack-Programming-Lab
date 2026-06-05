'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FileText,
  Bell,
  MessageCircle,
  LogOut,
  Cloud,
} from 'lucide-react';
import { logout, getUser } from '@/lib/auth';
import { useNotifications } from '@/components/notifications/NotificationContext';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/customers', label: 'Customers', icon: Users },
  { href: '/dashboard/invoices', label: 'Invoices', icon: FileText },
];

export default function Sidebar({ onOpenNotifications, onOpenChatbot }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = getUser();
  const { unreadCount } = useNotifications();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const isActive = (href) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex h-full w-sidebar-width flex-col border-r border-outline-variant/20 bg-surface p-4 shadow-sm">
      <div className="mb-8 flex items-center gap-2 px-2 pt-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
          <Cloud className="h-5 w-5 text-on-primary" />
        </div>
        <div>
          <h2 className="text-headline-sm font-bold leading-tight text-primary">
            CRM Pro
          </h2>
          <p className="text-body-sm text-on-surface-variant">Enterprise Edition</p>
        </div>
      </div>

      <ul className="flex flex-1 flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-body-md font-medium transition-colors ${
                isActive(href)
                  ? 'bg-primary-fixed text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={onOpenNotifications}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-body-md font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
          >
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1.5 text-body-sm text-white">
                {unreadCount}
              </span>
            )}
          </button>
        </li>
        <li>
          <button
            onClick={onOpenChatbot}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-body-md font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
          >
            <MessageCircle className="h-5 w-5" />
            Chatbot
          </button>
        </li>
      </ul>

      <div className="mt-auto border-t border-neutral-200 pt-4">
        <div className="mb-3 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-fixed text-body-sm font-semibold text-primary">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="truncate text-body-md font-medium text-on-surface">
              {user?.name || 'User'}
            </p>
            <p className="truncate text-body-sm text-outline">
              {user?.email || ''}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-body-md text-danger transition-colors hover:bg-error-container"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </nav>
  );
}

Sidebar.propTypes = {
  onOpenNotifications: PropTypes.func.isRequired,
  onOpenChatbot: PropTypes.func.isRequired,
};
