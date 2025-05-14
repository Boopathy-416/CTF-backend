
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  address: String,
  dailyPaymentAmount: Number,
  status: { type: String, default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);
