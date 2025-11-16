import jwt from 'jsonwebtoken';

const SECRET = 'dalina05'; // must match auth.js

export default function auth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);

    // STORE userId properly for ALL controllers
    req.userId = decoded.id;

    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
