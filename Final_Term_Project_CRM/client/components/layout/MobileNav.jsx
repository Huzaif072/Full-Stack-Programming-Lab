'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FileText,
  Bell,
  MessageCircle,
} from 'lucide-react';
import { useNotifications } from '@/components/notifications/NotificationContext';

const items = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { href: '/dashboard/customers', icon: Users, label: 'Customers' },
  { href: '/dashboard/invoices', icon: FileText, label: 'Invoices' },
];

export default function MobileNav({ onOpenNotifications, onOpenChatbot }) {
  const pathname = usePathname();
  const { unreadCount } = useNotifications();

  const isActive = (href) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-neutral-200 bg-surface px-2 py-2 md:hidden">
      {items.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 ${
            isActive(href) ? 'text-primary' : 'text-outline'
          }`}
        >
          <Icon className="h-5 w-5" />
          <span className="text-[10px]">{label}</span>
        </Link>
      ))}
      <button
        onClick={onOpenNotifications}
        className="relative flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-outline"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-0 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-danger text-[8px] text-white">
            {unreadCount}
          </span>
        )}
        <span className="text-[10px]">Alerts</span>
      </button>
      <button
        onClick={onOpenChatbot}
        className="flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-outline"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-[10px]">Chat</span>
      </button>
    </nav>
  );
}

MobileNav.propTypes = {
  onOpenNotifications: PropTypes.func.isRequired,
  onOpenChatbot: PropTypes.func.isRequired,
};
