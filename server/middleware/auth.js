const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { StatusCodes } = require("http-status-codes");

dotenv.config();

exports.verifyToken = (req, res, next) => {

  //take token from req header
  const token = req.headers.authorization;
  //validate token 
  if (!token) {
    return res.status(401).json({
      message: "Access Denied",
      status: StatusCodes.UNAUTHORIZED
    })
  }
  if (!token.startsWith("Bearer")) {
    throw new MyError(StatusCodes.UNAUTHORIZED, "Invalid Token");
  }

  //verify token
  const payload = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
  if (!payload) {
    throw new MyError(StatusCodes.UNAUTHORIZED, "Invalid Token");
  }
  //add user to req object
  req.user = payload;
  next();
}