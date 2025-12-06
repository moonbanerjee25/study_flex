const mongoose = require("mongoose");
require("dotenv").config();

// CONNECT MONGODB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully!"))
.catch((err) => console.log("MongoDB Error:", err));

require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(express.json()); // Allows Express to read JSON body data from requests

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Basic Route (Test) ---
app.get('/', (req, res) => {
  res.send('Welcome to the Express Auth API');
});

// --- TODO: Add Auth Routes here ---
// const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);

// --- Add Auth Routes here ---
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); // All routes in auth.js will start with /api/auth

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Press Ctrl+C to stop');
});
// In server.js, after the app.use('/api/auth', authRoutes); line

const authMiddleware = require('./middleware/auth');

// Example Protected Route
app.get('/api/protected', authMiddleware, (req, res) => {
  // If the middleware passed, we know req.user exists and the user is authenticated.
  res.json({ 
    msg: 'Access granted!',
    userId: req.user.id
    
  });
});
