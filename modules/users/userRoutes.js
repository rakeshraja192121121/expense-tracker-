const express = require("express");

// import controlers here
const register = require("./Controlers/register");
const login = require("./Controlers/login");
const userDashboard = require("./Controlers/userDashboard");
const auth = require("../../middleware/auth");

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.use(auth);
userRoutes.get("/dashboard", userDashboard);

module.exports = userRoutes;
