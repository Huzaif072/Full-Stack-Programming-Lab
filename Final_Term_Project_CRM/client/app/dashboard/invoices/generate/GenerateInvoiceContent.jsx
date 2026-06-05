'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Plus, Trash2, Eye, Download, Save } from 'lucide-react';
import api from '@/lib/axios';
import { useToast } from '@/lib/toast';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import InvoicePreview from '@/components/invoices/InvoicePreview';
import { generateInvoicePDF } from '@/components/invoices/generatePDF';
import Modal from '@/components/ui/Modal';

const emptyService = { description: '', quantity: 1, unitPrice: 0 };

export default function GenerateInvoiceContent() {
  const searchParams = useSearchParams();
  const toast = useToast();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [customerId, setCustomerId] = useState(searchParams.get('customerId') || '');
  const [services, setServices] = useState([{ ...emptyService }]);
  const [tax, setTax] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [savedInvoiceNumber, setSavedInvoiceNumber] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await api.get('/api/customers');
        setCustomers(data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load customers');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [toast]);

  const selectedCustomer = customers.find((c) => c._id === customerId);

  const subtotal = useMemo(
    () =>
      services.reduce(
        (sum, s) => sum + (Number(s.quantity) || 0) * (Number(s.unitPrice) || 0),
        0
      ),
    [services]
  );

  const taxValue = (subtotal * (Number(tax) || 0)) / 100;
  const totalAmount = subtotal + taxValue;

  const customerOptions = [
    { value: '', label: 'Select a customer...' },
    ...customers.map((c) => ({ value: c._id, label: c.name })),
  ];

  const updateService = (index, field, value) => {
    setServices((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  const addRow = () => setServices((prev) => [...prev, { ...emptyService }]);

  const removeRow = (index) => {
    if (services.length <= 1) return;
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    if (!customerId) {
      toast.error('Please select a customer');
      return false;
    }
    const validServices = services.filter(
      (s) => s.description && s.quantity > 0 && s.unitPrice >= 0
    );
    if (validServices.length === 0) {
      toast.error('Please fill all required fields');
      return false;
    }
    return true;
  };

  const getPreviewData = () => ({
    invoiceNumber: savedInvoiceNumber || `INV-2026-${Date.now().toString().slice(-4)}`,
    customer: selectedCustomer,
    services,
    subtotal,
    tax: Number(tax),
    totalAmount,
    date: new Date(),
    dueDate,
    notes,
  });

  const handleSave = async () => {
    if (!validate()) return;

    setSaving(true);
    try {
      const { data } = await api.post('/api/invoices', {
        customer: customerId,
        services: services.map((s) => ({
          description: s.description,
          quantity: Number(s.quantity),
          unitPrice: Number(s.unitPrice),
        })),
        tax: Number(tax),
        dueDate: dueDate || undefined,
        notes,
      });
      setSavedInvoiceNumber(data.invoiceNumber);
      toast.success('Invoice saved');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="rounded-card bg-surface p-6 shadow-sm">
        <h3 className="mb-4 text-headline-sm text-on-surface">
          Step 1 — Customer Selection
        </h3>
        <Select
          label="Customer"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          options={customerOptions}
          required
        />
      </section>

      <section className="rounded-card bg-surface p-6 shadow-sm">
        <h3 className="mb-4 text-headline-sm text-on-surface">
          Step 2 — Services
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-neutral-200">
                {['Description', 'Qty', 'Unit Price', 'Total', ''].map((col) => (
                  <th
                    key={col}
                    className="px-2 py-2 text-left text-label-caps uppercase text-on-surface-variant"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index} className="border-b border-neutral-200">
                  <td className="px-2 py-2">
                    <input
                      value={service.description}
                      onChange={(e) =>
                        updateService(index, 'description', e.target.value)
                      }
                      placeholder="Service description"
                      className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-body-md outline-none focus:border-primary"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      min="1"
                      value={service.quantity}
                      onChange={(e) =>
                        updateService(index, 'quantity', e.target.value)
                      }
                      className="w-20 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-body-md outline-none focus:border-primary"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={service.unitPrice}
                      onChange={(e) =>
                        updateService(index, 'unitPrice', e.target.value)
                      }
                      className="w-28 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-body-md outline-none focus:border-primary"
                    />
                  </td>
                  <td className="px-2 py-2 font-mono text-data-mono">
                    $
                    {(
                      (Number(service.quantity) || 0) *
                      (Number(service.unitPrice) || 0)
                    ).toFixed(2)}
                  </td>
                  <td className="px-2 py-2">
                    <button
                      onClick={() => removeRow(index)}
                      disabled={services.length <= 1}
                      className="rounded-lg p-1.5 text-outline hover:bg-error-container hover:text-danger disabled:opacity-30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={addRow}
          className="mt-3 flex items-center gap-1 text-body-md text-primary hover:underline"
        >
          <Plus className="h-4 w-4" /> Add Row
        </button>
      </section>

      <section className="rounded-card bg-surface p-6 shadow-sm">
        <h3 className="mb-4 text-headline-sm text-on-surface">
          Step 3 — Summary & Details
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Input
            label="Tax (%)"
            type="number"
            min="0"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
          />
        </div>
        <Textarea
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-4"
        />

        <div className="mt-6 ml-auto max-w-xs space-y-2">
          <div className="flex justify-between text-body-md">
            <span>Subtotal</span>
            <span className="font-mono text-data-mono">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-body-md">
            <span>Tax ({tax || 0}%)</span>
            <span className="font-mono text-data-mono">${taxValue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-neutral-200 pt-2 text-headline-sm font-bold">
            <span>Total</span>
            <span className="font-mono text-data-mono">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" icon={Eye} onClick={() => setPreviewOpen(true)}>
          Preview Invoice
        </Button>
        <Button
          variant="secondary"
          icon={Download}
          onClick={() => {
            if (!validate()) return;
            generateInvoicePDF(getPreviewData());
          }}
        >
          Download PDF
        </Button>
        <Button icon={Save} loading={saving} onClick={handleSave}>
          Save Invoice
        </Button>
      </div>

      <Modal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title="Invoice Preview"
        size="lg"
      >
        <InvoicePreview {...getPreviewData()} />
      </Modal>
    </div>
  );
}
