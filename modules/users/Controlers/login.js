const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const login = async (req, res) => {
  const userModel = mongoose.model("Users");

  const { userEmail, userPassword } = req.body;

  const getdetails = await userModel.findOne({ userEmail: userEmail });
  console.log(getdetails);

  if (!getdetails) {
    throw "no such Email Exist";
  }

  const comparePassword = await bcrypt.compare(
    userPassword,
    getdetails.userPassword
  );
  if (!comparePassword) throw "both passwords are not matching";

  const accessToken = await JWT.sign(
    {
      _id: getdetails._id,
      userEmail: getdetails.userEmail,
    },
    process.env.SECRETKEY
  );

  res.status(201).json({
    status: "success",
    message: "login was successful",
    accessToken: accessToken,
  });
};

module.exports = login;
