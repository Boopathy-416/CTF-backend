// // backend/routes/customerRoutes.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { addCustomer } = require('../controllers/customerController');

// const { getAllCustomers } = require('../controllers/customerController');


// router.get('/', getAllCustomers);


// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Ensure this folder exists!
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   }
// });
// const upload = multer({ storage });

// // POST /api/customers
// router.post('/', upload.single('photo'), async (req, res) => {
//   try {
//     const response = await addCustomer(req);
//     res.status(200).json({ message: 'Customer added successfully', data: response });
//   } catch (err) {
//     console.error("Customer creation error:", err.message);
//     res.status(500).json({ message: 'Server error while adding customer' });
//   }
// });


// // In backend/routes/customerRoutes.js
// router.put('/:id', upload.single('photo'), async (req, res) => {
//   try {
//     const customerId = req.params.id;
//     const { name, dob, phone, address, aadhaar, amount, totalWithInterest } = req.body;
//     const photo = req.file ? req.file.filename : null;

//     const updatedCustomer = await Customer.findByIdAndUpdate(
//       customerId,
//       {
//         name,
//         dob,
//         phone,
//         address,
//         aadhaar,
//         amount,
//         totalWithInterest,
//         photo: photo || undefined,  // Only update photo if provided
//       },
//       { new: true }
//     );

//     if (!updatedCustomer) {
//       return res.status(404).json({ message: 'Customer not found' });
//     }

//     res.status(200).json({ message: 'Customer updated successfully', data: updatedCustomer });
//   } catch (err) {
//     console.error("Error updating customer:", err.message);
//     res.status(500).json({ message: 'Server error while updating customer' });
//   }
// });



// module.exports = router;
// backend/routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Customer = require('../models/Customer');  // Import the Customer model
const { addCustomer, getAllCustomers } = require('../controllers/customerController');

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// GET all customers
router.get('/', getAllCustomers);

// POST to add a customer
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const response = await addCustomer(req);
    res.status(200).json({ message: 'Customer added successfully', data: response });
  } catch (err) {
    console.error("Customer creation error:", err.message);
    res.status(500).json({ message: 'Server error while adding customer' });
  }
});

// PUT to update a customer by ID
router.put('/:id', upload.single('photo'), async (req, res) => {
  const customerId = req.params.id;
  const { name, dob, phone, address, aadhaar, amount, totalWithInterest } = req.body;
  const photo = req.file ? req.file.filename : null;

  console.log("Updating Customer with ID:", customerId);
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      {
        name,
        dob,
        phone,
        address,
        aadhaar,
        amount,
        totalWithInterest,
        photo: photo || undefined,  // Only update photo if provided
      },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer updated successfully', data: updatedCustomer });
  } catch (err) {
    console.error("Error updating customer:", err.message);
    res.status(500).json({ message: 'Server error while updating customer' });
  }
});

module.exports = router;
