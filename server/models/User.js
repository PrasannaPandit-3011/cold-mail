const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  deleted: { type: Boolean, default: false },
  inbox: [
    {
      email: { type: mongoose.Schema.Types.ObjectId, ref: 'Email' },
      read: { type: Boolean, default: false },
      isFavorite: { type: Boolean, default: false },
      trashed: { type: Boolean, default: false },
      deleted: { type: Boolean, default: false },
    }
  ],
  outbox: [{
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'Email' },
    isFavorite: { type: Boolean, default: false },
    trashed: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
