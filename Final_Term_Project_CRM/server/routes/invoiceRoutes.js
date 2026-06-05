import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createInvoice,
  getInvoices,
  getInvoiceById,
} from '../controllers/invoiceController.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getInvoices).post(createInvoice);
router.route('/:id').get(getInvoiceById);

export default router;
