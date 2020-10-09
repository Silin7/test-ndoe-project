var express = require('express');
var router = express.Router();
var loginMoudle = require('./compontent/loginMoudle')

// router.get('/get_register', loginMoudle.get_register);
// router.post('/post_register', loginMoudle.post_register);

router.get('/get_register', (req, res, next) => {
  console.log('GET')
  res.end('HELLO GET')
});
router.post('/post_register', (req, res, next) => {
  console.log('POST')
  res.end('HELLO POST')
});

module.exports = router;