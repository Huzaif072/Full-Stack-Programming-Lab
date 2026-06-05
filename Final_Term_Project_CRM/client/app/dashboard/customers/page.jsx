'use client';

import { Suspense } from 'react';
import CustomersContent from './CustomersContent';
import Spinner from '@/components/ui/Spinner';

export default function CustomersPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <CustomersContent />
    </Suspense>
  );
}
