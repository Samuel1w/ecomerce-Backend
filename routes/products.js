import express from 'express';
import upload from '../middleware/upload.js';
import {  getProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);


export default router;
