const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Admin login (fixed)
const loginAdmin = async (req, res) => {
  const { userId, password } = req.body;

  if (userId !== 'Boopathy' || password !== '12345678') {
    return res.status(401).json({ msg: 'Invalid admin credentials' });
  }

  const payload = { user: { userId, role: 'admin' } };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({ token });
};

// Create Employee (by admin)
const createEmployee = async (req, res) => {
  const { name, userId, password } = req.body;

  try {
    let user = await User.findOne({ userId });
    if (user) return res.status(400).json({ msg: 'Employee already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, userId, password: hashedPassword, role: 'employee' });
    await user.save();

    res.json({ msg: 'Employee created successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Employee login
const loginEmployee = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ userId });
    if (!user || user.role !== 'employee') return res.status(401).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user._id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = { loginAdmin, createEmployee, loginEmployee };
