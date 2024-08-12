const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  to: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }],
  cc: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  bcc: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  subject: {
    type: String,
    default: "No Subject"
  },
  body: {
    type: String,
    default: "No Mail Body"
  },
  attachment: {
    type: String
  },
  type: {
    type: String,
    enum: ['high', 'low', 'normal', "spam"],
    default: "normal"
  },
}, {
  timestamps: true
})

module.exports = mongoose.model("Email", emailSchema);