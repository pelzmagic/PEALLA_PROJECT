const jwt = require("jsonwebtoken");
require("dotenv").config();


const verifyToken = (req, res, next) => {
  const authorization = req.header("Authorization")
  let tokenType, token = authorization.split("")

  if(!token || tokenType !== "Bearer"){
    return res.status(403).json({
        succes: false,
        message: "Bearer Token required"
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({
        succes: false,
        message: "Invalid Token"
    });
  }
  next()
};
module.exports = verifyToken;