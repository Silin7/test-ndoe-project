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
  let loginInfo = req.body
  console.log(loginInfo.name)
  console.log(loginInfo.password)
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test_library' 
  });
  var sql = 'SELECT * FROM `login_information` WHERE name=\'silin\''
  connection.query(sql,function (err, result) {
    if(err){
      res.end(JSON.stringify({
        code: 500,
        msg: '未知异常，请联系管理员'
      }))
      return;
    } else {
      console.log(result[0].password)
      res.end(JSON.stringify({
        code: 0,
        data: result
      }))
    }
  });
  connection.end();
}

module.exports = {
  get_loginInfo, post_login
}