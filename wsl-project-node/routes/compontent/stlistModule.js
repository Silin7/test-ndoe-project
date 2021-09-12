const conn = require('./mySQL')

// 学生列表
const stlistList = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`stlist\` WHERE \`cid\` = '${data.cid}'`
  let sql2 = `SELECT * FROM \`stlist\` WHERE \`cid\` = '${data.cid}' LIMIT ${slimit},${elimit}`
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

// 新增学生
const stlistAdd = (req, res, next) => {
  let data = req.body
  let sql = 'INSERT INTO `stlist` (`id`, `cid`, `num`, `name`) VALUES (NULL, ?, ?, ?)'
  let sqlParams = [data.cid, data.num, data.name]
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

// 修改学生
const stlistModify = (req, res, next) => {
  let data = req.body
  let sql = `UPDATE \`stlist\` SET \`num\` = '${data.num}', \`name\` = '${data.name}' WHERE \`stlist\`.\`id\` = ${data.id}`
  conn().query(sql, function (err, result) {
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

// 删除学生
const stlistCancel = (req, res, next) => {
  let data = req.query
  let sql = `DELETE FROM \`stlist\` WHERE \`id\` = '${data.id}'`
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
  stlistAdd, stlistModify, stlistList, stlistCancel
}