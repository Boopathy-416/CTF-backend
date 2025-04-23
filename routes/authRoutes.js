const express = require('express');
const router = express.Router();
const { loginAdmin, createEmployee, loginEmployee } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/admin/login', loginAdmin);
router.post('/admin/create-employee', auth, createEmployee); // protect this route
router.post('/employee/login', loginEmployee);

module.exports = router;
