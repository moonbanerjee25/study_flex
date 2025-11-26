const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import the User model

// --- SIGN UP / REGISTER Route ---
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // 2. Create a new User instance
    user = new User({
      username,
      email,
      password // Stored temporarily as plain text before hashing
    });

    // 3. Hash the Password
    // Generate a salt (random value) with 10 rounds for security
    const salt = await bcrypt.genSalt(10); 
    // Hash the plain text password with the salt
    user.password = await bcrypt.hash(password, salt); 

    // 4. Save the user to the database
    await user.save();

    // For simplicity, we just send a success message.
    // In a real app, you might auto-login or send an email verification.
    res.status(201).json({ msg: 'User registered successfully!' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error during registration');
  }
});

module.exports = router;
// (Existing imports)
const jwt = require('jsonwebtoken'); // Import JWT

// ... (Existing register route)

// --- LOG IN Route ---
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists (by email)
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // 2. Compare Password
    // Compare the plain text password from the request with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // 3. Generate JWT Token on success
    const payload = {
      user: {
        id: user.id // Store the user ID in the token payload
      }
    };

    // Sign the token with the secret key from .env and set expiration
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        // Send the token back to the client
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error during login');
  }
});

module.exports = router;
//Test commit1