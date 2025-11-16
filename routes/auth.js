import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

const router = express.Router();   
const SECRET = 'dalina05';

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1,$2,$3) RETURNING id,email,name',
      [email, hashed, name]
    );

    const token = jwt.sign({ id: result.rows[0].id }, SECRET, { expiresIn: '7d' });

    res.json({ token, user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await pool.query('SELECT * FROM users WHERE email=$1', [email]);

    if (userData.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = userData.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

export default router;
