import { pool } from '../db.js';


exports.getUserProfile = async (req, res) => {
  const { userId } = req;
  const user = await pool.query('SELECT id, email, name, created_at FROM users WHERE id=$1', [userId]);
  res.json(user.rows[0]);
};
