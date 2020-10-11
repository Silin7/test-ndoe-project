var express = require('express');
var router = express.Router();

var loginMoudle = require('./compontent/loginMoudle')

router.get('/get_loginInfo', loginMoudle.get_loginInfo);
router.post('/post_login', loginMoudle.post_login);

module.exports = router;
