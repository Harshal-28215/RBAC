import bcrypt from 'bcrypt';
import express from 'express';
import User from '../schema/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.status(201).json({message: 'signup successful',});
});

export default router;