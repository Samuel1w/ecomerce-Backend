import { pool } from '../db.js';
import { nanoid } from 'nanoid'; // For referral code generation

// Register marketer
export const registerMarketer = async (req, res) => {
  try {
    const { name, email, phone, platform, note } = req.body;

    // Check existing
    const exists = await pool.query('SELECT id FROM digital_marketers WHERE email=$1', [email]);
    if (exists.rows.length) return res.status(400).json({ message: 'Email already registered' });

    const referral_code = nanoid(8).toUpperCase();

    const result = await pool.query(
      `INSERT INTO digital_marketers (name,email,phone,platform,note,referral_code)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [name, email, phone, platform, note, referral_code]
    );

    res.json({ message: 'Registered successfully', marketer: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get marketer dashboard stats
export const getDashboard = async (req, res) => {
  try {
    const { marketerId } = req.params;

    // Clicks
    const clicksRes = await pool.query('SELECT COUNT(*) FROM dm_clicks WHERE marketer_id=$1', [marketerId]);
    // Orders
    const ordersRes = await pool.query(
      `SELECT o.id, o.quantity, o.created_at, p.title, p.price, dm.verified, dm.commission
       FROM dm_orders dm
       JOIN orders o ON dm.order_id=o.id
       JOIN products p ON o.product_id=p.id
       WHERE dm.marketer_id=$1
       ORDER BY o.created_at DESC`,
      [marketerId]
    );

    const balance = ordersRes.rows
      .filter(o => o.verified)
      .reduce((sum, o) => sum + Number(o.commission || 0), 0);

    res.json({
      counts: {
        clicks: parseInt(clicksRes.rows[0].count),
        orders: ordersRes.rows.length,
        balance
      },
      orders: ordersRes.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Record click
export const recordClick = async (req, res) => {
  try {
    const { referral_code } = req.query;
    const marketer = await pool.query('SELECT id FROM digital_marketers WHERE referral_code=$1', [referral_code]);
    if (!marketer.rows.length) return res.status(404).json({ message: 'Referral not found' });

    await pool.query('INSERT INTO dm_clicks (marketer_id, url) VALUES ($1, $2)', [
      marketer.rows[0].id,
      req.originalUrl
    ]);

    res.json({ message: 'Click recorded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const auth = (req,res,next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.marketerId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
