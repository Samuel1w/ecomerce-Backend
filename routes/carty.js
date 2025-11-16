import express from 'express';
import auth from '../middleware/auth.js';
import { 
  getCartItems, 
  addToCart, 
  updateQuantity, 
  removeItem 
} from '../controllers/cartyController.js';

const router = express.Router();

// CART ROUTES
router.get('/', auth, getCartItems);
router.post('/', auth, addToCart);
router.put('/:id', auth, updateQuantity);
router.delete('/:id', auth, removeItem);

export default router;
