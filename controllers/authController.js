import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

const SECRET = process.env.JWT_SECRET;

// ✅ REGISTER FUNCTION
export async function register(req, res) {
  const { email, password, name } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, hashed, name]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Register error:', err);
    res.status(400).json({ message: 'Error registering user' });
  }
}

// ✅ LOGIN FUNCTION
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (user.rowCount === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.rows[0].id }, SECRET, { expiresIn: '1d' });
    res.json({
      token,
      user: { id: user.rows[0].id, email: user.rows[0].email, name: user.rows[0].name },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login error' });
  }
}
