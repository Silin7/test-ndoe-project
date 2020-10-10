const { json } = require('express');

const get_register = (req, res, next) => {
  res.end('HELLO GET')
}
const post_register = (req, res, next) => {
  var mysql = require('mysql')
  var connection = mysql.createConnection({     
    host: 'localhost',
    user: 'root',
    password : '1234561',
    database: 'test_library' 
  }); 

  connection.connect();
 
  var sql = 'SELECT * FROM login_information';
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR]: ', err.message);
      res.end(JSON.stringify({
        code: 500,
        msg: '数据库请求失败'
      }))
      return;
    }
    res.end(JSON.stringify({
      code: 0,
      msg: 'success',
      data: result
    }))
  });
  
  connection.end();

}

module.exports = {
  get_register, post_register
}