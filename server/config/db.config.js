const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

exports.connectDB = async () => {
  return mongoose.connect(process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
}
