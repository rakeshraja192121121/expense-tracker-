const mongoose = require("mongoose");

const getTransaction = async (req, res) => {
  const transactionModel = mongoose.model("Transaction");
  console.log(req.query);
  const transaction = await transactionModel.find({
    userId: req.user._id,
    ...req.query,
  });
  console.log(transaction);
  res.status(201).json({
    status: "success",
    Transactions: transaction,
  });
};
module.exports = getTransaction;
