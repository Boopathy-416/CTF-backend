// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// Add a client (Admin only)
router.post('/add-client', async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json({ message: "Client added successfully", client });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
