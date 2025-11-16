import { pool } from '../db.js';

import fs from 'fs';
import path from 'path';

export const getProducts = async (req, res) => {
  try {
    const q = req.query.q ? `%${req.query.q.toLowerCase()}%` : '%';
    const cat = req.query.category && req.query.category !== 'All categories'
      ? req.query.category
      : null;

    let query = 'SELECT * FROM cart WHERE LOWER(title) LIKE $1';
    let params = [q];
    if (cat) {
      query += ' AND category = $2';
      params.push(cat);
    }

    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Image upload (for products)
export const uploadProduct = async (req, res) => {
  try {
    const { title, price, category, store, sold } = req.body;
    const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;

    const query = `
      INSERT INTO cart (title, price, category, store, sold, thumbnail)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [title, price, category, store, sold || 0, thumbnail];
    const { rows } = await pool.query(query, values);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { rows } = await pool.query('SELECT thumbnail FROM cart WHERE id=$1', [id]);
    if (rows.length) {
      const img = rows[0].thumbnail;
      if (img && fs.existsSync(path.join('.', img))) fs.unlinkSync(path.join('.', img));
    }
    await pool.query('DELETE FROM cart WHERE id=$1', [id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
