import { pool } from '../db.js';
import fs from 'fs';
import path from 'path';

export const getProducts = async (req, res) => {
  try {
    const q = req.query.q ? `%${req.query.q.toLowerCase()}%` : '%';
    const cat = req.query.category && req.query.category !== 'All categories'
      ? req.query.category
      : null;

    let query = 'SELECT * FROM products WHERE LOWER(title) LIKE $1';
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

export const uploadProduct = async (req, res) => {
  try {
    const { title, price, category, store, sold } = req.body;

    const thumbnail = req.files?.thumbnail
      ? `/uploads/${req.files.thumbnail[0].filename}`
      : null;

    const subimages = req.files?.subimages
      ? req.files.subimages.map(file => `/uploads/${file.filename}`)
      : [];

    const query = `
      INSERT INTO products (title, price, category, store, sold, thumbnail, subimages)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    // ⛔ Removed JSON.stringify — PostgreSQL accepts text[] directly
    const values = [
      title,
      price,
      category,
      store,
      sold || 0,
      thumbnail,
      subimages // <-- now a real JS array
    ];

    const { rows } = await pool.query(query, values);

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const { rows } = await pool.query('SELECT * FROM products WHERE id=$1', [id]);
    if (!rows.length) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { rows } = await pool.query('SELECT thumbnail FROM products WHERE id=$1', [id]);
    if (rows.length) {
      const img = rows[0].thumbnail;
      if (img && fs.existsSync(path.join('.', img))) {
        fs.unlinkSync(path.join('.', img));
      }
    }
    await pool.query('DELETE FROM products WHERE id=$1', [id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
