import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token required');

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded; // Attach user info to the request
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};

export default authenticate;