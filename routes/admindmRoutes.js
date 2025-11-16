import express from 'express';
import {
  getAllMarketers,
  updateMarketerStatus,
  getAllDMOrders,
  verifyDMOrder,
  getMarketerClicks
} from '../controllers/admindmController.js';

const router = express.Router();

router.get('/digital-marketers', getAllMarketers);
router.patch('/digital-marketers/:marketerId', updateMarketerStatus);

router.get('/dm-orders', getAllDMOrders);
router.patch('/dm-orders/:dmOrderId', verifyDMOrder);

router.get('/dm-clicks/:marketerId', getMarketerClicks);

export default router;
