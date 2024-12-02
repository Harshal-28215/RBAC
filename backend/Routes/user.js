import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/user', (req, res) => {
  
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const user = jwt.verify(token, 'secretKey');
      res.json({ email: user.email, role: user.role });
    } catch (err) {
      res.status(403).json({ error: 'Invalid token' });
    }
  });

  export default router;