const { Router } = require('express');
const router = Router();
const { getBook } = require('../controller/book');

router.post('/', getBook);

module.exports = router;
