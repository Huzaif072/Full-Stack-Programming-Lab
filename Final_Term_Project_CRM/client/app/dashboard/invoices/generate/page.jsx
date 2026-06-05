'use client';

import { Suspense } from 'react';
import GenerateInvoiceContent from './GenerateInvoiceContent';
import Spinner from '@/components/ui/Spinner';

export default function GenerateInvoicePage() {
  return (
    <Suspense fallback={<Spinner />}>
      <GenerateInvoiceContent />
    </Suspense>
  );
}
