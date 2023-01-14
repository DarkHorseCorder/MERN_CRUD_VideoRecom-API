const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send('Library Home Page');
});

router.use('/auth', require('./auth'));
router.use('/tests', require('./test'));
router.use('/video', require('./video'));
router.use('/music', require('./music'));
router.use('/food', require('./food'));

module.exports = router;