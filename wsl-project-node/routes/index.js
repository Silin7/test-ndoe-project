var express = require('express');
var router = express.Router();

// register 注册模块
var registerMoudle = require('./compontent/registerMoudle')

router.post('/register/post_register', registerMoudle.post_register);
router.post('/register/post_register_inster', registerMoudle.post_register_inster);


// login 登录模块
var loginMoudle = require('./compontent/loginMoudle')

router.get('/login/get_loginInfo', loginMoudle.get_loginInfo);
router.post('/login/post_login', loginMoudle.post_login);

module.exports = router;
