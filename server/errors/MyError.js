//custom error class, extends the traditional Error class
class MyError extends Error {
  constructor(statusCode, message) {
    super(message); //calling the constructor of the parent class
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = MyError;
