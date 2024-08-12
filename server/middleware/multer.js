const multer = require("multer");
const path = require("path");
const MyError = require("../errors/MyError");
const { StatusCodes } = require("http-status-codes");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50
  },
  fileFilter: (req, file, cb) => {
    if (!file) {
      return cb(
        new MyError(StatusCodes.BAD_REQUEST, "Please provide a file")
      );
    }
    cb(null, true);
  }
});

module.exports = upload;
