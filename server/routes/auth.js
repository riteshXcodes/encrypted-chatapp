const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require("dotenv").config();

const router = express.Router();
const SECRET = process.env.JWT_SECRET;

router.get("/check-user", async (req, res) => {
  const { username } = req.query;
  const user = await User.findOne({ username });
  res.json({ exists: !!user });
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username');
    console.log("Fetched users:", users);
    res.json({ users: users.map(u => u.username) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});



// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ username }, "secret", { expiresIn: "1d" });
    res.status(201).json({ msg: 'User registered successfully', token });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1d' });
    res.json({ token, username });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post("/save-public-key", async (req, res) => {
  const { username, publicKey } = req.body;

  try {
    let user = await User.findOne({ username });
    console.log("Saving public key for:", username, "Key:", publicKey);

    if (!user) {
      user = new User({ username, publicKey });
    } 
    else {
      user.publicKey = publicKey; // ✅ overwrite every time!
    }
    console.log("Saving public key for:", username, "Key:", publicKey);

    await user.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save public key" });
  }
});

router.get("/get-public-key", async (req, res) => {
  const { username } = req.query;

  try {
    const user = await User.findOne({ username });
    console.log("Fetching public key for:", username, "Found:", user);

    if (!user || !user.publicKey) {
      return res.status(404).json({ error: "Public key not found" });
    }
    console.log("Public key for", username, "is", user.publicKey);

    res.json({ publicKey: user.publicKey });
  } catch (err) {
    console.error("Error in get-public-key:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;