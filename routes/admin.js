import express from 'express';
import upload from '../middleware/upload.js';
import { uploadProduct, deleteProduct,getProductById } from '../controllers/productController.js';

const router = express.Router();

router.post(
  '/add',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'subimages', maxCount: 5 }
  ]),
  uploadProduct
);
router.get('/:id', getProductById);

router.delete('/delete/:id', deleteProduct);

export default router;
