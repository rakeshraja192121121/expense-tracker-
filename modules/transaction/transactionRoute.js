const express = require("express");
const addAmount = require("./contrlers/addAmount");
const auth = require("../../middleware/auth");
const addexpense = require("./contrlers/addExpenses");
const getTransaction = require("./contrlers/getTransaction");

transactionRoute = express.Router();
transactionRoute.use(auth);
transactionRoute.post("/addamount", addAmount);
transactionRoute.post("/addexpense", addexpense);
transactionRoute.get("/allTransaction", getTransaction);

module.exports = transactionRoute;
