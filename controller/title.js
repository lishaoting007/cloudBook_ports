const titleModel = require('../model/title');
const mongoose = require('mongoose');

async function getTitles(req, res, next) {
  try {
    const { bookId } = req.query;
    const data = await titleModel.find({
      bookId: mongoose.Types.ObjectId(bookId)
    });
    res.json({
      code: 200,
      data
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getTitles };
