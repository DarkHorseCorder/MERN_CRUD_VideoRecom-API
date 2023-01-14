const express = require('express');
const router = express.Router();

var music = require('../controllers/music.controller.js');

router.post('/create', music.create);
router.post('/update', music.update);
router.post('/delete', music.delete);
router.post('/getuserdata', music.getuserdata);
router.get('/' , music.getmusics);

module.exports = router;