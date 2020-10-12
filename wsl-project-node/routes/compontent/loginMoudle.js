var mysql  = require('mysql');
 
const get_loginInfo = (req, res, next) => {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test_library' 
  });
  connection.connect();
  var sql = 'SELECT * FROM login_information';
  connection.query(sql,function (err, result) {
    if(err){
      res.end(JSON.stringify({
        code: 500,
        msg: '未知异常，请联系管理员'
      }))
    } else {
      res.end(JSON.stringify({
        code: 0,
        data: result
      }))
    }
  });
  connection.end();
}
const post_login = (req, res, next) => {
  var loginInfo = req.body
  console.log(loginInfo.name)
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test_library' 
  });
  var sql = `SELECT * FROM \`login_information\` WHERE name='${loginInfo.name}'`
  connection.query(sql, function (err, result) {
    if(err){
      res.end(JSON.stringify({
        code: 500,
        msg: '未知异常，请联系管理员'
      }))
      return;
    } else {
      if (result.length > 0) {
        if (result[0].password === loginInfo.password) {
          res.end(JSON.stringify({
            code: 0,
            msg: '登录成功'
          }))
        } else {
          res.end(JSON.stringify({
            code: 500,
            msg: '密码错误'
          }))
        }
      } else {
        res.end(JSON.stringify({
          code: 500,
          msg: '没有此账号信息'
        }))
      }
    }
  });
  connection.end();
}

module.exports = {
  get_loginInfo, post_login
}