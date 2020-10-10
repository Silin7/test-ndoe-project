var express = require('express');
var router = express.Router();

var loginMoudle = require('./compontent/loginMoudle')

router.get('/get_register', loginMoudle.get_register);
router.post('/post_register', loginMoudle.post_register);

module.exports = router;

