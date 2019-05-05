const express = require('express');
const router = express.Router();
const bookRoutes = require('./book');
const categoryRoutes = require('./category');
const titleRoutes = require('./title');
const articleRoutes = require('./article');
const userRoutes = require('./user');
const smsCodeRoutes = require('./smsCode');

router.use('/book', bookRoutes);
router.use('/category', categoryRoutes);
router.use('/title', titleRoutes);
router.use('/article', articleRoutes);
router.use('/user', userRoutes);
router.use('/code', smsCodeRoutes);

module.exports = router;
