const express = require("express");
const mongoose = require("mongoose");
const addexpense = async (req, res) => {
  const userModel = mongoose.model("Users");
  const transactionModel = mongoose.model("Transaction");
  const { amount, remarks } = req.body;
  if (!amount) throw "amount must be entered";
  if (!remarks) throw "remarks must be entered";
  if (amount < 0) throw "amount cannot be less than zero";

  await transactionModel.create({
    userId: req.user._id,
    amount: amount,
    remarks: remarks,
    incomeType: "Expense",
  });
  await userModel.updateOne(
    { _id: req.user._id },
    {
      $inc: {
        balance: amount * -1,
      },
    },
    {
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "success",
  });
};

module.exports = addexpense;
