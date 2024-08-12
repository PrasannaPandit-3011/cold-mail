require("express-async-errors"); //handle global errors
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const { errorHandler, notFound } = require("./errors/errorHandler"); // custom global error handler
const { connectDB } = require("./config/db.config"); //database connection function

const app = express();

const PORT = process.env.PORT || 5000;

// create a write stream for logging requests to access.log
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// middleware for logging requests
app.use(morgan('combined', { stream: accessLogStream }));

// enable CORS
app.use(cors());
app.use(express.json());

// root url for user related endpoints
app.use("/api/users", require("./routes/userRoutes"));
// root url for email related endpoints
app.use("/api/emails", require("./routes/emailRoutes"));

// calling global error handlers
app.use(notFound);
app.use(errorHandler);

// function to start the server
const start = async () => {
  try {
    // calling the database connection function
    await connectDB();
    console.log("MongoDB connection successful");
    app.listen(PORT, () => {
      console.log(`Listening on PORT: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

// calling the function to start the server
start();
