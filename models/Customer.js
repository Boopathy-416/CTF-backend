const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  dob: String,
  phone: String,
  address: String,
  aadhaar: String,
  amount: Number,
  totalWithInterest: Number,
  photo: String,
});

module.exports = mongoose.model('Customer', customerSchema);
