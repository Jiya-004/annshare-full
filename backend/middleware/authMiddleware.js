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
      if (!req.user) {
        return res.status(401).json({
          message: 'Your account has been deleted by an administrator. Session terminated.',
          isDeleted: true,
        });
      }

      const userStatus = (req.user.status || '').toLowerCase();
      if (userStatus === 'suspended' || userStatus === 'inactive') {
        return res.status(403).json({
          message: 'Your account has been suspended by an administrator. Access is revoked.',
          isSuspended: true,
        });
      }

      return next();
    } catch (err) {
      // Token invalid or expired
      return res.status(401).json({
        message: 'Session invalid or expired. Please sign in again.',
        tokenExpired: true,
      });
    }
  }

  // Fallback for change-password: allow controller to verify currentPassword against email/userId
  if (req.path === '/change-password' && (req.body?.email || req.body?.userId)) {
    return next();
  }

  return res.status(401).json({ message: 'Not authorized, please sign in' });
};

module.exports = { protect };