const rq = require('request-promise');
const cheerio = require('cheerio');
const bookModel = require('../model/book');
const titleModel = require('../model/title');
const articleModel = require('../model/article');

async function getBook(req, res, next) {
  try {
    const { url, img, author, title } = req.body;
    const data = await rq.get(url);
    const $ = cheerio.load(data);
    let desc = $('meta[name="description"]').attr('content');
    const book = bookModel.create({
      author,
      img,
      title,
      desc
    });
    let urlArr = url.split('/');
    urlArr.pop(-1);
    const baseUrl = urlArr.join('/') + '/';
    let titleUrlArr = [];
    let titleTextArr = [];
    const titleEle = $('.catalog a');
    titleEle.each((index, item) => {
      titleUrlArr.push(baseUrl + $(item).attr('href'));
      titleTextArr.push($(item).text());
    });

    for (let i = 0; i < titleUrlArr.length; i++) {
      const item = titleUrlArr[i];
      const index = i;
      const articleData = await rq.get(item);
      const $ = cheerio.load(articleData);
      const content = $('.content').text();

      const title = titleModel.create({
        bookId: book._id,
        index: Number(index),
        title: titleTextArr[index],
        total: titleUrlArr.length
      });

      const article = await articleModel.create({
        bookId: book._id,
        index: Number(index),
        titleId: title._id,
        content
      });
    }
    res.json({
      code: 200,
      msg: '爬取成功'
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getBook };
