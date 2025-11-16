import express from 'express';
import upload from '../middleware/upload.js';
import { uploadProduct, deleteProduct } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', upload.single('thumbnail'), uploadProduct);
router.delete('/delete/:id', deleteProduct);

export default router;
