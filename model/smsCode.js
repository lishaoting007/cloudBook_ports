const mongoose = require('mongoose');

const smsCode = new mongoose.Schema(
  {
    phone: String,
    code: String
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createdTime',
      updatedAt: 'updatedTime'
    }
  }
);

module.exports = mongoose.model('smsCode', smsCode);
