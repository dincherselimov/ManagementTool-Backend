import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getConnection } from '../../config/db';

const router = express.Router();
const saltRounds = 10;
const jwtSecret = 'demo_jwt_toker_123'; 

export const userRegister = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const connection = await getConnection();

    connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating user', error: err });
      }
      res.status(201).json({ message: 'User created successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const connection = await getConnection();

    connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Server error', error: err });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const user = results[0];

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export default router;
