const mongoose = require('mongoose');

const title = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'book'
    },
    index: {
      type: Number,
      default: 1
    },
    title: String,
    total: Number
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdTime', updatedAt: 'updatedTime' }
  }
);

module.exports = mongoose.model('title', title);
