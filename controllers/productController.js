import { pool } from '../db.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

/**
 * Upload a new product (thumbnail + subimages uploaded to Cloudinary)
 */
export const uploadProduct = async (req, res) => {
  try {
    const { title, price, category, store, sold } = req.body;

    // Validate required fields
    if (!title || !price || !category || !store) {
      return res.status(400).json({ message: 'Missing required product fields' });
    }

    // Check thumbnail
    if (!req.files?.thumbnail?.length) {
      return res.status(400).json({ message: 'Missing required parameter - thumbnail' });
    }

    // Helper function for uploading a single file
    const uploadFile = async (file) => {
      const result = await cloudinary.uploader.upload(file.path || file.buffer, {
        folder: 'luxuria_products'
      });
      if (file.path) fs.unlinkSync(file.path); // delete local file if diskStorage
      return result.secure_url;
    };

    // Upload thumbnail
    const thumbnailUrl = await uploadFile(req.files.thumbnail[0]);

    // Upload subimages (if any)
    const subimagesUrls = [];
    if (req.files?.subimages?.length > 0) {
      for (const file of req.files.subimages) {
        const url = await uploadFile(file);
        subimagesUrls.push(url);
      }
    }

    // Insert into database
    const query = `
      INSERT INTO products (title, price, category, store, sold, thumbnail, subimages)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [
      title,
      parseFloat(price),
      category,
      store,
      sold || 0,
      thumbnailUrl,
      subimagesUrls
    ];

    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);

  } catch (err) {
    console.error('Upload product error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get all products (with optional search and category filter)
 */
export const getProducts = async (req, res) => {
  try {
    const q = req.query.q ? `%${req.query.q.toLowerCase()}%` : '%';
    const cat = req.query.category && req.query.category !== 'All categories' ? req.query.category : null;

    let query = 'SELECT * FROM products WHERE LOWER(title) LIKE $1';
    const params = [q];

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



/**
 * Get single product by ID
 */
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

/**
 * Delete a product by ID
 * Optional: delete images from Cloudinary if desired
 */
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const { rows } = await pool.query('SELECT thumbnail, subimages FROM products WHERE id=$1', [id]);

    if (rows.length) {
      const { thumbnail, subimages } = rows[0];

      // Optional: delete images from Cloudinary (not mandatory)
      // if (thumbnail) await cloudinary.uploader.destroy(getPublicIdFromUrl(thumbnail));
      // for (const url of subimages) await cloudinary.uploader.destroy(getPublicIdFromUrl(url));
    }

    await pool.query('DELETE FROM products WHERE id=$1', [id]);
    res.json({ message: 'Product deleted' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Helper function (optional) to extract Cloudinary public_id from URL
 */
const getPublicIdFromUrl = (url) => {
  // Example: https://res.cloudinary.com/demo/image/upload/v1234567890/folder/filename.jpg
  const parts = url.split('/');
  const fileWithExtension = parts[parts.length - 1]; // filename.jpg
  const fileName = fileWithExtension.split('.')[0];
  const folder = parts[parts.length - 2]; // folder
  return `${folder}/${fileName}`;
};
