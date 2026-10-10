const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // token comes in as: "Bearer eyJhbGciOi..."
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // extract just the token part
      token = req.headers.authorization.split(' ')[1];

      // verify token using our secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // find the user by id from the token, exclude password field
      req.user = await User.findById(decoded.id).select('-password');

      next(); // token valid, proceed to the actual route
    } catch (err) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };