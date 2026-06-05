'use client';

import Link from 'next/link';
import { Cloud } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="bg-pattern flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-fixed">
            <Cloud className="h-8 w-8 text-primary" />
          </div>
        </div>
        <p className="text-[120px] font-bold leading-none text-primary/20">404</p>
        <h1 className="mt-4 text-headline-lg text-on-surface">Page not found</h1>
        <p className="mt-2 max-w-md text-body-md text-on-surface-variant">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/dashboard" className="mt-8 inline-block">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
