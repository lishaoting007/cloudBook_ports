const smsModel = require('../model/smsCode');
const sms = require('../utils/smsUtils');
const userModel = require('../model/user');
const validator = require('validator');

async function sendCode(req, res, next) {
  try {
    const { phone } = req.body;
    const user = await userModel.findOne({
      phone
    });
    if (!user) {
      let sixCode = '';
      for (let i = 0; i < 6; i++) {
        sixCode += Math.floor(Math.random() * 10) + '';
      }
      const isPhone = validator.isMobilePhone(phone, 'zh-CN');
      if (isPhone) {
        const smsRes = await sms(phone, sixCode);
        if (smsRes.Code === 'OK') {
          await smsModel.create({
            phone,
            code: sixCode
          });
          res.json({
            code: 200,
            msg: '短信发送成功'
          });
        } else {
          res.json({
            code: 500,
            msg: smsRes.Code
          });
        }
      } else {
        res.json({
          code: 400,
          msg: '手机号不合法'
        });
      }
    } else {
      res.json({
        code: 400,
        msg: '对不起，您已经注册过了'
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { sendCode };
