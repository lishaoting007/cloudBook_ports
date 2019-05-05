const categoryModel = require('../model/category');
const mongoose = require('mongoose');
const bookModel = require('../model/book');

// 添加分类
async function addCategory(req, res, next) {
  try {
    const { title, icon } = req.body;
    await categoryModel.create({
      title,
      icon
    });
    res.json({
      code: 200,
      msg: '分类添加成功'
    });
  } catch (err) {
    next(err);
  }
}

// 获取分类
async function getCategory(req, res, next) {
  try {
    const data = await categoryModel.find().sort({ _id: -1 });
    res.json({
      code: 200,
      data
    });
  } catch (err) {
    next(err);
  }
}

// 添加书籍到分类
async function addBookToCategory(req, res, next) {
  try {
    const { categoryId, bookId } = req.body;
    const category = await categoryModel.findOne({
      _id: mongoose.Types.ObjectId(categoryId)
    });
    const book = await bookModel.findOne({
      _id: mongoose.Types.ObjectId(bookId)
    });
    if (book) {
      await category.books.push(book._id);
      await category.save();
      res.json({
        code: 200,
        msg: '分类添加书籍成功'
      });
    } else {
      res.json({
        code: 400,
        msg: '无效操作，该书籍不存在'
      });
    }
  } catch (err) {
    next(err);
  }
}

// 从分类获取书籍
async function getBookFromCategory(req, res, next) {
  try {
    const data = await categoryModel
      .find()
      .sort({ _id: -1 })
      .populate('books');
    res.json({
      code: 200,
      data
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addCategory,
  getCategory,
  addBookToCategory,
  getBookFromCategory
};
