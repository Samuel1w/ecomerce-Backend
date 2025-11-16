import express from 'express';
import { getAllUsers, addOrder, getUserOrders,deleteOrder } from '../controllers/adminController.js';


const router = express.Router();



router.get('/users', getAllUsers);           // Get all users
router.post('/orders', addOrder);            // Add order manually
router.get('/orders/:userId', getUserOrders); // Get all orders for a user
router.delete('/orders/:orderId', deleteOrder);
export default router;
