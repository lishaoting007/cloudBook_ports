const mongoose = require('mongoose');

const user = new mongoose.Schema(
  {
    avator: {
      type: String,
      defalut: 'http://image.yaojunrong.com/zhenxiang.jpg'
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
