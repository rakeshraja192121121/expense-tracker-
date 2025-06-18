const JWT = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);
    if (!token) throw "the token is null";

    const verification = JWT.verify(token, process.env.SECRETKEY);
    console.log("verification", verification);
    req.user = verification;
    next();
  } catch (e) {
    res.json({
      status: "Failed",
      message: "unauthorized access",
    });
  }
};

module.exports = auth;
