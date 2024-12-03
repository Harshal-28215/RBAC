import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../schema/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ email: user.email, role: user.role, id:user._id },'secretKey', { expiresIn: '1h' });
  

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 3600000,
  });

  res.status(200).json({
    message: 'Login successful',
    role: user.role,
    id: user._id
  });
} 
catch (error) {
    res.status(500).send('error login user');  
}
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).send('Logged out');
});

export default router;