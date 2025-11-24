const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure JWT_SECRET is loaded

// Middleware function to check for a valid token
module.exports = function (req, res, next) {
  // Get token from the header (Authorization: Bearer <token>)
  const token = req.header('x-auth-token'); 
  // If you use 'Authorization: Bearer <token>', you'll need to extract it.
  // For simplicity, we use 'x-auth-token' header here.

  // Check if no token is present
  if (!token) { 
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

// Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add the decoded user data (ID) to the request object
    req.user = decoded.user;
    next(); // Move on to the next function/route handler
  } catch (err) {
    // Token is not valid (e.g., expired or tampered)
    res.status(401).json({ msg: 'Token is not valid' });
  }
};