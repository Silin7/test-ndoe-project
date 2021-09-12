const conn = require('./mySQL')

// 新增班级
const classAdd = (req, res, next) => {
  let data = req.body
  let sql = 'INSERT INTO `class` (`id`, `class`, `teacher`) VALUES (NULL, ?, ?)'
  let sqlParams = [data.class, data.teacher]
  conn().query(sql, sqlParams, function (err, result) {
    if (err) {
      res.json({
        code: 500,
        msg: err
      })
      return
    } else {
      res.json({
        code: 0,
        msg: 'success'
      })
    }
  })
}

// 班级列表
const classList = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`class\``
  let sql2 = `SELECT * FROM \`class\` LIMIT ${slimit},${elimit}`
  conn().query(sql1, function (err1, result1) {
    if(err1){
      res.json({
        code: 500,
        msg: err1
      })
    } else {
      let totalCount = result1[0][`COUNT(*)`]
      conn().query(sql2, function (err2, result2) {
        if(err2){
          res.json({
            code: 500,
            msg: err2
          })
        } else {
          res.json({
            code: 0,
            msg: 'success',
            page: data.page,
            limit: data.limit,
            totalCount: totalCount,
            data: result2
          })
        }
      })
    }
  })
}

// 删除班级
const classCancel = (req, res, next) => {
  let data = req.query
  let sql = `DELETE FROM \`class\` WHERE \`id\` = '${data.id}'`
  conn().query(sql, function (err, result) {
    if(err){
      res.json({
        code: 500,
        msg: err
      })
    } else {
      res.json({
        code: 0,
        msg: 'success'
      })
    }
  })
}

module.exports = {
  classAdd, classList, classCancel
}