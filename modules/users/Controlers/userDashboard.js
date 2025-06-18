const mongoose = require("mongoose");
const userDashboard = async (req, res) => {
  const userModel = mongoose.model("Users");
  const transactionModel = mongoose.model("Transaction");
  console.log(req.user);
  const data = await userModel
    .find({ userEmail: req.user.userEmail })
    .select("-userPassword");

  const transaction = await transactionModel
    .find({ userId: req.user._id })
    .limit(3);

  res.status(201).json({
    status: "success",
    data: data,
    Transaction: transaction,
  });
};
module.exports = userDashboard;
