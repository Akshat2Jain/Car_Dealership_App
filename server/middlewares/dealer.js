const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

async function dealerMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decode = jwt.verify(jwtToken, JWT_SECRET);
    if (decode.email) {
      next();
    } else {
      return res.status(403).json({ msg: "You are not authorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
}

module.exports = dealerMiddleware;
