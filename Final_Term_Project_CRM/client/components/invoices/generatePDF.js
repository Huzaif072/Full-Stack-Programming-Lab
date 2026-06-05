import { jsPDF } from 'jspdf';

const PAGE_RIGHT = 190;
const LABEL_X = 130;

function formatCurrency(amount) {
  return `$${Number(amount || 0).toFixed(2)}`;
}

function formatDate(date) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function drawRightAlignedSummary(doc, y, label, value, bold = false) {
  if (bold) doc.setFont('helvetica', 'bold');
  else doc.setFont('helvetica', 'normal');

  doc.text(label, LABEL_X, y);
  doc.text(value, PAGE_RIGHT, y, { align: 'right' });
}

export function generateInvoicePDF({
  invoiceNumber,
  customer,
  services,
  subtotal,
  tax,
  totalAmount,
  date,
  dueDate,
  notes,
}) {
  const doc = new jsPDF();
  const taxValue = (subtotal * (tax || 0)) / 100;
  const total = totalAmount ?? subtotal + taxValue;

  doc.setFontSize(20);
  doc.setTextColor(26, 115, 232);
  doc.text('CRM Pro', 20, 25);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Enterprise Edition', 20, 32);

  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text('INVOICE', PAGE_RIGHT, 25, { align: 'right' });
  doc.setFont('courier', 'bold');
  doc.text(invoiceNumber || 'INV-2026-DRAFT', PAGE_RIGHT, 32, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('BILL TO', 20, 50);
  doc.setTextColor(0);
  doc.setFontSize(11);
  doc.text(customer?.name || '', 20, 58);
  doc.setFontSize(10);
  doc.text(customer?.email || '', 20, 65);
  if (customer?.address) doc.text(customer.address, 20, 72);

  doc.setTextColor(100);
  doc.text('Invoice Date:', 130, 50);
  doc.text('Due Date:', 130, 60);
  doc.setTextColor(0);
  doc.text(formatDate(date), PAGE_RIGHT, 50, { align: 'right' });
  doc.text(formatDate(dueDate), PAGE_RIGHT, 60, { align: 'right' });

  let y = 90;
  doc.setFillColor(248, 249, 250);
  doc.rect(20, y - 5, 170, 8, 'F');
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text('Description', 22, y);
  doc.text('Qty', 120, y);
  doc.text('Unit Price', 150, y, { align: 'right' });
  doc.text('Total', PAGE_RIGHT, y, { align: 'right' });

  y += 10;
  doc.setTextColor(0);
  services.forEach((service) => {
    const lineTotal = service.quantity * service.unitPrice;
    doc.text(service.description.substring(0, 40), 22, y);
    doc.text(String(service.quantity), 120, y);
    doc.text(formatCurrency(service.unitPrice), 150, y, { align: 'right' });
    doc.text(formatCurrency(lineTotal), PAGE_RIGHT, y, { align: 'right' });
    y += 8;
  });

  y += 10;
  doc.setFontSize(10);
  drawRightAlignedSummary(doc, y, 'Subtotal:', formatCurrency(subtotal));
  y += 7;
  drawRightAlignedSummary(
    doc,
    y,
    `Tax (${tax || 0}%):`,
    formatCurrency(taxValue)
  );
  y += 7;
  drawRightAlignedSummary(doc, y, 'Total:', formatCurrency(total), true);

  if (notes) {
    y += 15;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text('Notes:', 20, y);
    doc.setTextColor(0);
    doc.text(notes, 20, y + 7);
  }

  doc.save(`${invoiceNumber || 'invoice-draft'}.pdf`);
}
