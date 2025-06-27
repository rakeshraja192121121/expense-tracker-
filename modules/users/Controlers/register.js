const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const register = async (req, res) => {
  const userModel = mongoose.model("Users");
  const { userName, userEmail, userPassword, confirmPassword, balance } =
    req.body;

  if (!userName) throw "userName is required";
  if (!userEmail) throw "userEmail is required";
  if (!userPassword) throw "userPassword is required";

  const getduplicateEmail = await userModel.findOne({ userEmail: userEmail });
  if (getduplicateEmail) throw " Email Id should be unique";
  if (userPassword !== confirmPassword)
    throw "both userpassword and confirmPassword should be same ";
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  const createdata = await userModel.create({
    userName: userName,
    userEmail: userEmail,
    userPassword: hashedPassword,
    balance: balance,
  });
  const accessToken = await JWT.sign(
    {
      _id: createdata._id,
      userEmail: createdata.userEmail,
    },
    process.env.SECRETKEY
  );

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ec204ad87c7adf",
      pass: "ddf6dace90ec27",
    },
  });

  await transport.sendMail({
    to: createdata.userEmail,
    from: "info@expenseTracker",
    text: "hello",
    html: `<h1> your account ${createdata.userEmail} has been successfully registered</h1>`,
    subject: "register successful",
  });
  res
    .status(201)
    .json({ msg: "user register was success", accessToken: accessToken });
};

module.exports = register;
