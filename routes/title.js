const { Router } = require('express');
const router = Router();
const { getTitles } = require('../controller/title');

router.get('/', getTitles);

module.exports = router;
