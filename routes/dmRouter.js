import express from 'express';
import { registerMarketer, getDashboard, recordClick } from '../controllers/dmController.js';

const router = express.Router();

router.post('/register', registerMarketer);
router.get('/dashboard/:marketerId', getDashboard);
router.post('/click', recordClick);

export default router;


