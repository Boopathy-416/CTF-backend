const Customer = require('../models/Customer'); // Add this if missing

exports.addCustomer = async (req) => {
  try {
    const {
      name,
      dob,
      phone,
      address,
      aadhaar,
      amount,
      totalWithInterest,
    } = req.body;

    const photo = req.file ? req.file.filename : null;

    const newCustomer = new Customer({
      name,
      dob,
      phone,
      address,
      aadhaar,
      amount,
      totalWithInterest,
      photo,
    });

    const savedCustomer = await newCustomer.save();

    return savedCustomer;
  } catch (error) {
    console.error("Error in addCustomer:", error);
    throw error; // Let the route handler catch this and send proper response
  }
};


exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Failed to fetch customers" });
  }
};