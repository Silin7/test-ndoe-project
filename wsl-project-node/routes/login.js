var express = require('express');
var router = express.Router();
var loginMoudle = require('./compontent/login')

router.get('/register', loginMoudle.register);

module.exports = router;
