import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../schema/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }

  // Generate JWT
  const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
  res.json({ token });
});

export default router;