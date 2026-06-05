'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { getToken } from '@/lib/auth';
import { NotificationProvider } from '@/components/notifications/NotificationContext';
import NotificationPanel from '@/components/notifications/NotificationPanel';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import MobileNav from '@/components/layout/MobileNav';
import Chatbot from '@/components/chatbot/Chatbot';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/dashboard/customers': 'Customers',
  '/dashboard/customers/add': 'Add Customer',
  '/dashboard/invoices': 'Invoices',
  '/dashboard/invoices/generate': 'Generate Invoice',
};

function getPageTitle(pathname) {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.includes('/edit')) return 'Edit Customer';
  if (pathname.match(/\/customers\/[^/]+$/)) return 'Customer Profile';
  return 'Dashboard';
}

function DashboardShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!getToken()) {
      router.push('/login');
    }
  }, [router]);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:block md:fixed md:inset-y-0 md:left-0">
        <Sidebar
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenChatbot={() => setChatbotOpen(true)}
        />
      </div>

      <div className="flex flex-1 flex-col md:ml-sidebar-width">
        <Header
          title={getPageTitle(pathname)}
          onOpenNotifications={() => setNotificationsOpen(true)}
        />
        <main key={pathname} className="flex-1 p-4 pb-24 md:p-8 md:pb-8 animate-fade-in">
          {children}
        </main>
      </div>

      <MobileNav
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenChatbot={() => setChatbotOpen(true)}
      />

      <NotificationPanel
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <Chatbot
        isOpen={chatbotOpen}
        onClose={() => setChatbotOpen(false)}
        onOpen={() => setChatbotOpen(true)}
      />

      <Toaster position="top-right" />
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <NotificationProvider>
      <DashboardShell>{children}</DashboardShell>
    </NotificationProvider>
  );
}
