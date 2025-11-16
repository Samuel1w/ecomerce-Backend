import { pool } from '../db.js';


exports.whatsappOrder = async (req, res) => {
  try {
    const cartRes = await pool.query(
      `SELECT ci.id, ci.selected_image, ci.quantity, p.title, p.price
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id=$1`,
      [req.user.id]
    );

    const cart = cartRes.rows;
    if (!cart.length) return res.status(400).json({ message: 'Cart is empty' });

    let total = 0;
    let message = `New Order from ${req.user.name} (${req.user.email}):\n\n`;

    cart.forEach((item, idx) => {
      const itemTotal = item.quantity * item.price;
      total += itemTotal;
      message += `${idx + 1}. ${item.title}\n   Image: ${item.selected_image}\n   Qty: ${item.quantity}\n   Price: ${itemTotal} FRS\n\n`;
    });

    message += `Grand Total: ${total} FRS\n\nPlease contact the customer to confirm payment.`;
    const waLink = `https://wa.me/YOUR_NUMBER?text=${encodeURIComponent(message)}`;

    res.json({ waLink, message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
