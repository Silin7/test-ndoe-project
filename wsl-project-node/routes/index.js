const express = require('express');
const router = express.Router();

// 登录模块
const loginModule = require('./compontent/loginModule')
router.post('/login/sign/in', loginModule.signIn);
router.post('/login/change/password', loginModule.changePassword);

// 班级模块
const classModule = require('./compontent/classModule')
router.post('/class/add', classModule.classAdd);
router.get('/class/list', classModule.classList);
router.get('/class/cancel', classModule.classCancel);

// 学生模块
const stlistModule = require('./compontent/stlistModule')
router.get('/stlist/list', stlistModule.stlistList);
router.post('/stlist/add', stlistModule.stlistAdd);
router.post('/stlist/modify', stlistModule.stlistModify);
router.get('/stlist/cancel', stlistModule.stlistCancel);

module.exports = router;
