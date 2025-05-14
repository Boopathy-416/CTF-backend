const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsPath));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/auth/admin', require('./routes/adminRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));

// Global error handler
app.use((err, req, res, next) => {
  console.error("💥 Global Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Unexpected server error",
    error: err.message,
  });
});


// Health Check
app.get('/', (req, res) => {
  res.send('✌️🚀 CollecToFin Backend API 🚀 Running Successfully ✅');
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ message: 'Unexpected server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
