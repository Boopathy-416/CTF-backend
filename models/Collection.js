// models/Collection.js
const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ["present", "absent"], required: true },
    amountCollected: Number,
    notes: String, // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", collectionSchema);
