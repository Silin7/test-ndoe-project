var express = require('express');
var router = express.Router();
var loginMoudle = require('./compontent/login')

router.get('/register', loginMoudle.register);
router.post('/register2', loginMoudle.register2);

module.exports = router;