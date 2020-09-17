var express = require('express');
var router = express.Router();
var loginMoudle = require('./compontent/login')
var exportExcel = require('./compontent/exportExcel')

router.get('/register', loginMoudle.register);
router.get('/exportExcel', exportExcel.exportExcel);

module.exports = router;
