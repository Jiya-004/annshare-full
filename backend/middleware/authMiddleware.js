const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // token comes in as: "Bearer eyJhbGciOi..."
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (req.user) {
        return next();
      }
    } catch (err) {
      // Token invalid or expired
    }
  }

  // Fallback for change-password: allow controller to verify currentPassword against email/userId
  if (req.path === '/change-password' && (req.body?.email || req.body?.userId)) {
    return next();
  }

  return res.status(401).json({ message: 'Not authorized, please sign in' });
};

module.exports = { protect };