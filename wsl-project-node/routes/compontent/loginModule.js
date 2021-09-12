//导入加密模块
const crypto = require("crypto");
const conn = require('./mySQL')

// 登录
const signIn = (req, res, next) => {
  let data = req.body
  data.password = crypto.createHash("md5").update(data.password).digest("hex")
  let sql = `SELECT * FROM \`admin\` WHERE \`name\` = '${data.name}'`
  conn().query(sql, function (err, result) {
    if(err){
      res.end(JSON.stringify({
        code: 500,
        msg: err
      }))
    } else {
      if (result.length > 0) {
        if (result[0].password === data.password) {
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
          msg: '账号错误'
        }))
      }
    }
  })
}

// 修改密码
const changePassword = (req, res, next) => {
  let data = req.body
  data.password = crypto.createHash("md5").update(data.password).digest("hex")
  data.newpassword = crypto.createHash("md5").update(data.newpassword).digest("hex")
  let sql = `SELECT * FROM \`admin\` WHERE \`name\` = '${data.name}'`
  let sql2 = `UPDATE \`admin\` SET \`password\` = '${ data.newpassword }' WHERE \`name\` = '${data.name}'`
  conn().query(sql, function (err, result) {
    if (err) {
      res.json({
        code: 500,
        msg: err
      })
      return
    } else {
      if (result.length > 0) {
        if (result[0].password === data.password) {
          conn().query(sql2, function (err, result) {
            if (err) {
              res.json({
                code: 500,
                msg: err
              })
              return
            } else {
              res.end(JSON.stringify({
                code: 0,
                msg: '密码修改成功'
              }))
            }
          })
        } else {
          res.end(JSON.stringify({
            code: 500,
            msg: '旧密码错误'
          }))
        }
      } else {
        res.end(JSON.stringify({
          code: 500,
          msg: '账号错误'
        }))
      }
    }
  })
}

module.exports = {
  signIn, changePassword
}