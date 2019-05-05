const { Router } = require('express');
const router = Router();
const { getBook, getBookById, getAllBooks } = require('../controller/book');

router.post('/', getBook);
router.get('/allbook', getAllBooks);
router.get('/:id', getBookById);

module.exports = router;
