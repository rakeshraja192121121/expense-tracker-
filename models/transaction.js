const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "userID is important"],
  },
  amount: {
    type: Number,
    required: [true, "amount is important"],
  },
  incomeType: {
    type: String,
    required: [true, "incomeType is manditory"],
    enum: ["Income", "Expense"],
  },
  remarks: {
    type: String,
    required: [true, "remarks is important"],
  },
});

const transactionModel = mongoose.model("Transaction", transactionSchema);

module.exports = transactionModel;
