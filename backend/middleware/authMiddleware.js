const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  // Check for token in headers
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    console.log('No Authorization header provided');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Check if the Authorization header starts with 'Bearer '
  if (!authHeader.startsWith('Bearer ')) {
    console.log('Invalid Authorization header format');
    return res.status(401).json({ msg: 'Invalid token format' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ msg: 'User not found, authorization denied' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Token validation error:', err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token has expired' });
    }
    res.status(401).json({ msg: 'Token is not valid' });
  }
};