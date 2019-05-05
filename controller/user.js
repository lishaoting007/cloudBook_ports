const userModel = require('../model/user');
const validator = require('validator');
const codeModel = require('../model/smsCode');
const signUtil = require('../utils/signToken');

// 用户注册
async function register(req, res, next) {
  try {
    const { phone, password, code } = req.body;
    const user = await userModel.findOne({
      phone
    });
    if (!user) {
      // 判断用户存不存在
      const isPhone = validator.isMobilePhone(phone, 'zh-CN');
      if (isPhone) {
        // 判断手机格式正不正确
        const smsCode = await codeModel
          .findOne({
            code
          })
          .sort({ _id: -1 });
        if (smsCode) {
          // 判断验证码正不正确
          let codeDate = new Date(smsCode.createdTime);
          let codeTime = Math.round(codeDate.getTime() / 1000);
          let nowTime = Math.round(Date.now() / 1000);
          if (nowTime - codeTime < 5 * 60) {
            // 判断验证码是否过期
            await userModel.create({
              phone,
              password
            });
            res.json({
              code: 200,
              msg: '注册成功'
            });
          } else {
            res.json({
              code: 200,
              msg: '验证码已过期'
            });
          }
        } else {
          res.json({
            code: 400,
            msg: '验证码不正确'
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
        msg: '用户已注册'
      });
    }
  } catch (err) {
    next(err);
  }
}

// 用户登录
async function login(req, res, next) {
  try {
    const { phone, password } = req.body;
    if (phone && password) {
      const user = await userModel.findOne({
        phone
      });
      if (user) {
        if (password === user.password) {
          const token = signUtil({ userId: user._id });
          res.json({
            code: 200,
            token
          });
        } else {
          res.json({
            code: 400,
            msg: '密码不正确'
          });
        }
      } else {
        res.json({
          code: 200,
          msg: '用户不存在'
        });
      }
    } else {
      res.json({
        code: 400,
        msg: '缺少必要参数'
      });
    }
  } catch (err) {
    next(err);
  }
}
module.exports = { register, login };
