const express = require('express');
const router = express.Router();
// NOTE: Add middleware to verify requests!
const middleware = require('../middlewares');

var auth = require('../controllers/auth.controller.js');

router.post('/logins', auth.verify);
router.post('/register', auth.verifyregister);
router.post('/deleteuser', auth.deleteUser);
router.post('/changeVideoState', auth.changeVideoState);
router.post('/changeMusicState', auth.changeMusicState);
router.post('/changeFoodState', auth.changeFoodState);
router.post('/eachuser', auth.eachuser);
router.post('/updateuser', auth.updateUser);
router.get('/getusers' ,  auth.getusers)

module.exports = router;