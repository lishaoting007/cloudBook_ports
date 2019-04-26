const express = require('express');
const router = express.Router();
const bookRoutes = require('./book');

router.use('/book', bookRoutes);

module.exports = router;
