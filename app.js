require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./handler/errorHandler");
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.CONNECTION, {})
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.log("db not connected");
  });

const userModel = require("./models/users");
const transactionModel = require("./models/transaction");

const userRoutes = require("./modules/users/userRoutes");
const transactionRoute = require("./modules/transaction/transactionRoute");

app.use("/api/users/", userRoutes);
app.use("/api/transaction", transactionRoute);

app.use(errorHandler);

app.listen(8000, () => {
  console.log("server has started");
});
