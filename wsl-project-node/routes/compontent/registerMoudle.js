var mysql  = require('mysql');

const post_register = (req, res, next) => {
  var registerInfo = req.body
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test_library' 
  });
  var sql = `SELECT * FROM \`login_information\` WHERE name='${registerInfo.name}'`
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
  connection.end();
}

const post_register_inster = (req, res, next) => {
  var registerInfo = req.body
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test_library' 
  });
  var addSql = 'INSERT INTO login_information(Id,name,password,number) VALUES(0,?,?,0)';
  var addSqlParams = [registerInfo.name, registerInfo.password];
  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
      return;
    } else {
      res.end(JSON.stringify({
        code: 0,
        msg: '注册成功'
      }))
      console.log('--------------------------INSERT----------------------------');
      console.log('INSERT ID:', result);
      console.log('-----------------------------------------------------------------\n\n');
    }
  });
}

module.exports = {
  post_register, post_register_inster
}