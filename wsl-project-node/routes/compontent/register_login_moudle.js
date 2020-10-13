var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test_library' 
});

connection.connect();

// 注册：判断账号是否存在
const post_register = (req, res, next) => {
  var sql = `SELECT * FROM \`login_information\` WHERE name='${req.body.name}'`
  connection.query(sql, function (err, result) {
    if(err){
      res.end(JSON.stringify({
        code: 500,
        msg: '未知异常，请联系管理员'
      }))
      return;
    } else {
      if (result.length > 0) {
        res.end(JSON.stringify({
          code: 500,
          msg: '此账号已被注册'
        }))
      } else {
        res.end(JSON.stringify({
          code: 0,
          msg: '此账号可以注册'
        }))
      }
    }
  });
}
// 注册：将注册信息写入数据库
const post_register_inster = (req, res, next) => {
  var addSql = 'INSERT INTO login_information(Id,name,password,number) VALUES(0,?,?,0)';
  var addSqlParams = [req.body.name, req.body.password];
  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      console.log(err)
      res.end(JSON.stringify({
        code: 500,
        msg: '未知异常，请联系管理员'
      }))
      return;
    } else {
      res.end(JSON.stringify({
        code: 0,
        msg: '注册成功'
      }))
    }
  });
}
// 登录：判断账号是否存在
const get_loginInfo = (req, res, next) => {
  var sql = 'SELECT * FROM login_information';
  connection.query(sql, function (err, result) {
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
}
// 登录：验证账号信息，登录
const post_login = (req, res, next) => {
  var sql = `SELECT * FROM \`login_information\` WHERE name='${req.body.name}'`
  connection.query(sql, function (err, result) {
    if(err){
      res.end(JSON.stringify({
        code: 500,
        msg: '未知异常，请联系管理员'
      }))
      return;
    } else {
      if (result.length > 0) {
        if (result[0].password === req.body.password) {
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
}

module.exports = {
  post_register, post_register_inster, post_login, get_loginInfo
}