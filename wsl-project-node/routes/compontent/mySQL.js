var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test_library' 
});

var sql = `SELECT * FROM \`login_information\` WHERE 1`
connection.query(sql, function (err, result) {
  if(err){
    res.end(JSON.stringify({
      code: 500,
      msg: '未知异常，请联系管理员'
    }))
    return;
  } else {
    res.end(JSON.stringify({
      code: 0,
      msg: '操作成功',
      data: result
    }))
  }
});
connection.end();