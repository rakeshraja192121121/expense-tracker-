const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
    },
    userEmail: {
      type: String,
      required: [true, "userEmail is required"],
      unique: true,
    },
    userPassword: {
      type: String,
      required: [true, "password is required"],
    },
    balance: {
      type: Number,
      required: [true, "balance is required"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
