import { pool } from '../db.js';

// GET all digital marketers
export const getAllMarketers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, platform, referral_code, approved, created_at FROM digital_marketers ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching marketers:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// APPROVE / REJECT a marketer
export const updateMarketerStatus = async (req, res) => {
  try {
    const { marketerId } = req.params;
    const { approved } = req.body;

    const result = await pool.query(
      'UPDATE digital_marketers SET approved=$1 WHERE id=$2 RETURNING *',
      [approved, marketerId]
    );

    if (!result.rows.length) return res.status(404).json({ message: 'Marketer not found' });

    res.json({ message: `Marketer ${approved ? 'approved' : 'rejected'}`, marketer: result.rows[0] });
  } catch (err) {
    console.error('Error updating marketer:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET all orders linked to marketers
export const getAllDMOrders = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT dm.id AS dm_order_id, dm.marketer_id, dm.order_id, dm.commission, dm.verified,
              dm.created_at, u.name AS user_name, p.title AS product_title, p.price AS product_price,
              m.name AS marketer_name, m.referral_code
       FROM dm_orders dm
       JOIN orders o ON dm.order_id = o.id
       JOIN users u ON o.user_id = u.id
       JOIN products p ON o.product_id = p.id
       JOIN digital_marketers m ON dm.marketer_id = m.id
       ORDER BY dm.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching DM orders:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// VERIFY a commission / order
export const verifyDMOrder = async (req, res) => {
  try {
    const { dmOrderId } = req.params;
    const { verified } = req.body;

    const result = await pool.query(
      'UPDATE dm_orders SET verified=$1 WHERE id=$2 RETURNING *',
      [verified, dmOrderId]
    );

    if (!result.rows.length) return res.status(404).json({ message: 'DM Order not found' });

    res.json({ message: `Order ${verified ? 'verified' : 'unverified'}`, order: result.rows[0] });
  } catch (err) {
    console.error('Error verifying DM order:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// TRACK clicks per marketer
export const getMarketerClicks = async (req, res) => {
  try {
    const { marketerId } = req.params;
    const result = await pool.query(
      'SELECT COUNT(*) AS clicks FROM dm_clicks WHERE marketer_id=$1',
      [marketerId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching clicks:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
