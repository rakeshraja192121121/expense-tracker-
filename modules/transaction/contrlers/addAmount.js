const validator = require("validator");
const mongoose = require("mongoose");

const addAmount = async (req, res) => {
  const userModel = mongoose.model("Users");
  const transactionModel = mongoose.model("Transaction");
  const { amount, remarks } = req.body;
  console.log("amount", amount);
  //if (!validator.isNumeric(amount.toString())) throw "amount should be numeric";
  if (!amount) throw "amount should be entered";
  if (!remarks) throw "remarks should not be empty";
  await transactionModel.create({
    amount: amount,
    remarks: remarks,
    userId: req.user._id,
    incomeType: "Income",
  });

  await userModel.updateOne(
    { _id: req.user._id },
    {
      $inc: {
        balance: amount,
      },
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({ status: "sucess", msg: "amount added successfully" });
};
module.exports = addAmount;
