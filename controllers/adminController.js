import { pool } from '../db.js';

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, created_at FROM users ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE an order by ID
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Check if order exists
    const orderCheck = await pool.query('SELECT * FROM orders WHERE id=$1', [orderId]);
    if (!orderCheck.rows.length) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Delete the order
    await pool.query('DELETE FROM orders WHERE id=$1', [orderId]);

    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add order manually
export const addOrder = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user exists
    const userCheck = await pool.query('SELECT id FROM users WHERE id=$1', [userId]);
    if (!userCheck.rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if product exists
    const productCheck = await pool.query('SELECT id FROM products WHERE id=$1', [productId]);
    if (!productCheck.rows.length) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const result = await pool.query(
      'INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [userId, productId, quantity]
    );

    res.json({ message: 'Order added successfully', order: result.rows[0] });
  } catch (err) {
    console.error('Error adding order:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// GET all orders per user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      `SELECT o.id, o.quantity, o.created_at, p.title, p.price
       FROM orders o
       JOIN products p ON o.product_id = p.id
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching user orders:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
