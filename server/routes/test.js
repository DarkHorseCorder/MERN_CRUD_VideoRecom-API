const express = require('express');
const router = express.Router();

var tests = require('../controllers/test.js');

router.post('/add/', tests.addData);
router.post('/detail/', tests.detail);
router.get('/', tests.sendData);

module.exports = router;