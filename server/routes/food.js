const express = require('express');
const router = express.Router();

var food = require('../controllers/food.controller.js');

router.post('/create', food.create);
router.post('/update', food.update);
router.post('/delete', food.delete);
router.post('/getuserdata', food.getuserdata);
router.get('/' , food.getfoods);

module.exports = router;