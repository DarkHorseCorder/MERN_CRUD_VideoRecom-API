const express = require('express');
const router = express.Router();
var video = require('../controllers/video.controller.js');
router.post('/create', video.create);
router.post('/update', video.update);
router.post('/delete', video.delete);
router.post('/getuserdata', video.getuserdata);
router.get('/' , video.getvideos);

module.exports = router;