var mysql  = require('mysql');

const get_register = (req, res, next) => {
  res.end('HELLO GET')
}
const post_register = (req, res, next) => {
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
      return;
    } else {
      res.end(JSON.stringify({
        code: 0,
        data: result
      }))
    }
  });
  connection.end();
}

module.exports = {
  get_register, post_register
}