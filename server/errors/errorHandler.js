const MyError = require("./MyError");

//not found fall back - if none of the endpoints gets hit , control goes here
const notFound = (req, res, next) => {
  next(new MyError(404, "Path Not Found"));
};

//the final global error handler - any error thrown from any part of the app, gets caught here
const errorHandler = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message;
  if (err.statusCode !== 404) {
    console.log(err);
  }

  if (message === "jwt malformed") {
    status = 401;
    message = "jwt malformed";
  }

  if (err.code === 11000) {
    message = "Email already exists";
  }

  res.status(status).json({ success: false, message });
};

module.exports = { notFound, errorHandler };
