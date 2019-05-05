const mongoose = require('mongoose');

const user = new mongoose.Schema(
  {
    avator: {
      type: String,
      defalut: 'http://pbl.yaojunrong.com/FhegD5A2iKnKzJmAnCUBfbyOnkTo'
    },
    nickname: String,
    password: String,
    phone: Number,
    desc: String
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createdTime',
      updatedAt: 'updatedTime'
    }
  }
);

module.exports = mongoose.model('user', user);
