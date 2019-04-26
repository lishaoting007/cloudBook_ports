const mongoose = require('mongoose');

const book = new mongoose.Schema(
  {
    author: String,
    desc: String,
    index: {
      type: Number
    },
    lookNums: {
      type: Number,
      default: 0
    },
    status: Number,
    title: String,
    type: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'category'
    },
    img: String
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdTime', updatedAt: 'updatedTime' }
  }
);

module.exports = mongoose.model('book', book);
